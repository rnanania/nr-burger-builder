import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

describe('auth reducer', () => {
    const initialState = {
        token: null,
        userId: null,
        error: null,
        loading: false
    };

    it('Should return initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialState);
    });

    it('Should store the token upon login', () => {
        expect(reducer(initialState, {
            type: actionTypes.AUTH_SUCCESS,
            userId: 'userId',
            token: 'token'
        })
        ).toEqual({
            token: 'token',
            userId: 'userId',
            error: null,
            loading: false
        });
    })
});