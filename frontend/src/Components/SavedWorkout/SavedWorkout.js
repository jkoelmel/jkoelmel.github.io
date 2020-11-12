import React from 'react'
import axios from "axios";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import List from "@material-ui/core/List";
import {Divider, ListItem, ListItemText, ListSubheader} from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import {makeStyles} from "@material-ui/core/styles";
import ReactPlayer from "react-player";

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

const SavedWorkout = () => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [workouts, setWorkouts] = React.useState([]);
    const [selectedWorkout, setSelectedWorkout] = React.useState('');
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

    React.useEffect(() => {
        fetchPTWorkouts();
    }, []);


    return (
        <div className={classes.root}>
            <List aria-label="workout-list"
                  style={{maxHeight: 600}}>
                {workouts.map((w) => (
                    <div>
                        <ListItem
                            key={w.workout_id}
                            button
                            selected={selectedWorkout == w.workout_id}
                            onClick={(event) => handleWorkoutClick(event, w.workout_id)}>
                            {w.title}
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
                        style={{maxHeight: 400, overflowY: 'scroll', backgroundColor: "white"}}
                        subheader={
                            <ListSubheader component="div" color="inherit" classes= {"patient-list"}>
                                Workout Details
                            </ListSubheader>
                        }>
                    {exercises.map((e) => (
                        <div>
                            <ListItem
                                key={e.exercise_id}>
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

export default SavedWorkout