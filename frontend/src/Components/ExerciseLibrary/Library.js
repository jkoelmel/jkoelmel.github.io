import React from 'react'
import axios from "axios";
import {useEffect} from 'react'
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import List from "@material-ui/core/List";
import {Divider, ListItem, ListItemText, ListSubheader} from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography"
import ReactPlayer from "react-player";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import {fetchExerciseVideos,selectedExercises} from '../../Redux/actions/actions-pt';
import {connect} from 'react-redux';
import {PlayArrow} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        //   border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        outline: 'none',
    },
    sticky: {
        backgroundColor: 'white',
        color: 'theme.palette.secondary',
        fontSize: 18

    },
    thumbnail: {
        maxHeight: '200px',
    }
}));

const Library = (props) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [exerciseVideos, setExerciseVideos] = React.useState([]);
    const [selectedVideo, setSelectedVideo] = React.useState([]);
    const [URL, setURL] = React.useState("");
    const [checked, setChecked] = React.useState([]);

    // const fetchExerciseVideos = () => {
    //     //TODO change back after testing
    //     axios.get('api/exercise/all')
    //         .then((response) => {
    //
    //             setExerciseVideos(response.data.map((ev) => {
    //                 console.log(response.data)
    //                 return ev;
    //             }))
    //         }).catch(console.log)
    //
    // }

    useEffect(() => {
        // fetchExerciseVideos();
        props.fetchExerciseVideos()
    }, []);

    const handleVideoClick = (event, exercise_id) => {
        const index = selectedVideo.indexOf(exercise_id);
        const newIndex = [...selectedVideo];

        if (index === -1) {
            newIndex.push(exercise_id);
        } else {
            newIndex.splice(index, 1);
        }

        setURL(props.exercises[newIndex - 1].exercise_url);
        console.log(URL);
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    //Handles checked videos and adds video ids into Checked
    const handleCheckToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);

    };
    console.log(checked)
    // console.log(props.exercises[0].exercise_id)


    return (
        //TODO add search field and update query to return tags

        <div className={classes.root}>
            <List component="nav" aria-label="video-list">
                <ListSubheader className={classes.sticky}>Exercise Library</ListSubheader>
                {props.exercises.map((ev) => (
                    <React.Fragment>
                        <ListItem>
                            <ListItemIcon>
                                <PlayArrow
                                    edge="start"
                                    checked={checked.indexOf(ev.exercise_id) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    onClick={(event) => handleVideoClick(event, ev.exercise_id)}
                                    inputProps={{'aria-labelledby': `checkbox-list-label-${ev.exercise_id}`}}
                                />
                            </ListItemIcon>
                            <ListItemSecondaryAction>
                                <Checkbox
                                    edge="end"
                                    tabIndex={-1}
                                    disableRipple
                                    onChange={handleCheckToggle(ev.exercise_id)}
                                    checked={checked.indexOf(ev.exercise_id) !== -1}
                                    inputProps={{"aria-labelledby": `checkbox-list-label-${ev.exercise_id}`}}
                                />
                            </ListItemSecondaryAction>
                            <img className={classes.thumbnail} src={ev.thumbnail}/>
                        <Divider/>
                        </ListItem>
                    </React.Fragment>
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
                    <div className={classes.paper}>
                        <ReactPlayer
                            controls={true}
                            url={URL}
                        />
                    </div>
                </Fade>
            </Modal>

        </div>
    )
}

export default connect((state) => ({
        // The state of exercise, as defined by RootReducer
        exercises: state.exercises.exercises,

    }), (dispatch) => ({
        // The action from actions-pt which will effect reducer-pt
        fetchExerciseVideos: () => dispatch(fetchExerciseVideos())
        
    })
)(Library);