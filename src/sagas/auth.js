import { path, prop } from 'ramda'
// import { delay } from 'redux-saga'
import { take, put, call, fork, cancel, cancelled } from 'redux-saga/effects'
import { Types, Creators as Actions } from '../actions'


export default api => {
  // AUTH
	function* auth(user) {
		try {

			// yield call(delay, 3000)
			// let error = '[500] Authentication failed.'

			const success = '[200] Login successful.'
			yield put(Actions.loginAuthSuccess({token: 'token'}))
			yield put(Actions.loginUserSuccess(user, success))
			// const authResp = yield call(api.auth, user)

			// // Did user login?
			// if (prop('ok', authResp)) {
			// 	const authData = prop('data', authResp)
			// 	yield put(Actions.loginAuthSuccess(authData))

			// 	// Attempt to get user
			// 	const userResp = yield call(api.getUser)

			// 	// Finally logged in?
			// 	if (prop('ok', userResp)) {
			// 		const userData = path(['data'], userResp)
			// 		const success = '[200] Login successful.'
			// 		return yield put(Actions.loginUserSuccess(userData, success))
			// 	}
			// } else {
			// 	error = path(['data', 'message'], authResp) || error
			// }

			// // User did not login
			// yield put(Actions.loginFailure(error))
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
			
			if (prop('ok', registerResp)) {
				const userData = path(['data'], registerResp)
				const success = path(['message'], registerResp) || '[200] Register successful.'
				yield put(Actions.registerSuccess(userData, success))

			} else {
				error = path(['data', 'message'], registerResp) || error
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
				Types.REGISTER_SUCCESS,
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
