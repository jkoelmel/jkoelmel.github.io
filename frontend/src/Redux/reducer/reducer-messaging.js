import {handleActions} from "redux-actions";
import * as constants from "../constants/constants-messaging";

const initialMessageState = {
    messages: [{
        patient: '',
        number_unread: 0,
        sender: '',
        message: ''
    }]
};

const MessagingReducer = handleActions(
    {
        [constants]: (state, action) => {
            return {
                ...state,
                patients: action.payload,
            };
        },

    }, initialMessageState);

export default MessagingReducer;
