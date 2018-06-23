import { createActions } from 'reduxsauce';

export const { Types, Creators } = createActions({
  // Notification
	setNotification: ['message', 'level'],
	clearNotification: null,
	// Auth & User
	loginAttempt: ['user'],
	loginAuthSuccess: ['auth'],
	loginUserSuccess: ['user', 'success'],
	loginFailure: ['error'],
	logout: null,
	getUsersAttempt: null,
	getUsersSuccess: ['data'],
	getUsersFailure: null,
	registerAttempt: ['user'],
	registerSuccess: ['user', 'success'],
	registerFailure: ['error'],
	
})
