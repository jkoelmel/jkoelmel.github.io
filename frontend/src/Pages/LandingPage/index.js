import React from 'react'
import "./styles.css"
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Container, Typography } from '@material-ui/core';
import Modal from '@material-ui/core/Modal';

import PatientList from '../../Components/PatientList/PatientList'
import SearchPlan from '../../Components/SearchPlan/SearchPlan'
import SearchReport from '../../Components/SearchReport/SearchReport'
import SearchActivities from '../../Components/SearchActivities/SearchActivities'
import axios from 'axios'
import Image from '../../Assets/katee-lue-SxR5wZYaOtg-unsplash.jpg'
import HouseIcon from '../../Assets/houseIcon.svg'
import DoctorIcon from '../../Assets/doctorIcon.svg'
import PhoneIcon from '../../Assets/phoneIcon.svg'
import { makeStyles } from '@material-ui/core/styles';
import LoginForm from '../../Components/LoginForm/LoginForm'

const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: "100vh",
        backgroundImage: `url(${Image})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: 'cover',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

    },
    buttons: {
        color: theme.palette.secondary.main
    },
    LoginModal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }

}))

const Landing = () => {
    const classes = useStyles();
    const [LoginOpen, setLoginOpen] = React.useState(false);

    const handleLoginOpen = () => {
        setLoginOpen(true);
    };

    const handleLoginClose = () => {
        setLoginOpen(false);
    };


    return (
        <div className={classes.root}>
            <Grid container direction="column" alignItems="center" spacing={3}>
                <Grid item>
                    <Grid container direction="row">
                        <Grid item>
                            <Typography variant="h2" alignItems="center">
                                Living Better One day At a Time...</Typography>
                        </Grid>
                        <Grid container>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item>
                    <Grid container direction="row" spacing={4} >
                        <Grid item>
                            <Grid container direction="column" alignItems="center">
                                <img src={DoctorIcon} />
                                <Typography variant="h5">Get matched with a patient</Typography>
                            </Grid>
                        </Grid>
                        <Grid item >
                            <Grid container direction="column" alignItems="center">
                                <img src={HouseIcon} />
                                <Typography variant="h5" >Provide care on your own schedule</Typography>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Grid container direction="column" alignItems="center">
                                <img src={PhoneIcon} />
                                <Typography variant="h5">Heal with professional feedback</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container direction="column" alignItems="center">
                    <Grid item>
                        <Button variant="contained" className={classes.buttons}>Register Now</Button>
                    </Grid>
                    <Grid item>
                        <Button className={classes.buttons}
                            onClick={handleLoginOpen}>
                            Already registered? Log in
                                </Button>
                    </Grid>
                </Grid>
            </Grid>
            <Modal
                open={LoginOpen}
                onClose={handleLoginClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                className={classes.LoginModal}>

                <LoginForm />
            </Modal>
        </div>
    )
}

export default Landing
 // <div className = 'root'>
        //     <Grid container className ='grid-root' spacing={5}>
        //         <Grid item xs={3} > 
        //             <Paper >
        //                 <PatientList patients = {patients} setPatients = {setPatients}
        //                 selectedPatient = {selectedPatient} setSelectedPatient= {setSelectedPatient}/>
        //             </Paper>
        //         </Grid>
        //         <Grid item xs={3} > 
        //             <Paper >
        //                 <SearchPlan patients = {patients} setPatients = {setPatients}
        //                  selectedPatient = {selectedPatient} setSelectedPatient= {setSelectedPatient}/>
        //             </Paper>
        //         </Grid>
        //     <Grid item xs={3} > 
        //         <Paper >
        //             <SearchReport selectedPatient = {selectedPatient} setSelectedPatient= {setSelectedPatient}/>
        //         </Paper>
        //     </Grid>
        //     <Grid item xs={3} > 
        //         <Paper >
        //             <SearchActivities selectedPatient = {selectedPatient} setSelectedPatient= {setSelectedPatient}/>
        //         </Paper>
        //     </Grid>

        //     </Grid>        
        // </div>