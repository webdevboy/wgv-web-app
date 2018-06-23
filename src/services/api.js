import apisauce from 'apisauce'
import { stringify } from 'qs'
import { prop, contains } from 'ramda'

// Define API
const api = apisauce.create({
	baseURL: process.env.REACT_APP_API_BASE_URL+'/v1',
	headers: {
		'X-Requested-With': 'XMLHttpRequest',
		'Accept': 'application/json',
	},
	timeout: 60000,
})

// Define API transforms
api.addRequestTransform(request => {
	const method = prop('method', request)

	if (contains(method, ['post', 'put'])) {
		request.headers['Content-Type'] = 'application/x-www-form-urlencoded'
		request.data = stringify(request.data)
	}
})

api.addResponseTransform(response => {
	const ok = prop('ok', response)
	const data = prop('data', response)
	const problem = prop('problem', response)
	// console.log('Response ::', ok, response)

	if (!ok) {
		// console.log('Problem ::', problem, response)
		// just mutate the data to what you want.
		// TODO need to map these statuses and errors properly
		switch (problem) {
			// NOTE codes: https://github.com/infinitered/apisauce#problem-codes
			case 'CLIENT_ERROR':
				response.data = {
					status: 'error',
					...data,
				}
				break
			case 'TIMEOUT_ERROR':
				response.status = 408
				response.data = {
					status: 'error',
					message: 'Network timeout. Please try again.',
					...data,
				}
				break
			case 'CONNECTION_ERROR':
				response.status = 503
				response.data = {
					status: 'error',
					message: 'Server not available.',
					...data,
				}
				break
			case 'NETWORK_ERROR':
				response.status = 511
				response.data = {
					status: 'error',
					message: 'Network unavailable.',
					...data,
				}
				break
			case 'CANCEL_ERROR':
				response.status = 500
				response.data = {
					status: 'error',
					message: 'Request has been cancelled.',
					...data,
				}
				break
			default:
				response.status = 500
				response.data = {
					status: 'error',
					message: 'System error. Please contact webmaster.',
					...data,
				}
		}
	}
})

// Endpoints
const ENDPOINT = {
	OAUTH: '/users/authenticate',
	REGISTER: '/users',
	LOGOUT: '/logout',
	USER: '/users/profile',
}

// TODO how to cancel/abort http request ?
export default {
	// Headers
	setAuthHeader: token => api.setHeader('x-access-token', token),
	deleteAuthHeader: () => api.deleteHeader('x-access-token'),
	// Auth
	auth: user => api.post(`${ENDPOINT.OAUTH}`, user),
	register: user => api.post(`${ENDPOINT.REGISTER}`, user),
	logout: () => api.get(ENDPOINT.LOGOUT),
	getUser: () => api.get(ENDPOINT.USER),
}
