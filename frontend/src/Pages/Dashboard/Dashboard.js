import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import PatientList from "../../Components/PatientList/PatientList";

//TODO Will most likely have to fix paperMessage margins when we implement
//the actual message board.
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: 24,
    background: theme.palette.background.default,
  },
  paperMessage: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.secondary.main,
    height: 1000,
    width: 350,
    marginTop: 50,
    marginBottom: 139,
  },
  paperPatients: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.secondary.main,
    height: 525,
    width: 350,
    marginTop: 50,
    // marginBottom: 139
  },
  paperActivities: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.secondary.main,
    height: 500,
    width: 600,
    marginTop: 10,
    marginBottom: 139,
  },
}));

const Dashboard = () => {
  const classes = useStyles();

  return (
    <div
      className={classes.root}
      justify={"space-between"}
      alignItems={"flex-start"}
    >
      <Grid container spacing={3} direction="row">
        <Grid item>
          <Paper className={classes.paperMessage} elevation={5}>
            <Typography>Message Center</Typography>
          </Paper>
        </Grid>
        <Grid item>
          {/* <Grid container direction="column"> */}
          <Grid item>
            <Paper
              className={classes.paperPatients}
              style={{ overflow: "auto" }}
              elevation={5}
            >
              <PatientList />
            </Paper>
          </Grid>
          <Grid item>
            <Paper className={classes.paperActivities} elevation={5}>
              {/* <PatientsList/>  TODO need to handle Axios or hooks
                        in order to use*/}
              <Typography>Search Activities</Typography>
            </Paper>
          </Grid>
          {/* </Grid> */}
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
