import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import PatientList from "../../Components/PatientList/PatientList";
import Messaging from "../../Components/Messaging/Messaging";
import ActivitySummary from "../../Components/PTActivitySummary/PTActivitySummary";
import PatientDashboardInfo from "../../Components/PatientDashboardInfo/PatientDashboardInfo";

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
    height: 700,
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
  paperProfile: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.secondary.main,
    height: 650,
    width: 700,
    marginTop: 50,
    marginBottom: 139,
  },
  paperSummary: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.secondary.main,
    marginTop: 50,
    width: 350,
  }
}));

const Dashboard = () => {
  const classes = useStyles();

  return (
    <div
      className={classes.root}
      justify={"space-between"}
      alignItems={"flex-start"}
    >
      <Grid container spacing={3} direction="row" style={{
        margin: 0,
        width: '100%'
      }}>
        <Grid item>
          {/* <Grid container direction="column"> */}
          <Grid item>
            <Paper
              className={classes.paperPatients}
              style={{ overflow: "auto" }}
              elevation={5}
            >
              <PatientList />
              <Messaging />
            </Paper>
          </Grid>
          {/* </Grid> */}
        </Grid>
        <Grid item>
          <Paper className={classes.paperProfile} elevation={5}>
            {/* <PatientsList/>  TODO need to handle Axios or hooks
                        in order to use*/}
            <Typography variant= "h6">Patient Profile</Typography>
            <PatientDashboardInfo />
          </Paper>
        </Grid>
        <Grid item>
          <Paper className={classes.paperSummary} elevation={5}>
            <Typography><b><u>Total Activity Summary</u></b></Typography>
            <ActivitySummary />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
