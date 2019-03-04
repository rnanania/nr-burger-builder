import { takeEvery, takeLatest ,all } from 'redux-saga/effects';
import { authSaga, authCheckSaga, authLogoutSaga, autoLogoutSaga } from './auth';
import { initIngredientsSaga } from './burgerBuilder';
import { purchaseBurgerSaga, fetchOrdersSaga } from './order';
import * as actionTypes from '../actions/actionTypes';

export function* watchAuth() {
    yield all([
        takeEvery(actionTypes.AUTH_USER, authSaga),
        takeEvery(actionTypes.AUTH_CHECK, authCheckSaga),
        takeEvery(actionTypes.AUTH_INITITATE_LOGOUT, authLogoutSaga),
        takeEvery(actionTypes.AUTO_LOGOUT_IN_QUEUE, autoLogoutSaga)   
    ])
}

export function* watchBurgerBuilder() {
    yield takeEvery(actionTypes.INIT_INGREDIENTS, initIngredientsSaga);
}

export function* watchOrder() {
    yield takeLatest(actionTypes.PURCHASE_BURGER, purchaseBurgerSaga);
    yield takeEvery(actionTypes.FETCH_ORDERS, fetchOrdersSaga);
}