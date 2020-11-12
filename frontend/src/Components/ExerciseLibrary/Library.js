import React from 'react'
import axios from "axios";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import List from "@material-ui/core/List";
import { Divider, ListItem, ListItemText, ListSubheader } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography"
import ReactPlayer from "react-player";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
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
        color: 'inherit',
        fontSize: 18
        
    },
    thumbnail: {
        maxHeight: '200px',
    }
}));

const Library = () => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [exerciseVideos, setExerciseVideos] = React.useState([]);
    const [selectedVideo, setSelectedVideo] = React.useState([]);
    const [URL, setURL] = React.useState("");
    const [videoID, setVideoID] = React.useState('');
    const [checked, setChecked] = React.useState([]); //exercise workout array. stores exercise_id

    const fetchExerciseVideos = () => {
        //TODO change back after testing
        axios.get('api/exercise/all')
            .then((response) => {

                setExerciseVideos(response.data.map((ev) => {
                    // console.log(response.data)
                    return ev;
                }))
            }).catch(console.log)
    }

    const handleVideoClick = (e, exercise_id) => {
        setSelectedVideo(exercise_id);
        exerciseVideos.map((ev) => {
            if (ev.exercise_id == exercise_id) {
                setURL(ev.exercise_url);
            }
        })
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

    React.useEffect(() => {
        fetchExerciseVideos();
    }, []);

    return (
        //TODO add search field and update query to return tags

        <div className={classes.root}>
            <List component="nav" aria-label="video-list">
                <ListSubheader className={classes.sticky}>Exercise Library</ListSubheader>
                {exerciseVideos.map((ev) => (
                    <React.Fragment>
                        <Divider />
                        <ListItem key={ev.exercise_id} role={undefined} dense button
                                  selected={selectedVideo == ev.exercise_id}>
                            <ListItemIcon>
                                <PlayArrow
                                    edge="start"
                                    checked={checked.indexOf(ev.exercise_id) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    onClick={(event) => handleVideoClick(event, ev.exercise_id)}
                                    inputProps={{ 'aria-labelledby': `checkbox-list-label-${ev.exercise_id}` }}
                                />
                            </ListItemIcon>
                            <ListItemSecondaryAction>
                                <Checkbox
                                    edge="end"
                                    tabIndex={-1}
                                    disableRipple
                                    onChange={handleCheckToggle(ev.exercise_id)}
                                    checked={checked.indexOf(ev.exercise_id) !== -1}
                                    inputProps={{ "aria-labelledby": `checkbox-list-label-${ev.exercise_id}` }}
                                />
                            </ListItemSecondaryAction>

                            <img className={classes.thumbnail} src={"https://img.youtube.com/vi/" + ev.exercise_url.split("=")[1] + "/0.jpg"} />
                        </ListItem>
                        <Divider />
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

export default Library