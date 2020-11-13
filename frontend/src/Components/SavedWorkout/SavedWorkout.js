import React from 'react'
import axios from "axios";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import List from "@material-ui/core/List";
import {Divider, ListItem, ListItemText, ListSubheader} from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import {makeStyles} from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import {connect} from "react-redux";
import {fetchPTsPatients,setSelectedWorkouts} from "../../Redux/actions/actions-pt";
const qs = require('qs');

const useStyles = makeStyles((theme) => ({

    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        //   border: '2px solid #000',a
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        outline: 'none',
    },
    sticky: {
        backgroundColor: 'white'

    }
}));

const SavedWorkout = (props) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [workouts, setWorkouts] = React.useState([]);
    const [exercises, setExercises] = React.useState([]);

    //TODO hard coded PT need to change to redux
    const fetchPTWorkouts = () => {
        axios.get('api/pt/workouts', {
            params: {
                pt: 1
            }
        }).then((response) => {

            setWorkouts(response.data.map((w) => {
                console.log(response.data)
                return w;
            }))
        })
            .catch(console.log)
    }

    const fetchWorkoutExercises = (selectedWorkout) => {
        axios.get('api/pt/exercises', {
            params: {
                workout: selectedWorkout
            }
        }).then((response) => {

            setExercises(response.data.map((e) => {
                console.log(response.data)
                setOpen(true);
                return e;
            }))
        })
            .catch(console.log)
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleWorkoutClick = (e, selectedWorkout) => {

        fetchWorkoutExercises(selectedWorkout);
    }

    const handleWorkoutToggle = (value) => () => {
        const currentIndex = props.savedWorkouts.indexOf(value);
        const newcheckedWorkout = [...props.savedWorkouts];

        if (currentIndex === -1) {
            newcheckedWorkout.push(value);
        } else {
            newcheckedWorkout.splice(currentIndex, 1);
        }

        // setCheckedWorkout(newcheckedWorkout);
        props.setSelectedWorkouts(newcheckedWorkout);
        
    };

    React.useEffect(() => {
        fetchPTWorkouts();
    }, []);

    return (
        <div className={classes.root}>
            <List aria-label="workout-list"
                  style={{maxHeight: 600}}>
                {workouts.map((w,k) => (
                    <div key={k}>
                        <ListItem
                            button
                            selected={props.savedWorkouts == w.workout_id}
                            onClick={(event) => handleWorkoutClick(event, w.workout_id)}>
                            {w.title}
                            <ListItemSecondaryAction>
                                <Checkbox
                                    edge="end"
                                    tabIndex={-1}
                                    disableRipple
                                    onChange={handleWorkoutToggle(w.workout_id)}
                                    checked={props.savedWorkouts.indexOf(w.workout_id) !== -1}
                                    inputProps={{ "aria-labelledby": `checkbox-list-label-${w.workout_id}` }}
                                />
                            </ListItemSecondaryAction>
                        </ListItem>
                    </div>
                ))}
            </List>

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <List
                        style={{maxHeight: 400, overflowY:"scroll", backgroundColor: "white"}}
                        subheader={
                            <ListSubheader component="div" color="inherit">
                                Workout Details
                            </ListSubheader>
                        }>
                    {exercises.map((e,k) => (
                        <div key={k}>
                            <ListItem>
                                <ListItemText primary={`Exercise Title`} secondary={e.title}/>
                            </ListItem>
                            <ListItem
                                key={e.exercise_id}>
                                <ListItemText primary={`Description`} secondary={e.description}/>
                            </ListItem>
                            <ListItem>
                            <a href = {e.exercise_url} target="_blank"><img src={"https://img.youtube.com/vi/" +
                            e.exercise_url.split("=")[1] + "/0.jpg"}/></a>
                            </ListItem>
                            <Divider/>
                        </div>
                    ))}
                </List>
                </Fade>
            </Modal>

        </div>
    )
}

export default connect((state) => ({
        // The state of the pt, as defined by reducer-pt
        pt: state.pt,
        // The state of the pt's patients, defined by reducer-pt
        patients: state.pt.patients,
        savedWorkouts: state.exercises.savedWorkouts
    }), (dispatch) => ({
        // The action from actions-pt which will effect reducer-pt
        fetchPTsPatients: (pt_id) => dispatch(fetchPTsPatients(pt_id)),
        setSelectedWorkouts: (savedWorkouts) => dispatch(setSelectedWorkouts(savedWorkouts))
    })
)(SavedWorkout);