import React from 'react'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

const SearchPlan = () => {
  const [exercisePlan,setExercisePlan] = React.useState([]);

    const ExercisePlan = [
        {title: 'Leg Exercise'},
        {title: 'Back Exercise'},
        {title: 'Acl Rehabilitation'}
    ];


    return (
        <div>
            <div style={{ width: 300 }}>
      <Autocomplete
        searchplan
        id="search-plan"
        disableClearable
        options={ExercisePlan.map((option) => option.title)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search Exercise Plan"
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

export default SearchPlan
