import React from 'react'
import "./styles.css"
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import PatientList from '../../Components/PatientList/PatientList'
import SearchPlan from '../../Components/SearchPlan/SearchPlan'
import SearchReport from '../../Components/SearchReport/SearchReport'
import SearchActivities from '../../Components/SearchActivities/SearchActivities'



const Landing = () => {

    return (
        <div className = 'root'>
            <Grid container className ='grid-root' spacing={5}>
                <Grid item xs={3} > 
                    <Paper >
                        <PatientList/>
                    </Paper>
                </Grid>
                <Grid item xs={3} > 
                    <Paper >
                        <SearchPlan/>
                    </Paper>
                </Grid>
            </Grid>
            <Grid item xs={3} > 
                <Paper >
                    <SearchReport/>
                </Paper>
            </Grid>
            <Grid item xs={3} >
                <Paper >
                    <SearchActivities />
                </Paper>
            </Grid>
        </div>
           )    
}

export default Landing