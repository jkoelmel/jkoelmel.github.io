import { handleActions } from 'redux-actions';
import * as constants from '../constants/constants-workouts'
const initialWorkoutState = {
    description:'',
    exercise_id: null,
    exercise_url: '',
    tags: '',
    title: '',
    exercises: [{}],
    thumbnail: '',
};

const WorkoutReducer = handleActions({
[constants.GET_EXERCISE_VIDEOS] : (state, action) => {
    // const exercise = action.payload
    // console.log(exercise)
    return {
        ...state,
        exercises: action.payload
    }
},
[constants.GET_SELECTED_VIDEOS] : (state=[],action) => {
    return {
        ...state,
        selectedVideos: action.payload
    }
}



},initialWorkoutState)

export default WorkoutReducer