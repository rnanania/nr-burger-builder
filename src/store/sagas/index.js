import { takeEvery } from 'redux-saga/effects';
import { authSaga, authCheckSaga, authLogoutSaga, autoLogoutSaga } from './auth';
import { initIngredientsSaga } from './burgerBuilder';
import * as actionTypes from '../actions/actionTypes';

export function* watchAuth() {
    yield takeEvery(actionTypes.AUTH_USER, authSaga);
    yield takeEvery(actionTypes.AUTH_CHECK, authCheckSaga);
    yield takeEvery(actionTypes.AUTH_INITITATE_LOGOUT, authLogoutSaga);
    yield takeEvery(actionTypes.AUTO_LOGOUT_IN_QUEUE, autoLogoutSaga);
}

export function* watchBurgerBuilder() {
    yield takeEvery(actionTypes.INIT_INGREDIENTS, initIngredientsSaga);
}