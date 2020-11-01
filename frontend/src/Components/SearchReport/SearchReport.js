import React from 'react'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import axios from "axios";

const SearchReport = ({selectedPatient,setSelectedPatient}) => {
    const [patientReport,setPatientReport] = React.useState([]);
    const [patients,setPatients] = React.useState([]);
    const [entry, setEntry] = React.useState('');
    const [createdOn,setCreatedOn] = React.useState('')
    console.log(`patient id: ${selectedPatient}`)
      const fetchPatientsReport = () => {
        axios.get('http://localhost:8080/api/patient/entry/all',{
          params: {
            patient_id: selectedPatient
          } 
        }).then((response) => {
          console.log(response);
          console.log(response.data.patient);

          setPatientReport(response.data.map((pr) => {
            return pr
          })) 
      })
      .catch(console.log)
    }
    console.log(patientReport.map((p) => {
      return p
    }))

      React.useEffect(() => {
        //will load patients Report when the page loads
        if(selectedPatient!='')
          fetchPatientsReport();
    }, [selectedPatient]);


    return (
        <div>
            <div style={{ width: "auto" }}>
      <Autocomplete
        searchreport
        id="search-report"
        disableClearable
        options={patientReport.map((pr) => pr.entry)}
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