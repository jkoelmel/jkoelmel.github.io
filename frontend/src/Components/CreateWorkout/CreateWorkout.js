import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import TextField from '@material-ui/core/TextField';

const CreateWorkout = ({ checked, setChecked }) => {
    return (
        <div>
            <Grid container direction="column" space={3}>
                <Grid item >
                    <TextField
                        color="secondary"
                        id="standard-multiline-flexible"
                        label="Workout Title"
                        multiline
                        variant="filled"
                        rowsMax={4}/>
                </Grid>
                <Grid item>
                    <p>description</p>
                </Grid>
            </Grid>
        </div>
    )
}

export default CreateWorkout
