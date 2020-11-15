import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import axios from "axios";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import { ListSubheader } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  sticky: {
    backgroundColor: "white",
  },
}));

const SearchReport = ({ selectedPatient, setSelectedPatient }) => {
  const classes = useStyles();
  const [patientReport, setPatientReport] = React.useState([]);
  const [patients, setPatients] = React.useState([]);
  const [entry, setEntry] = React.useState("");
  const [createdOn, setCreatedOn] = React.useState("");
  console.log(`patient id: ${selectedPatient}`);
  const fetchPatientsReport = () => {
    axios
      .get("/api/patient/entry/all", {
        params: {
          patient_id: selectedPatient,
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
  console.log(
    patientReport.map((p) => {
      return p;
    })
  );

  React.useEffect(() => {
    //will load patients Report when the page loads
    if (selectedPatient != "") fetchPatientsReport();
  }, [selectedPatient]);

  return (
    <div className={classes.sticky}>
      <List
        component="nav"
        aria-label="patient-list"
        style={{ maxHeight: 600, overflowY: "scroll" }}
      >
        {patientReport.map((pr) => (
          <ListItem>{pr.created_on + " " + pr.entry}</ListItem>
        ))}
      </List>
      {/*<Autocomplete*/}
      {/*  searchreport*/}
      {/*  id="search-report"*/}
      {/*  disableClearable*/}
      {/*  options={patientReport.map((pr) => pr.created_on + " " + pr.entry)}*/}
      {/*  renderInput={(params) => (*/}
      {/*    <TextField*/}
      {/*      {...params}*/}
      {/*      label="Search Patient Report"*/}
      {/*      margin="normal"*/}
      {/*      variant="outlined"*/}
      {/*      InputProps={{ ...params.InputProps, type: 'search' }}*/}
      {/*    />*/}
      {/*  )}*/}
      {/*/>*/}
    </div>
  );
};

export default SearchReport;
