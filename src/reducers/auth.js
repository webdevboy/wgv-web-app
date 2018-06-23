import { Types } from '../actions'
import Immutable from 'seamless-immutable'
import { createReducer } from 'reduxsauce'

const INITIAL_STATE = Immutable({
	uiLoading: false,
	token: null,
	user: null,
	error: null,
})

// AUTH
const loginAttempt = state => {
	const newState = Immutable(state)
	return newState.merge({
		uiLoading: true,
	})
}

const loginAuthSuccess = (state, { auth }) => {
	return state.merge({
		token: auth.token,
	})
}

const loginUserSuccess = (state, { user }) => {
	return state.merge({
		uiLoading: false,
		user: user,
	})
}

const loginFailure = (state, { error }) => {
	return state.merge({
		uiLoading: false,
		error: error,
	})
}

const registerAttempt = state => {
	const newState = Immutable(state)
	return newState.merge({
		uiLoading: true,
		error: INITIAL_STATE.error,
	})
}

const registerSuccess = state => {
	return state.merge({
		uiLoading: false,
	})
}

const registerFailure = (state, { error }) => {
	return state.merge({
		uiLoading: false,
		error: error,
	})
}

const logout = state => INITIAL_STATE

// map our types to our handlers
const ACTION_HANDLERS = {
	// AUTH
	[Types.LOGIN_ATTEMPT]: loginAttempt,
	[Types.LOGIN_AUTH_SUCCESS]: loginAuthSuccess,
	[Types.LOGIN_USER_SUCCESS]: loginUserSuccess,
	[Types.LOGIN_FAILURE]: loginFailure,
	[Types.REGISTER_ATTEMPT]: registerAttempt,
	[Types.REGISTER_SUCCESS]: registerSuccess,
	[Types.REGISTER_FAILURE]: registerFailure,
	// Reset
	[Types.LOGOUT]: logout,
}

export default createReducer(INITIAL_STATE, ACTION_HANDLERS)
