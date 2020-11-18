import * as constants from '../constants/constants-messaging'
import {getAuth, postAuth} from "./actions-auth";
import {addResponseMessage, addUserMessage} from "react-chat-widget";

export const createNewPTMessage = (data) => {
    const params = new URLSearchParams();
    params.append("message", data.message);
    params.append("pt", data.pt);
    params.append("patient", data.patient);

    return (dispatch) => {
        postAuth("api/pt/message/register", params)
            .then(() => {
                console.log("Succeeded creating message");
                dispatch(fetchMessages(data));
            })
            .catch(err => console.error(err));
    }
};

export const fetchMessages = (data) => {
    const params = {pt: data.pt, patient: data.patient}

    return (dispatch) => {
        getAuth("api/pt/message/id", params)
            .then((response) => {
                response.data.map((message) => {
                    if (message.sender === data.email) {
                        // addUserMessage(m.message);
                    } else {
                        // addResponseMessage(m.message)
                    }
                });
            }).catch(console.log);
    }
}