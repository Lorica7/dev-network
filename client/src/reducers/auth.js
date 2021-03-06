import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
   LOGIN_SUCCESS,
    AUTH_ERROR
} from '../actions/types';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
   user: null
}

export default function (state = initialState, action) {
    const { type, payload } = action;
   
    switch (type) {
         case USER_LOADED:
        return {
            
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload
    };
       

        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token', payload.token)
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                laoding: false
            }
        case REGISTER_FAIL:
            localStorage.removeItem('token');
             return {
                ...state,
                token: null,
                isAuthenticated: false,
                laoding: false
            }
            default: return state;
    }

}
