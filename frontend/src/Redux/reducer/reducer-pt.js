import { handleActions } from 'redux-actions';
import * as constants from '../constants/constants-pt'

const initialPTState = {
    pt_id: 1,
    user: null,
    user_id: null,
    email: '',
    f_name: '',
    l_name: '',
    company: '',
    patients: [{}]
};

const PTReducer = handleActions({
    [constants.GET_PT_PATIENTS]: (state, action) => {
        return {
            ...state,
            patients: action.payload
        }
    },

    [constants.CREATE_PT]: (state, action) => {
        const pt = action.payload
        // TODO: we might be able to just say return { action.payload } but idk, test it out?
        return {
            email: pt.email,
            f_name: pt.f_name,
            l_name: pt.l_name,
            company: pt.company,
            patients: []
        }
    },

    [constants.UPDATE_PT]: (state, action) => {
        console.log(action.payload)
        return {
            // ...state allows it to keep existing state, and only update pt_id, user, and user_id
            ...state,
            pt_id: action.payload.pt_id,
            user: action.payload.user,
            user_id: action.payload.user_id
        }
    },
    [constants.LOGIN_PT]: (state, action) => {
        const pt = action.payload
        return {
            email: pt.email,
        }
    },
    [constants.CHECK_LOGIN_ERROR]: (state, action) => {
        const errorCode = action.payload
        console.log(errorCode)
        return { errorCode: errorCode }

    }
}, initialPTState)

export default PTReducer