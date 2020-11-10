import {handleActions} from 'redux-actions';
import * as constants from '../constants/constants-pt'

const initialPTState = {
    pt_id: 1,
    user: 251,
    user_id: 251,
    email: "jsmith@gmail.com",
    f_name: "John",
    l_name: "Smith",
    company: "HealQuik",
    patients: [
        {
            patient_id: 1,
            user: 497,
            pt: 1,
            prospective_pt: 0,
            user_id: 497,
            email: "jsmith@hotmail.com",
            f_name: "John",
            l_name: "Smith",
            company: "Lazzy",
            secret: "passwordEncryption"
        }
    ]
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
    }
}, initialPTState)

export default PTReducer