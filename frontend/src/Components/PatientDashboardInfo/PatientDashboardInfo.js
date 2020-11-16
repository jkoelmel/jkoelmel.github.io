import React from 'react'
import { connect } from 'react-redux';
import { createNewPT, fetchPTsPatients, setSelectedPatient, updatePT } from '../../Redux/actions/actions-pt';
import {fetchPatientExerciseVideos} from '../../Redux/actions/actions-patients'
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListSubheader from '@material-ui/core/ListSubheader';
import Grid from "@material-ui/core/Grid";
import { ListItem, ListItemText } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    small: {
        width: theme.spacing(3),
        height: theme.spacing(3),
    },
    large: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    }, 
    gridList: {
        flexWrap: 'nowrap',
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
      },
      title: {
        color: theme.palette.primary.light,
      },
      titleBar: {
        background:
          'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
      },
}));

const PatientDashboardInfo = (props) => {
    const classes = useStyles();
    const [userImage, setUserImage] = React.useState("");
    const [videos, setVideos] = React.useState([]);

    const fetchPatientImg = () => {
        //TODO hard-coded need to add support to various patients in DB
        axios.get("https://randomuser.me/api/?gender=male").then((response) => {
            setUserImage(response.data.results[0].picture.large);
        });
    };

    const fetchPatientVideos = () => {
        axios
            .get("api/patient/video/id", {
                params: {
                    patient:1,
                },
            })
            .then((response) => {
                console.log(response.data)
                setVideos(
                    response.data.map((pv) => {
                        console.log(response.data);
                        return pv;
                    })
                );
            })
            .catch(console.log);
    };
    React.useEffect(() => {
        //will load patients activities when the page loads
        // setGender("male");
 
        // fetchPatientVideos();
        fetchPatientImg();
    }, []);

    return (
        <div>
            <Grid container direction="column">
            { props.selectedPatient.patient_id ? <Paper elevation={3}>
                    <Grid item>

                        <List>
                            <ListItem>
                                <Avatar alt="user-profile images" src={userImage} className={classes.large} />
                                {/* <img class="image" src={userImage} /> */}
                            </ListItem>
                            <ListItem>
                                <ListItemText primary={`Full Name`}
                                    secondary={`${props.selectedPatient.f_name} ${props.selectedPatient.l_name}`} />
                            </ListItem>
                            <Divider />
                            <ListItem>
                                <ListItemText primary={`Email`} secondary={`${props.selectedPatient.email}`} />
                            </ListItem>
                            <Divider />
                            <ListItem>
                                <ListItemText primary={`Company Name`} secondary={`${props.selectedPatient.company}`} />
                            </ListItem>
                            <Divider />
                        </List>
                    </Grid> 
                    
                        <GridList className={classes.gridList} cols={2.5}>
                            {props.PatientExerciseVideos.map((v) => (
                                <GridListTile key={v.img}>
                                    <img
                                        src={
                                            "https://img.youtube.com/vi/" +
                                            v.video_url.split("=")[1] +
                                            "/0.jpg"
                                        }
                                    />
                                    <GridListTileBar
                                        title={v.title}
                                        classes={{
                                            root: classes.titleBar,
                                            title: classes.title,
                                        }}
                                    />
                                </GridListTile>
                            ))}
                        </GridList>
                        </Paper>: <p> </p>}
            </Grid>
        </div>

    )
}

export default connect((state) => ({
    // The state of the pt, as defined by reducer-pt
    pt: state.pt,
    // The state of the pt's patients, defined by reducer-pt
    patients: state.pt.patients,
    selectedPatient: state.pt.selectedPatient,
    PatientExerciseVideos: state.exercises.patientExerciseVideos

}), (dispatch) => ({
    // The action from actions-pt which will effect reducer-pt
    fetchPTsPatients: (pt_id) => dispatch(fetchPTsPatients(pt_id)),
    createNewPT: (pt) => dispatch(createNewPT(pt)),
    setSelectedPatient: (patient) => dispatch(setSelectedPatient(patient)),
    updatePT: (pt) => dispatch(updatePT(pt)),
    fetchPatientExerciseVideos: (selectedPatient) => dispatch(fetchPatientExerciseVideos(selectedPatient))
})
)(PatientDashboardInfo);
