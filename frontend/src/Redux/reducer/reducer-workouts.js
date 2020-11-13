import { handleActions } from 'redux-actions';
import * as constants from '../constants/constants-workouts'
const initialWorkoutState = {
    description:'',
    exercise_id: null,
    exercise_url: '',
    tags: '',
    title: '',
    thumbnail: '',
    exercises: [{}],
    selectedVideos: [],
    savedWorkouts: [],
    
};

const WorkoutReducer = handleActions({
[constants.GET_EXERCISE_VIDEOS] : (state, action) => {
 
    return {
        ...state,
        exercises: action.payload
    }
},
[constants.GET_SELECTED_VIDEOS] : (state,action) => {

    return {
        ...state,
        selectedVideos: action.payload
    }
},
[constants.GET_SELECTED_WORKOUTS] : (state,action) => {

    return {
        ...state,
        savedWorkouts: action.payload
    }
}

},initialWorkoutState)

export default WorkoutReducer