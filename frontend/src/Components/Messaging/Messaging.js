import React, {useEffect, useState} from "react";
import {addResponseMessage, addUserMessage, deleteMessages, Widget} from "react-chat-widget";
import 'react-chat-widget/lib/styles.css';
import axios from "axios";
import {connect} from "react-redux";
import {createNewPT, fetchPTsPatients} from "../../Redux/actions/actions-pt";

const Messaging = (props) => {

    useEffect(() => {
        props.fetchPTsPatients(props.pt.pt_id);
            deleteMessages(1000);
            fetchMessages();
    }, [props.pt.selectedPatient.patient_id]);

    const fetchMessages = () => {
        axios.get('http://localhost:8080/api/pt/message/id', {
            params: {
                pt: props.pt.pt_id,
                patient: props.pt.selectedPatient.patient_id
            }
        }).then((response) => {
            console.log(response.data);
                response.data.map((m) => {
                    if(m.pt < 100) {
                        addResponseMessage(m.message);
                    } else {
                        addUserMessage(m.message);
                    }
                })
            }) .catch(console.log)
    }

    const handleNewUserMessage = (newMessage) => {
        console.log(`New message request ${newMessage}`)

        const params = new URLSearchParams();
        params.append("message", newMessage);
        params.append("pt", props.pt.pt_id);
        params.append("patient", props.selectedPatient.patient_id);

        axios.post('api/pt/message/register', params)
            .then((response) => {
                if (response.data == 200) {
                    console.log("Message success")
                }
            }).catch(console.log)


    }

    return (
        <div>
            <Widget title={"Messages From"}
                    subtitle={`${props.selectedPatient.f_name} ${props.selectedPatient.l_name}`}
                    showTimeStamp={false}
                    senderPlaceHolder={"Enter message..."}
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