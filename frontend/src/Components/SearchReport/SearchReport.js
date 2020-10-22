import React from 'react'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';


const SearchReport = () => {
    const[patientReport,setPatientReport] = React.useState([]);

    const PatientReport = [
        {title: 'John Smith'},
        {title: 'Steph Curry'},
        {title: 'Michael Jordan'}
    ];


return (
    <div>
        <div style={{ width: "auto" }}>
  <Autocomplete
    searchreport
    id="search-report"
    disableClearable
    options={PatientReport.map((option) => option.title)}
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