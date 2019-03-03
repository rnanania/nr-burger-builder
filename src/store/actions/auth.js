import * as actionTypes from './actionTypes';
import axios from 'axios';

const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
};

const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: authData.idToken,
        userId: authData.localId
    }
};

const authFailed = (error) => {
    return {
        type: actionTypes.AUTH_FAILED,
        error: error
    }
};

export const authLogout = () => {
    localStorage.removeItem('idToken');
    localStorage.removeItem('localId');
    localStorage.removeItem('expirationTime');
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

const autoLogout = (expiresIn) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(authLogout())
        }, expiresIn);
    }
}

export const auth = (email, password, isSignUp) => {
    const authURL = isSignUp ? 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=' : 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=';
    const useInfo = isSignUp ? { email, password } : { email, password, 'returnSecureToken': true };
    return dispatch => {
        dispatch(authStart());
        axios.post(authURL + 'AIzaSyDeaWB_JvTg0vxAr11UGm91_kUl-FF5ToQ', useInfo).then(response => {
            const expiresIn = response.data.expiresIn ? response.data.expiresIn * 1000 : 3600 * 1000;
            const expirationTime = String(new Date(new Date().getTime() + expiresIn).getTime());
            localStorage.setItem('idToken', response.data.idToken);
            localStorage.setItem('localId', response.data.localId);
            localStorage.setItem('expirationTime', expirationTime);
            dispatch(authSuccess(response.data));
            dispatch(autoLogout(expiresIn));
        }).catch(error => {
            dispatch(authFailed(error.response.data.error));
        });
    }
}

export const authCheckState = () => {
    return dispatch => {
        const idToken = localStorage.getItem('idToken');
        const expirationTime = localStorage.getItem('expirationTime');
        if (idToken && Number(expirationTime) > new Date().getTime()) {
            const localId = localStorage.getItem('localId');
            dispatch(authSuccess({ idToken, localId }))
        } else {
            dispatch(authLogout());
        }
    }
}