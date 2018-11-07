import { path, prop } from 'ramda'
// import { delay } from 'redux-saga'
import { take, put, call, fork, cancel, cancelled } from 'redux-saga/effects'
import { Types, Creators as Actions } from '../actions'


export default api => {
	// AUTH
	function* auth(user) {
		try {

			// yield call(delay, 3000)
			let error = '[500] Authentication failed.'
			const authResp = yield call(api.auth, user)
			const authData = prop('data', authResp)

			// Did user login?
			if (authData.ok) {
				yield put(Actions.loginAuthSuccess(authData))

				// Attempt to get user
				const userResp = yield call(api.getUser, user)
				const userData = path(['data'], userResp)

				// Finally logged in?
				if (userData.ok) {
					const success = '[200] Login successful.'
					return yield put(Actions.loginUserSuccess(userData.data, success))
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
			const registerData = path(['data'], registerResp)

			if (registerData.ok) {

				const regData = registerData.data

				yield put(Actions.loginAuthSuccess(regData))

				// Attempt to get user
				const userResp = yield call(api.getUser, user)
				const userData = path(['data'], userResp)

				// Finally logged in?
				if (userData.ok) {
					const success = '[200] Register successful.'
					return yield put(Actions.loginUserSuccess(userData.data, success))
				}

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
