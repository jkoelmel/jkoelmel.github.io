import React, { useState, useEffect } from "react";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListSubheader from "@material-ui/core/ListSubheader";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { createNewPT, fetchPTsPatients } from "../../Redux/actions/actions-pt";

import "./PatientList.css";
import { ListItem, ListItemText } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  sticky: {
    backgroundColor: "white",
    fontSize: 18,
  },
  subheader: {
    fontSize: 18,
  },
  patientList: {},
}));

const PatientList = (props) => {
  const classes = useStyles();
  const [selectedPatient, setSelectedPatient] = useState({}); //patient object
  const [open, setOpen] = useState(false);

  useEffect(() => {
    //will load patients when the page loads
    props.fetchPTsPatients(props.pt.pt_id);
  }, []);

  //TODO save pt id

  const handlePatientClick = (e, patientId) => {
    props.patients.map((p) => {
      if (p.patient_id === patientId) {
        setSelectedPatient(p);
      }
    });
    setOpen(true);
    //TODO return patients info by its ID.
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <List
        component="nav"
        aria-label="patient-list"
        className={classes.patientList}
        subheader={
          <ListSubheader
            component="div"
            color="inherit"
            className={classes.sticky}
          >
            Patient List
          </ListSubheader>
        }
      >
        {props.patients.map((p) => (
          <ListItem
            key={p.patient_id}
            button
            selected={selectedPatient === p.patient_id}
            onClick={(event) => handlePatientClick(event, p.patient_id)}
          >
            <ListItemText primary={`${p.f_name} ${p.l_name}`} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List
        component="nav"
        aria-label="patient-list"
        className={classes.patientList}
        subheader={
          <ListSubheader
            component="div"
            color="inherit"
            className={classes.sticky}
            id="potential-patient-list"
          >
            Potential Patient List
          </ListSubheader>
        }
      >
        <ListItem button>
          <ListItemText secondary="no available potential patients" />
        </ListItem>
      </List>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <List>
              <ListItem>
                <ListItemText
                  primary={`Full Name`}
                  secondary={`${selectedPatient.f_name} ${selectedPatient.l_name}`}
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText
                  primary={`Email`}
                  secondary={`${selectedPatient.email}`}
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText
                  primary={`Company Name`}
                  secondary={`${selectedPatient.company}`}
                />
              </ListItem>
              <Divider />
            </List>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};
export default connect(
  (state) => ({
    // The state of the pt, as defined by reducer-pt
    pt: state.pt,
    // The state of the pt's patients, defined by reducer-pt
    patients: state.pt.patients,
  }),
  (dispatch) => ({
    // The action from actions-pt which will effect reducer-pt
    fetchPTsPatients: (pt_id) => dispatch(fetchPTsPatients(pt_id)),
    createNewPT: (pt) => dispatch(createNewPT(pt)),
  })
)(PatientList);

{
  /* <List component = "nav" aria-label="patient-list"
style={{maxHeight: 200, overflow: 'scroll'} }
subheader={
    <ListSubheader component="div" color="inherit" className="patient-list">
    Patient List
  </ListSubheader>
  
}>
    <ListItem 
    button
    selected= {selectedPatient == 0}
    onClick={(event) => handlePatientClick(event, 0)}>
        <ListItemText primary = "John Smith"/> 
    </ListItem>
    
    <ListItem button>
        <ListItemText primary = "Steph Curry"/> 
    </ListItem>
    <ListItem button>
        <ListItemText primary = "Michael Jordan"/> 
    </ListItem>
    </List>

    <List component = "nav" aria-label="patient-list"
        style={{maxHeight: 200, overflow: 'scroll'}}
        subheader={
    <ListSubheader component="div" color="inherit" id="potential-patient-list">
    Potential Patient List
  </ListSubheader>
}>
    <ListItem button>
        <ListItemText primary = "Bruce Lee"/> 
    </ListItem>
    <ListItem button>
        <ListItemText primary = "Peter Hu"/> 
    </ListItem>
    <ListItem button>
        <ListItemText primary = "Bob theBuilder"/> 
    </ListItem>
</List> */
}
