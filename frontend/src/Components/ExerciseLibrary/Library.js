import React from 'react'
import axios from "axios";
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
import {CheckBox} from "@material-ui/icons";

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
        backgroundColor: 'white'
    }
}));

const Library = () => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [exerciseVideos, setExerciseVideos] = React.useState([]);
    const [selectedVideo, setSelectedVideo] = React.useState([]);
    const [URL, setURL] = React.useState("");
    const [videoID, setVideoID] = React.useState('');

    const fetchExerciseVideos = () => {
        //TODO change back after testing
        axios.get('api/exercise/all')
            .then((response) => {

            setExerciseVideos(response.data.map((ev) => {
                console.log(response.data)
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

    React.useEffect(() => {
        fetchExerciseVideos();
    }, []);

    return (
        //TODO add search field and update query to return tags

        <div className={classes.root}>
            <List component="nav" aria-label="patient-list"
                  style={{maxHeight: 700, overflowY: 'scroll'}}>
                {exerciseVideos.map((ev) => (
                    <div>
                        <ListItem
                            key={ev.exercise_id}
                            button
                            selected={selectedVideo == ev.exercise_id}
                            //TODO Change onClick function to populate array for selectedVideos for workout creation
                            onClick={(event) => handleVideoClick(event, ev.exercise_id)}>
                            <img src={"https://img.youtube.com/vi/" + ev.exercise_url.split("=")[1] + "/0.jpg"}/>
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