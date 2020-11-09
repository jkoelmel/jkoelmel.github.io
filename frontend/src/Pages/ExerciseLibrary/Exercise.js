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
import Library from "../../Components/ExerciseLibrary/Library";


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginTop: 24,
        background: theme.palette.background.default
    },
    paperLibrary: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.secondary.main,
        height: 750,
        width: 350,
        marginTop: 10,
        marginBottom: 139,
        marginLeft: 30
    },
    paperWorkouts: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.secondary.main,
        height: 600,
        width: 450,
        marginTop: 10,
        marginBottom: 139
    },
    paperAssign: {
        padding: theme.spacing(3),
        textAlign: 'center',
        color: theme.palette.secondary.main,
        height: 600,
        width: 300,
        marginTop: 10,
        marginBottom: 139,
        marginLeft: 50
    },
}));

const Exercise = () => {
    const classes = useStyles();
    const [selectedExercise, setSelectedExercise] = React.useState([]);
    
    return (
        <div className={classes.root}>
            <Grid container spacing={5} direction="row">
                <Grid item md={3}>
                    <Paper className={classes.paperLibrary} elevation={5}>
                        <Typography>Exercise Library</Typography>
                        <Library/>
                    </Paper>
                </Grid>
                <Grid item xs={3}>
                    <Paper className={classes.paperWorkouts} elevation={5}>
                        <Typography>Create Workout</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={3}>
                    <Paper className={classes.paperAssign} elevation={5}>
                        <Typography>Saved Workouts</Typography>
                    </Paper>
                </Grid>

            </Grid>

        </div>
    )
}

export default Exercise
