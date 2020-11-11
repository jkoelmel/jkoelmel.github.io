import React from 'react'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {makeStyles} from '@material-ui/core/styles';
import {ListItem, ListItemText, Typography} from '@material-ui/core';
import Library from "../../Components/ExerciseLibrary/Library";
import SavedWorkout from "../../Components/SavedWorkout/SavedWorkout";


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginTop: 24,
        background: theme.palette.background.default,
        overflow: 'hidden',
        paddingTop: 75
    },
    paperLibrary: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.secondary.main,
        height: 750,
        width: 400,
        marginTop: 10,
        marginBottom: 139,
        marginLeft: 30
    },
    paperWorkouts: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.secondary.main,
        height: 600,
        width: 425,
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
                    <Paper className={classes.paperLibrary} elevation={5}
                     style={{ maxHeight: 700, overflowY: 'scroll',paddingTop: '0px'}}>
                        {/* <Typography>Exercise Library</Typography> */}
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
                        <SavedWorkout/>
                    </Paper>
                </Grid>

            </Grid>

        </div>
    )
}

export default Exercise
