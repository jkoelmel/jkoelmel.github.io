import {GET_PATIENTS} from '../types/types'
const initialState = {
    patients:[],
    loading: true
}


//this function is used when we add/delete users
export default function (state = initialState,action) {
    switch(action.type){

        case GET_PATIENTS:
        return {
            ...state,
            patients: action.payload,
            loading: false

        }
        default: return state
    }

}