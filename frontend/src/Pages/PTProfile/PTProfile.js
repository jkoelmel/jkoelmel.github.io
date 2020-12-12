import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {makeStyles} from '@material-ui/core/styles';
import {ListItem, ListItemText, Typography} from '@material-ui/core';
import PTInfo from '../../Components/PTInfo/PTInfo';
const useStyles = makeStyles((theme) => ({
    root: {
      maxHeight: '95vh',
      flexGrow: 1,
      paddingTop: 100,
      background: theme.palette.background.default,
      overflow: 'hidden',
    },
    paperInfo: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.secondary.main,
      height: 675,
      width: 350,
      marginLeft: 10,
    },
}));
const PTProfile = () => {
    const classes = useStyles();
  // TODO change to reflect desired PT
  const [selectedPatient, setSelectedPatient] = React.useState(1);
  const [selectedWorkout, setSelectedWorkout] = React.useState('');
    return(
        <div className={classes.root}>
        <Grid container spacing={3} direction="row">
          <Grid item md={3}>
            <Paper className={classes.paperInfo} elevation={5}>
              <Typography>Physical Therapy Info</Typography>
              <PTInfo
              />
            </Paper>
          </Grid>
          </Grid>
        </div>
    );

};

export default PTProfile;