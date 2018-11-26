import { path } from 'ramda';
import { push } from 'react-router-redux';
import { call, put, select, take, takeLatest } from 'redux-saga/effects';

import { Creators as Actions, Types } from '../actions';

// import { delay } from 'redux-saga'

export default api => {
	function* booking() {
        const state = yield select();
        const data = state.user;
        const user = state.auth.user;
        let error = 'Booking failed.'
        console.log('data', data);
        console.log('user', user)
        if (user) {
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

	}

	function* watchSetBook() {
        const task = yield takeLatest(Types.PICK_DATE, booking)
    }

    function* getAppointments() {
        let error = 'Appointments failed.'
        const { value } = yield take(Types.GET_APPOINTMENT_REQUEST);
        const appointmentRes = yield call(api.getAppointments)
        if (appointmentRes.ok) {
            const success = 'get successfully.'
            return yield put(Actions.getAppointmentSuccess(appointmentRes.data.data, success))
        } else {
            error = path(['data', 'error_msg'], appointmentRes) || error
            yield put(Actions.getAppointmentFailed(error))
        }
    }

    function* updateSelectedAppointmentStatus({ data }) {
        let error = 'update failed.'
        const appointmentRes = yield call(api.updateSeletectedAppointmentStatus, {
            id: data.id,
            status: data.status
        })

        if (appointmentRes.ok) {
            const success = 'update successfully.'
            return yield put(Actions.updateAppointmentStatusSuccess(appointmentRes.data.data, success))
        } else {
            error = path(['data', 'error_msg'], appointmentRes) || error
            yield put(Actions.updateAppointmentStatusFailed(error))
        }
    }

    function* watchUserAppointment() {
        yield takeLatest(Types.UPDATE_APPOINTMENT_STATUS_REQUEST, updateSelectedAppointmentStatus);
    }

    function* getUsers() {
        let error = 'Get failed.'
        const usersRes = yield call(api.getUsers)

        if (usersRes.ok) {
            const success = 'update successfully.'
            return yield put(Actions.getUsersSuccess(usersRes.data.data, success))
        } else {
            error = path(['data', 'error_msg'], usersRes) || error
            yield put(Actions.getUsersFailed(error))
        }
    }

    function* watchUsers() {
        yield takeLatest(Types.GET_USERS_REQUEST, getUsers);
    }

    function* getUserInfo(data) {
        let error = 'Get failed.'
        const userInfoRes = yield call(api.getUserInfo, data.userId);
        if (userInfoRes.ok) {
            const success = 'get successfully.'
            return yield put(Actions.getUserInfoSuccess(userInfoRes.data.data, success))
        } else {
            error = path(['data', 'error_msg'], userInfoRes) || error
            yield put(Actions.getUserInfoFailed(error))
        }
    }

    function* watchUserInfo() {
        yield takeLatest(Types.GET_USER_INFO_REQUEST, getUserInfo);
    }

    function* updateUserInfo({ data, userId }) {
        console.log(data)
        console.log(userId)
        let error = 'Update failed.'
        const userInfoRes = yield call(api.updateUserInfo, {
            photo: data,
            userId: userId
        });
        console.log('userInfoRes', userInfoRes)
        if (userInfoRes.ok) {
            const success = 'update successfully.'
            return yield put(Actions.updateUserInfoSuccess(userInfoRes.data.data, success))
            // return yield put(push('/admin/user'));
        } else {
            error = path(['data', 'error_msg'], userInfoRes) || error
            yield put(Actions.updateUserInfoFailed(error))
        }
    }

    function* watchUpdateUserInfo() {
        yield takeLatest(Types.UPDATE_USER_INFO_REQUEST, updateUserInfo);
    }

    function* getBookingDates() {
        let error = 'get failed.'
        const bookingRes = yield call(api.getBookingDates)

        if (bookingRes.ok) {
            const success = 'get successfully.'
            return yield put(Actions.getBookingDatesSuccess(bookingRes.data.data, success))

        } else {
            error = path(['data', 'error_msg'], bookingRes) || error
            yield put(Actions.getBookingDatesFailed(error))
        }
    }

    function* watchBookingDates() {
        yield takeLatest(Types.GET_BOOKING_DATES_REQUEST, getBookingDates);
    }

	return {
        watchSetBook,
        getAppointments,
        watchUserAppointment,
        watchUsers,
        watchUserInfo,
        watchUpdateUserInfo,
        watchBookingDates,
	}
}
