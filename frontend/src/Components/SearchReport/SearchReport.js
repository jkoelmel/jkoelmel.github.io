import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import axios from "axios";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import { ListSubheader } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { setSelectedPatient } from "../../Redux/actions/actions-pt";

const useStyles = makeStyles((theme) => ({
  sticky: {
    backgroundColor: "white",
  },
}));

const SearchReport = (props) => {
  const classes = useStyles();
  const [patientReport, setPatientReport] = React.useState([]);

  const fetchPatientsReport = () => {
    axios
      .get("/api/patient/entry/all", {
        params: {
          patient_id: props.selectedPatient.patient_id,
        },
      })
      .then((response) => {
        console.log(response);
        console.log(response.data.patient);

        setPatientReport(
          response.data.map((pr) => {
            return pr;
          })
        );
      })
      .catch(console.log);
  };

  React.useEffect(() => {
    //will load patients Report when the page loads
    if (props.selectedPatient.patient_id != "") fetchPatientsReport();
  }, [props.selectedPatient.patient_id]);

  return (
    <div className={classes.sticky}>
      <List
        component="nav"
        aria-label="patient-list"
        style={{ maxHeight: 580, overflowY: "scroll" }}
      >
        {patientReport.map((pr) => (
          <ListItem>{pr.created_on + " " + pr.entry}</ListItem>
        ))}
      </List>
    </div>
  );
};

export default connect(
  (state) => ({
    // The state of the pt, as defined by reducer-pt
    // The state of the pt's patients, defined by reducer-pt
    patients: state.pt.patients,
    selectedPatient: state.pt.selectedPatient,
  }),
  (dispatch) => ({
    // The action from actions-pt which will effect reducer-pt
    setSelectedPatient: (patient) => dispatch(setSelectedPatient(patient)),
  })
)(SearchReport);
