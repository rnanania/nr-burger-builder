import axios from 'axios';
import { put , delay } from 'redux-saga/effects';
import * as actions from '../actions/index';

export function* authLogoutSaga() {
    yield localStorage.removeItem('idToken');
    yield localStorage.removeItem('localId');
    yield localStorage.removeItem('expirationTime');
    yield put(actions.authLogoutAction());
}

export function* autoLogoutSaga(action) {
    yield delay(action.expiresIn);
    yield put(actions.authLogout());
}

export function* authSaga(action) {
    const authURL = action.isSignUp ? 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=' : 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=';
    const useInfo = action.isSignUp ? { email: action.email, password: action.password } : { email: action.email, password: action.password, 'returnSecureToken': true };
    yield put(actions.authStart());
    try {
        const response = yield axios.post(authURL + 'AIzaSyDeaWB_JvTg0vxAr11UGm91_kUl-FF5ToQ', useInfo);
        const expiresIn = response.data.expiresIn ? response.data.expiresIn * 1000 : 3600 * 1000;
        const expirationTime = String(new Date(new Date().getTime() + expiresIn).getTime());
        yield localStorage.setItem('idToken', response.data.idToken);
        yield localStorage.setItem('localId', response.data.localId);
        yield localStorage.setItem('expirationTime', expirationTime);
        yield put(actions.authSuccess(response.data));
        yield put(actions.autoLogout(expiresIn));    
    } catch(error) {
        yield put(actions.authFailed(error.response.data.error));
    }
}

export function* authCheckSaga() {
    const idToken = localStorage.getItem('idToken');
    const localId = localStorage.getItem('localId');
    const expirationTime = localStorage.getItem('expirationTime');
    if (idToken && localId && Number(expirationTime) > new Date().getTime()) {
        yield put(actions.authSuccess({ idToken, localId }));
    } else {
        yield put(actions.authLogout());
    }
}