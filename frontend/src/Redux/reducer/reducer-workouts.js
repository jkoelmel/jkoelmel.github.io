import { handleActions } from 'redux-actions';
import * as constants from '../constants/constants-workouts'
const initialWorkoutState = {
    description:'',
    exercise_id: null,
    exercise_url: '',
    tags: '',
    title: '',
    exercises: [{}]
};

const WorkoutReducer = handleActions({
[constants.GET_EXERCISE_VIDEOS] : (state, action) => {
    // const exercise = action.payload
    // console.log(exercise)
    return {
        ...state,
        exercises: action.payload
    }
}
},initialWorkoutState)

export default WorkoutReducer