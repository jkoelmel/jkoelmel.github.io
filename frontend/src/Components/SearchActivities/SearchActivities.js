import React from 'react'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

const SearchActivities = () => {
    const[patientActivities,setPatientActivities] = React.useState([]);

    const ActivitiesDetails = [
        {title: 'Respond to questions'},
        {title: 'View Videos'},
        {title: 'Read profiles'},
        {title: 'Write notes'},
    ];


    return (
        <div>
            <div style={{ width: 300 }}>
      <Autocomplete
        searchactivities
        id="search-activities"
        disableClearable
        options={ActivitiesDetails.map((option) => option.title)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search PT Activities For Patient"
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

export default SearchActivities