import React, { useEffect } from "react";
import {Launcher} from 'react-chat-window'
import "react-chat-widget/lib/styles.css";
import axios from "axios";
import { connect } from "react-redux";
import './Messaging.css'
import {fetchMessages} from "../../Redux/actions/actions-messaging";

const Messaging = (props) => {
  useEffect(() => {
      const data = {pt: props.pt.pt_id, patient: props.pt.selectedPatient.patient_id, email: props.pt.email}
      props.fetchMessages(data);
  }, [props.pt.selectedPatient.patient_id]);

  const handleNewUserMessage = (newMessage) => {
    const params = new URLSearchParams();
    params.append("message", newMessage);
    params.append("pt", props.pt.pt_id);
    params.append("patient", props.pt.selectedPatient.patient_id);

    axios
      .post("api/pt/message/register", params)
      .then((response) => {
        if (response.data == 200) {
          console.log("Message success");
        }
      })
      .catch(console.log);
  };

  return (
    <div>
        <Launcher
            agentProfile={{
                teamName: 'react-chat-window',
                imageUrl: 'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png'
            }}
            onMessageWasSent={handleNewUserMessage}
            messageList={props.messages}
            showEmoji={false}
        />
      {/*<Widget*/}
      {/*  title={"Messages From"}*/}
      {/*  subtitle={`${props.pt.selectedPatient.f_name} ${props.pt.selectedPatient.l_name}`}*/}
      {/*  showTimeStamp={false}*/}
      {/*  senderPlaceHolder={"Enter message..."}*/}
      {/*  handleNewUserMessage={handleNewUserMessage}*/}
      {/*/>*/}
    </div>
  );
};

export default connect(
  (state) => ({
      pt: state.pt,
      messages: state.messages.messages
  }),
  (dispatch) => ({
      fetchMessages: (data) => dispatch(fetchMessages(data))
  })
)(Messaging);
