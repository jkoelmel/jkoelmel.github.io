import React from 'react'
import "./styles.css"
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import PatientList from '../../Components/PatientList/PatientList'

const Landing = () => {

    return (
        <div className = 'root'>
        <Grid container className ='grid-root' spacing={0}>
            <Grid item xs={3} > 
            <Paper >
                <PatientList/>
                </Paper>
            </Grid>
           
        </Grid>
        </div>
    )
       
}

export default Landing