import React from 'react'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import axios from "axios";

const SearchReport = () => {
    const [patientReport,setPatientReport] = React.useState([]);
    const [patients,setPatients] = React.useState([]);
    const [entry, setEntry] = React.useState('');
    const [createdOn,setCreatedOn] = React.useState('')
    const PatientReport = [
        // {title: 'John Smith'},
        // {title: 'Steph Curry'},
        // {title: 'Michael Jordan'}
    ];
      const fetchPatientsReport = () => {
        axios.get('api/patient/entry/all',{
          params: {
            patient_id: 1
          } 
        }).then((response) => {
          console.log(response);
          console.log(response.data[0].patient);

          setPatientReport(response.data.map((pr) => {
            return pr
          })) 
      })
      .catch(console.log)
    }
    console.log(patientReport.map((patientReport) => {
      return patientReport
    }))

      React.useEffect(() => {
        //will load patients Report when the page loads
        fetchPatientsReport();
    }, []);


    return (
        <div>
            <div style={{ width: "auto" }}>
      <Autocomplete
        searchreport
        id="search-report"
        disableClearable
        options={PatientReport.map((pr) => pr.entry)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search Patient Report"
            margin="normal"
            variant="outlined"
            InputProps={{ ...params.InputProps, type: 'search' }}
          />
        )}
      />
    </div>
        </div>
    )
}

export default SearchReport