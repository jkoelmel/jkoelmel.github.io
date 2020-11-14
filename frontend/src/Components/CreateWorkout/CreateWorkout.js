import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from "@material-ui/core/List";
import { Divider, ListItem, ListItemText,Button } from "@material-ui/core";
import { fetchExerciseVideos, selectedExercises } from '../../Redux/actions/actions-pt';
import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/Comment';
import Paper from '@material-ui/core/Paper';

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

    const handleDescriptionToggle = (id) => {
        console.log(id)
        setOpenDescription(!openDescription)

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
                                id={`description-${props.exercises[k].exercise_id}`}
                               placeholder="exercise Description"
                               label="Description"
                                multiline
                                variant="outlined"
                                color="secondary"
                                rows={4} />

                                <Divider />
                                </ListItem>
                                <Divider />
                            </React.Fragment>
                        ))}
                    </List>
                    <Button
                    variant="outlined">Submit</Button>
                </Grid>
            </Grid>
        </div>
    )
}

export default connect((state) => ({
    // The state of exercise, as defined by RootReducer
    exercises: state.exercises.exercises,
    selectedVideos: state.exercises.selectedVideos

}), (dispatch) => ({
    // The action from actions-pt which will effect reducer-pt
    fetchExerciseVideos: () => dispatch(fetchExerciseVideos()),
    selectedExercises: (selectedVideos) => dispatch(selectedExercises(selectedVideos))
})
)(CreateWorkout);