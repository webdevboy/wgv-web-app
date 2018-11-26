import { path, prop } from 'ramda'
// import { delay } from 'redux-saga'
import { take, put, call, fork, cancel, cancelled, select } from 'redux-saga/effects'
import { Types, Creators as Actions } from '../actions'


export default api => {
	// AUTH
	function* auth(user) {
		try {
			let error = 'Authentication failed.'
			const authResp = yield call(api.auth, user)

			// Did user login?
			if (authResp.ok) {
				yield put(Actions.loginAuthSuccess(authResp.data))

				const success = 'Login successfully.'
				yield put(Actions.loginUserSuccess(authResp.data.data, success))

				const state = yield select();
				const data = state.user;
				const user = authResp.data.data;
				let error = 'Booking failed.'
				console.log('data', data);
				console.log('user', user)
				if (data.bookingTime && data.bookingDate) {
					const bookingRes = yield call(api.appointment, {
						appointment: user.firstName + ' ' + user.lastName,
						location: data.location,
						bookingTime: data.bookingTime,
						bookingDate: data.bookingDate,
						type: data.type,
						email: user.email
					})
					console.log('bookingRes', bookingRes)
					if (bookingRes.ok) {
						const success = 'create successfully. Please check your email'
						return yield put(Actions.bookingSuccess(bookingRes.data.data, success))
					} else {
						error = path(['data', 'error_msg'], bookingRes) || error
						yield put(Actions.bookingFailure(error))
					}
				}
			} else {
				error = path(['data', 'error_msg'], authResp) || error
				yield put(Actions.loginFailure(error))
			}
		} catch (error) {
			yield put(Actions.loginFailure(error))
		} finally {
			if (yield cancelled()) {
				// TODO task cancelled
				console.log('Auth task cancelled.')
			}
		}
	}

	function* loginFlow() {
		while (true) {
			const { user } = yield take(Types.LOGIN_ATTEMPT)
			const task = yield fork(auth, user)
			const action = yield take([Types.LOGOUT, Types.LOGIN_FAILURE])

			// Terminate task
			if (action.type === Types.LOGOUT) yield cancel(task)
		}
	}

	// LOGOUT
	function* logoutFlow() {
		while (true) {
			yield take(Types.LOGOUT)
			api.deleteAuthHeader()
		}
	}

	// Register
	function* register(user) {
		try {
			let error = '[500] register failed.'
			const registerResp = yield call(api.register, user)
			console.log('registerResp', registerResp)
			const registerData = path(['data'], registerResp)
			console.log("registerData", registerData)
			if (registerResp.ok) {

				const regData = registerData.data

				yield put(Actions.loginAuthSuccess(registerData))

				const success = '[200] Register successfully.'
				return yield put(Actions.loginUserSuccess(regData, success))

			} else {
				error = path(['data', 'data'], registerResp) || error
				yield put(Actions.registerFailure(error))
			}

		} catch (error) {
			yield put(Actions.registerFailure(error))
		} finally {
			if (yield cancelled()) {
				// TODO task cancelled
				console.log('POST Register task cancelled.')
			}
		}
	}

	function* registerFlow() {
		while (true) {
			const { user } = yield take(Types.REGISTER_ATTEMPT)
			const task = yield fork(register, user)

			const action = yield take([
				Types.LOGOUT,
				Types.REGISTER_FAILURE,
			])

			// Terminate task
			if (action) yield cancel(task)
		}
	}


	return {
		loginFlow,
		logoutFlow,
		registerFlow,
	}
}
