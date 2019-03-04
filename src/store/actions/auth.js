import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
};

export const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: authData.idToken,
        userId: authData.localId
    }
};

export const authFailed = (error) => {
    return {
        type: actionTypes.AUTH_FAILED,
        error: error
    }
};

export const authLogoutAction = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
};

export const authLogout = () => {
    return {
        type: actionTypes.AUTH_INITITATE_LOGOUT
    }
}

export const autoLogout = (expiresIn) => {
    return {
        type: actionTypes.AUTO_LOGOUT_IN_QUEUE,
        expiresIn
    }    
}

export const auth = (email, password, isSignUp) => {
    return {
        type: actionTypes.AUTH_USER,
        email,
        password,
        isSignUp
    }
}

export const authCheckState = () => {
    return {
        type: actionTypes.AUTH_CHECK
    }
}