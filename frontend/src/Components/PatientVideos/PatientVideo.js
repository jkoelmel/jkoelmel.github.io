import React from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import List from '@material-ui/core/List';
import {
  Divider,
  ListItem,
  ListItemText,
  ListSubheader,
} from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ReactPlayer from 'react-player';
import {connect} from 'react-redux';
import {
  fetchPTsPatients,
  setSelectedPatient,
} from '../../Redux/actions/actions-pt';

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
    backgroundColor: 'white',
  },
}));

export const PatientVideos = (props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [videos, setVideos] = React.useState([]);
  const [selectedVideo, setSelectedVideo] = React.useState([]);
  const [URL, setURL] = React.useState('');
  const [feedback, setFeedback] = React.useState('');

  const handleVideoClick = (e, video_url) => {
    setURL(video_url);
    setOpen(true);
  };

  const fetchPatientVideos = () => {
    axios
      .get('api/patient/video/id', {
        params: {
          patient: props.selectedPatient.patient_id,
        },
      })
      .then((response) => {
        setVideos(
          response.data.map((pv) => {
            console.log(response.data);
            return pv;
          }),
        );
      })
      .catch(console.log);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = () => {
    setFeedback(feedback);
  };

  const handleSubmit = () => {
    alert(`Feedback was submitted: ${  feedback}`);
    handleClose();
  };

  React.useEffect(() => {
    // will load patients video when the page loads
    if (props.selectedPatient != '') fetchPatientVideos();
  }, [props.selectedPatient]);

  return (
    <div className={classes.root}>
      <List
        component="nav"
        aria-label="patient-list"
        style={{maxHeight: 600, overflowY: 'scroll'}}
      >
        {videos.map((v) => (
          <div>
            <ListItem class="date">{v.uploaded}</ListItem>
            <ListItem
              key={v.patient_video_id}
              button
              selected={selectedVideo == v.patient_video_id}
              onClick={(event) => handleVideoClick(event, v.video_url)}
            >
              <img
                src={
                  `https://img.youtube.com/vi/${ 
                  v.video_url.split('=')[1] 
                  }/0.jpg`
                }
              />
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
            <ReactPlayer controls={true} url={URL} />
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default connect(
  (state) => ({
    // The state of the pt, as defined by reducer-pt
    selectedPatient: state.pt.selectedPatient,
  }),
  (dispatch) => ({
    // The action from actions-pt which will effect reducer-pt
    setSelectedPatient: (patient) => dispatch(setSelectedPatient(patient)),
  }),
)(PatientVideos);
