import React from 'react'
import "./styles.css"
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import PatientList from '../../Components/PatientList/PatientList'
import SearchPlan from '../../Components/SearchPlan/SearchPlan'
import SearchReport from '../../Components/SearchReport/SearchReport'
import SearchActivities from '../../Components/SearchActivities/SearchActivities'
import axios from 'axios'

const Landing = () => {
    // axios.get('api/pt/patients',{
    //     params: {
    //         pt_id: 1
    //     }
    // })
    //     .then(function (response) {
    //         console.log(response);
    //         console.log(response.data[0].f_name);
    //     })
    //     .catch(function (error) {
    //         console.log(error);
    //     });
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
            </Grid>
                    
        </div>
           )    
}

export default Landing