import React from "react";
import axios from "axios";
import { useEffect } from "react";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import List from "@material-ui/core/List";
import {
  Divider,
  ListItem,
  ListItemText,
  ListSubheader,
} from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ReactPlayer from "react-player";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import {
  fetchExerciseVideos,
  selectedExercises,
  filterExercises,
} from "../../Redux/actions/actions-pt";
import { connect } from "react-redux";
import { PlayArrow, TextFieldsRounded } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    outline: "none",
  },
  sticky: {
    backgroundColor: "white",
  },
  thumbnail: {
    maxHeight: "200px",
  },
  title: {
    //need to set up for dynamic scaling
    marginLeft: 125,
  },
}));

const Library = (props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [selectedVideo, setSelectedVideo] = React.useState([]);
  const [URL, setURL] = React.useState("");

  useEffect(() => {
    // fetchExerciseVideos();
    props.fetchExerciseVideos();
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
  };

  const handleClose = () => {
    setOpen(false);
  };

  //Handles checked videos and adds video ids into Checked
  const handleCheckToggle = (value) => () => {
    const currentIndex = props.selectedVideos.indexOf(value);
    const newChecked = [...props.selectedVideos];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    // setChecked(newChecked);
    props.selectedExercises(newChecked);
  };

  return (
    //TODO add search field and update query to return tags

    <div className={classes.root}>
      <List component="nav" aria-label="video-list">
        <ListSubheader color="inherit" className={classes.sticky}>
          Exercise Library
        </ListSubheader>

        {props.exercises.map((ev, k) => (
          <React.Fragment key={k}>
            <Divider />
            <ListItem className={classes.title}>{ev.title}</ListItem>
            <ListItem>
              <ListItemIcon>
                <PlayArrow
                  edge="start"
                  checked={props.selectedVideos.indexOf(ev.exercise_id) !== -1}
                  tabIndex={-1}
                  onClick={(event) => handleVideoClick(event, ev.exercise_id)}
                  inputprops={{
                    "aria-labelledby": `checkbox-list-label-${ev.exercise_id}`,
                  }}
                />
              </ListItemIcon>

              <ListItemSecondaryAction>
                <Checkbox
                  edge="end"
                  tabIndex={-1}
                  disableRipple
                  onChange={handleCheckToggle(ev.exercise_id)}
                  checked={props.selectedVideos.indexOf(ev.exercise_id) !== -1}
                  inputProps={{
                    "aria-labelledby": `checkbox-list-label-${ev.exercise_id}`,
                  }}
                />
              </ListItemSecondaryAction>
              <img className={classes.thumbnail} src={ev.thumbnail} />
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
            <ReactPlayer controls={true} url={URL} />
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default connect(
  (state) => ({
    // The state of exercise, as defined by RootReducer
    exercises: state.exercises.exercises,
    selectedVideos: state.exercises.selectedVideos,
  }),
  (dispatch) => ({
    // The action from actions-pt which will effect reducer-pt
    fetchExerciseVideos: () => dispatch(fetchExerciseVideos()),
    selectedExercises: (selectedVideos) =>
      dispatch(selectedExercises(selectedVideos)),
    filterExercises: (exercises, searchTerm) => dispatch(exercises, searchTerm),
  })
)(Library);
