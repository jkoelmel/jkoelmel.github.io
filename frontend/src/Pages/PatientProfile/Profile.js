import React from 'react'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {makeStyles} from '@material-ui/core/styles';
import {ListItem, ListItemText, Typography} from '@material-ui/core';
import PatientListRedux from '../../Components/PatientList/PatientListRedux'
import SearchActivities from "../../Components/SearchActivities/SearchActivities";
import PatientVideo from "../../Components/PatientVideos/PatientVideo";
import ListSubheader from "@material-ui/core/ListSubheader";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Divider from "@material-ui/core/Divider";
import SearchReport from "../../Components/SearchReport/SearchReport";
import PatientInfo from "../../Components/PatientInfo/PatientInfo";


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginTop: 24,
        background: theme.palette.background.default
    },
    paperMessage: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.secondary.main,
        height: 600,
        width: 350,
        marginTop: 10,
        marginBottom: 139
    },
    paperPatients: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.secondary.main,
        height: 750,
        width: 350,
        marginTop: 10,
        marginBottom: 139
    },
    paperActivities: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.secondary.main,
        height: 600,
        width: 600,
        marginTop: 10,
        marginBottom: 139
    },
}));

const Profile = () => {
    const classes = useStyles();
    //TODO change to reflect desired patient
    const [selectedPatient, setSelectedPatient] = React.useState(1);

    return (
        <div className={classes.root}>
            <Grid container spacing={5} direction="row">
                <Grid item md={3}>
                    <Paper className={classes.paperMessage} elevation={5}>
                        <Typography>Patient Info</Typography>
                        <PatientInfo selectedPatient={selectedPatient} setSelectedPatient={setSelectedPatient}/>
                    </Paper>
                </Grid>
                <Grid item xs={3}>
                    <Paper className={classes.paperPatients} elevation={5}>
                        <Typography>Patient Videos</Typography>
                        <PatientVideo selectedPatient={selectedPatient} setSelectedPatient={setSelectedPatient}/>
                    </Paper>
                </Grid>
                <Grid item xs={3}>
                    <Paper className={classes.paperActivities} elevation={5}>
                        {/* <PatientsList/>  TODO need to handle Axios or hooks
                        in order to use*/}
                        <Typography>Progress Log</Typography>
                        <SearchReport selectedPatient={selectedPatient} setSelectedPatient={setSelectedPatient}/>
                    </Paper>
                </Grid>

            </Grid>

        </div>
    )
}

export default Profile
