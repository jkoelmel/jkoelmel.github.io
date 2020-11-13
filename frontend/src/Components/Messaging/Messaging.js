import React, {useEffect, useState} from "react";
import {addResponseMessage, Widget} from "react-chat-widget";
import 'react-chat-widget/lib/styles.css';
import axios from "axios";
import {connect} from "react-redux";
import {createNewPT, fetchPTsPatients} from "../../Redux/actions/actions-pt";

const Messaging = (props) => {
    const [patientHasMessage, setPatientHasMessage] = React.useState([]);

    useEffect(() => {
        addResponseMessage("Welcome to the chat");
        props.fetchPTsPatients(props.pt.pt_id)
    }, []);

    const handleNewUserMessage = (newMessage) => {
        console.log(`New message request ${newMessage}`)

        const params = new URLSearchParams();
        params.append("message", newMessage);
        params.append("pt", 1);
        params.append("patient", 1);

        axios.post('api/pt/message/register', params)
            .then((response) => {
            if (response.data == 200) {
                console.log("Message success")
                let response = "Auto-reply";
                addResponseMessage(response);
            }
        }).catch(console.log)


    }

    return (
        <div>
            <Widget title={"Messages From"} subtitle={`${props.selectedPatient.f_name} ${props.selectedPatient.l_name}`}
                    handleNewUserMessage={handleNewUserMessage}/>
        </div>
    )

}


export default connect((state) => ({
        pt: state.pt,
        patients: state.pt.patients,
        selectedPatient: state.pt.selectedPatient
    }), (dispatch) => ({
        fetchPTsPatients: (pt_id) => dispatch(fetchPTsPatients(pt_id)),
    })
)(Messaging);