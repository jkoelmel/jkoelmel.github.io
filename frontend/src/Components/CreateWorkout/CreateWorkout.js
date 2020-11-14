import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from "@material-ui/core/List";
import { Divider, ListItem, ListItemText,Button } from "@material-ui/core";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import { fetchExerciseVideos, selectedExercises } from '../../Redux/actions/actions-pt';
import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/Comment';
import Paper from '@material-ui/core/Paper';
import SendIcon from '@material-ui/icons/Send';
// import {createWorkout} from '../../Redux/actions/actions-pt';

import { connect } from 'react-redux';

import TextField from '@material-ui/core/TextField';
import { Create } from '@material-ui/icons';
const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
        //   margin: theme.spacing(1),
          width: '25ch',
        },
    }
}));

const CreateWorkout = (props) => {
    const classes = useStyles();
    const [openDescription, setOpenDescription] = React.useState(false)
    const [descriptionTitleID, setDescriptionTitleID] = React.useState('') //used for description title textbox
    const [description, setDescription] = React.useState('')
    const [videoDescriptions, setVideoDescriptions] = React.useState([])
    const [workoutTitle,setWorkoutTitle] = React.useState('')
    const handleDescriptionToggle = (id) => {
        console.log(id)
        setOpenDescription(!openDescription)

    }
    // console.log(videoDescription[0])
    const submitDescription = (e,vd,i) => {
        // const currentIndex = videoDescription.indexOf(i)
        // const newDescription = [...videoDescriptions]
        // if(currentIndex == -1) {
        //     newDescription.push(vd)
        // }else {
        //     newDescription.splice(currentIndex,1);
        // }
        
        setVideoDescriptions([...videoDescriptions,{description}])
    }

    console.log(videoDescriptions.map((d,i)=> {
        return d
    }))

    const submitWorkout = () => {
        // props.createWorkout(100,workoutTitle,props.selectedVideos,videoDescriptions)
    }

    return (
        <div className={classes.root}>
            <Grid container direction="column" spacing={3}>
                <Grid item >
                   
                        <TextField
                            color="secondary"
                            id="standard-multiline-flexible"
                            label="Workout Title"
                            multiline
                            value={workoutTitle}
                            onChange={(e)=>{setWorkoutTitle(e.target.value)}}
                            variant="outlined"
                            rowsMax={4} />
                    
                </Grid>

                <Grid item>
                    <List >
                        
                        {props.selectedVideos.map((ev, k) => (
                            <React.Fragment key={k}>
                                <Divider />
                                <ListItem>
                                    <ListItemText>
                                        Exercise {props.exercises[k].title}</ListItemText>
                                <TextField
                                    key={`description-${props.exercises[k].exercise_id}`}
                                    placeholder="exercise Description"
                                    label="Description"
                                    variant="outlined"
                                    color="secondary"
                                    // value = {description}
                                    onChange={(e)=> {setDescription(e.target.value)}}
                                    multiline
                                    rows={4} />
                                    <ListItemIcon>
                                <SendIcon
                                    edge="start"
                                    onClick={(event) => submitDescription(event, description,k)}
                                    inputprops={{'aria-labelledby': `checkbox-list-label-${props.exercises[k].exercise_id}`}}
                                />
                            </ListItemIcon>
                                <Divider />
                                </ListItem>
                                <Divider />
                            </React.Fragment>
                        ))}
                    </List>
                    <Button
                    onClick={submitWorkout}
                    variant="outlined">Submit</Button>
                </Grid>
            </Grid>
        </div>
    )
}

export default connect((state) => ({
    pt: state.pt,
    // The state of exercise, as defined by RootReducer
    exercises: state.exercises.exercises,
    selectedVideos: state.exercises.selectedVideos

}), (dispatch) => ({
    // The action from actions-pt which will effect reducer-pt
    fetchExerciseVideos: () => dispatch(fetchExerciseVideos()),
    selectedExercises: (selectedVideos) => dispatch(selectedExercises(selectedVideos)),
    // createWorkout: (ptId,title,selectedVideos,descriptions) => dispatch(createWorkout(ptId,title,selectedVideos,descriptions))
})
)(CreateWorkout);