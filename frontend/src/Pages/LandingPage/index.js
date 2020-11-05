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
    const [patients,setPatients] = React.useState([]);
    const [selectedPatient, setSelectedPatient] = React.useState('');
  
    return (
        <div className = 'root'>
            <Grid container className ='grid-root' spacing={5}>
                <Grid item xs={3} > 
                    <Paper >
                        <PatientList patients = {patients} setPatients = {setPatients}
                        selectedPatient = {selectedPatient} setSelectedPatient= {setSelectedPatient}/>
                    </Paper>
                </Grid>
                <Grid item xs={3} > 
                    <Paper >
                        <SearchPlan patients = {patients} setPatients = {setPatients}
                         selectedPatient = {selectedPatient} setSelectedPatient= {setSelectedPatient}/>
                    </Paper>
                </Grid>
            <Grid item xs={3} > 
                <Paper >
                    <SearchReport selectedPatient = {selectedPatient} setSelectedPatient= {setSelectedPatient}/>
                </Paper>
            </Grid>
            <Grid item xs={3} > 
                <Paper >
                    <SearchActivities selectedPatient = {selectedPatient} setSelectedPatient= {setSelectedPatient}/>
                </Paper>
            </Grid>
            
            </Grid>        
        </div>
           )    
}

export default Landing