import { all } from 'redux-saga/effects'
import api from '../services/api'

// Sagas
import startup from './startup'
import runtime from './runtime'
import auth from './auth'

// Start the daemons
export default function* root() {
  yield all([
		startup(api).bootingFlow(),
		runtime(api).watchersFlow(),
		auth(api).loginFlow(),
		auth(api).logoutFlow(),
		auth(api).registerFlow(),
  ])
}
