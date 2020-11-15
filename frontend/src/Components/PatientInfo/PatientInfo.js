import React from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import List from "@material-ui/core/List";
import {
  Divider,
  ListItem,
  ListItemText,
  ListSubheader,
} from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    //   border: '2px solid #000',a
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    outline: "none",
  },
  sticky: {
    backgroundColor: "white",
  },
}));

const PatientInfo = ({ selectedPatient, setSelectedPatient }) => {
  const classes = useStyles();
  const [info, setInfo] = React.useState([]);
  const [gender, setGender] = React.useState("");
  const [userImage, setUserImage] = React.useState("");
  console.log(`patient id: ${selectedPatient}`);

  const fetchPatientInfo = () => {
    axios
      .get("api/patient/id", {
        params: {
          patient_id: selectedPatient,
        },
      })
      .then((response) => {
        console.log(response);
        console.log(response.data.patient);

        setInfo(response.data);
      })
      .catch(console.log);
  };

  const fetchPatientImg = () => {
    //TODO hard-coded need to add support to various patients in DB
    axios.get("https://randomuser.me/api/?gender=male").then((response) => {
      setUserImage(response.data.results[0].picture.large);
    });
  };
  React.useEffect(() => {
    //will load patients activities when the page loads
    setGender("male");
    if (selectedPatient != "") fetchPatientInfo();
    fetchPatientImg();
  }, [selectedPatient]);

  return (
    <div>
      <List
        component="nav"
        aria-label="patient-list"
        style={{ maxHeight: 550 }}
      >
        <div>
          <List
            component="nav"
            aria-label="patient-list"
            style={{ maxHeight: 600 }}
          >
            <div>
              <ListItem>
                <img class="image" src={userImage} />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={`Patient`}
                  secondary={info.f_name + " " + info.l_name}
                />
              </ListItem>
              <ListItem>
                <ListItemText primary={`Email`} secondary={info.email} />
              </ListItem>
              <ListItem>
                <ListItemText primary={`Company`} secondary={info.company} />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={`Injured Area`}
                  secondary={info.injury}
                />
              </ListItem>
              <Divider />
            </div>
          </List>
        </div>
      </List>
    </div>
  );
};

export default PatientInfo;
