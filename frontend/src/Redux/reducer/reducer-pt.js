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
    secret: "passwordEncryption",
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
    }
}, initialPTState)

export default PTReducer