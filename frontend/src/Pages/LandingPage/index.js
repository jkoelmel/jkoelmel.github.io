import React from "react";
import "./styles.css";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { Container, Typography } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import axios from "axios";
import Image from "../../Assets/katee-lue-SxR5wZYaOtg-unsplash.jpg";
import HouseIcon from "../../Assets/houseIcon.svg";
import DoctorIcon from "../../Assets/doctorIcon.svg";
import PhoneIcon from "../../Assets/phoneIcon.svg";
import { makeStyles } from "@material-ui/core/styles";
import LoginForm from "../../Components/LoginForm/LoginForm";
import RegisterPT from "../../Components/RegisterPT/RegisterPT";

const useStyles = makeStyles((theme) => ({
  landingroot: {
    minHeight: "90vh",
    backgroundImage: `url(${Image})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPositionY: "-35vh",
    display: "flex",
    justifyContent: "center",
    paddingTop: "7vh",
    paddingLeft: 100,
    overflow: "hidden",
  },
  buttons: {
    color: theme.palette.secondary.main,
    marginTop: 10,
    marginRight: 45,
  },
  LoginModal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const Landing = ({handleLogin,error}) => {
    const classes = useStyles();
    const [LoginOpen, setLoginOpen] = React.useState(false);
    const [RegisterOpen, setRegisterOpen] = React.useState(false);

    const handleLoginOpen = () => {
        setLoginOpen(true);
    };

  const handleLoginClose = () => {
    setLoginOpen(false);
  };

  const handleRegisterOpen = () => {
    setRegisterOpen(true);
  };

  const handleRegisterClose = () => {
    setRegisterOpen(false);
  };

  return (
    <div className={classes.landingroot}>
      <Grid container direction="column" alignItems="center" spacing={3}>
        <Grid item>
          <Grid container direction="row">
            <Grid item>
              <Typography variant="h2" alignItems="center">
                Living Better One Day At a Time...
              </Typography>
            </Grid>
            <Grid container></Grid>
          </Grid>
        </Grid>

        <Grid item>
          <Grid container direction="row" spacing={4}>
            <Grid item>
              <Grid container direction="column" alignItems="center">
                <img src={DoctorIcon} />
                <Typography variant="h5">Get matched with a patient</Typography>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container direction="column" alignItems="center">
                <img src={HouseIcon} />
                <Typography variant="h5">
                  Provide care on your own schedule
                </Typography>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container direction="column" alignItems="center">
                <img src={PhoneIcon} />
                <Typography variant="h5">
                  Heal with professional feedback
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container direction="column" alignItems="center">
          <Grid item>
            <Button
              variant="contained"
              className={classes.buttons}
              onClick={handleRegisterOpen}
            >
              Register Now
            </Button>
          </Grid>
          <Modal
            open={RegisterOpen}
            onClose={handleRegisterClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            className={classes.LoginModal}
          >
            <RegisterPT />
          </Modal>
          <Grid item>
            <Button className={classes.buttons} onClick={handleLoginOpen}>
              Already registered? Log in
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Dialog
        open={LoginOpen}
        onClose={handleLoginClose}
        aria-labelledby="form-dialog-title"
        className={classes.LoginModal}
      >
        {/* <DialogTitle color="secondary" id="form-dialog-title">Log In</DialogTitle> */}
        <DialogContent>
          <LoginForm />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Landing;
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
