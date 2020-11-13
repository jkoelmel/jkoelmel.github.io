import React from "react";
import {Widget} from "react-chat-widget";
import 'react-chat-widget/lib/styles.css';
import axios from "axios";

const Messaging = () => {
    const [selectedPatient, setSelectedPatient] = React.useState('')
    const [patientHasMessage, setPatientHasMessage] = React.useState([]);


    const handleNewUserMessage = (newMessage) => {
        console.log(`New message request ${newMessage}`)

        const params = new URLSearchParams();
        params.append("message", newMessage);
        params.append("pt", 1);
        params.append("patient", 1);

        axios.post('http://localhost:8080/api/pt/message/register', params)
            .then((response) => {
            if (response.data == 200) {
                console.log("Message success")
            }
        })
            .catch(console.log)
    }

    const getPTMessages = () => {

    }

    return (


        <div>
            <Widget title={"Messages"} subtitle={""}
                    handleNewUserMessage={handleNewUserMessage}/>
        </div>
    )

}


export default Messaging;