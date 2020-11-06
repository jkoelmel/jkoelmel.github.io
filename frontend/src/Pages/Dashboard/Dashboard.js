import React from 'react'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import PatientListRedux from '../../Components/PatientList/PatientListRedux'

//TODO Will most likely have to fix paperMessage margins when we implement
//the actual message board.
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
        height: 1000,
        width: 350,
        marginTop: 10,
        marginBottom: 139
    },
    paperPatients: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.secondary.main,
        height: 500,
        width: 350,
        marginTop: 10,
        marginBottom: 139
    },
    paperActivities: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.secondary.main,
        height: 500,
        width: 600,
        marginTop: 10,
        marginBottom: 139
    },
}));

const Dashboard = () => {
    const classes = useStyles();


    return (
        <div className={classes.root}>
            <Grid container spacing={5} direction="row">
                <Grid item md={3}>
                    <Paper className={classes.paperMessage} elevation={5}>
                        <Typography>Message Center</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={3}>
                    <Paper className={classes.paperPatients} elevation={5}>
                        {/* <PatientsList/>  TODO need to handle Axios or hooks
                        in order to use*/}
                            <PatientListRedux/>
                    </Paper>
                </Grid>
                <Grid item xs={3}>
                    <Paper className={classes.paperActivities} elevation={5}>
                        {/* <PatientsList/>  TODO need to handle Axios or hooks
                        in order to use*/}
                        <Typography>Search Activities</Typography>
                    </Paper>
                </Grid>

            </Grid>

        </div>
    )
}

export default Dashboard
