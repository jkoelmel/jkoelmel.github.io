import React from 'react'
import axios from "axios";
import Button from "@material-ui/core/Button";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import List from "@material-ui/core/List";
import {Divider, ListItem, ListItemText, ListSubheader} from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography"
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

const SearchVideos = () => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [selectedPatient, setselectedPatient] = React.useState(1);
    const [videos, setVideos] = React.useState([]);
    const [selectedVideo, setSelectedVideo] = React.useState([]);
    const [URL, setURL] = React.useState("");
    const [feedback, setFeedback] = React.useState("");

    const handleVideoClick = (e, patient_video_id) => {
        setSelectedVideo(patient_video_id);
        videos.map((v) => {
            if (v.patient_video_id == patient_video_id) {
                setURL(v.video_url);
            }
        })
        setOpen(true)
    }

    console.log(`patient id: ${selectedPatient}`)

    const fetchPatientVideos = () => {
        axios.get('api/patient/video/id', {
            params: {
                patient: selectedPatient
            }
        }).then((response) => {

            setVideos(response.data.map((pv) => {
                console.log(response.data)
                return pv;
            }))
        })
            .catch(console.log)
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleChange = () => {
        setFeedback(feedback);
    }

    const handleSubmit = () => {
        alert('Feedback was submitted: ' + feedback);
        handleClose();
    }

    React.useEffect(() => {
        //will load patients video when the page loads
        if (selectedPatient != '')
            fetchPatientVideos();
    }, [selectedPatient]);


    return (
        <div className={classes.root}>
            <List component="nav" aria-label="patient-list"
                  style={{maxHeight: 700, overflowY: 'scroll'}}>
                {videos.map((v) => (
                    <div>
                        <ListItem class="date">{v.uploaded}</ListItem>
                        <ListItem
                            key={v.patient_video_id}
                            button
                            selected={selectedVideo == v.patient_video_id}
                            onClick={(event) => handleVideoClick(event, v.patient_video_id)}>
                            <img src={"https://img.youtube.com/vi/" + v.video_url.split("=")[1] + "/0.jpg"}/>
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

export default SearchVideos