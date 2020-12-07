import {handleActions} from 'redux-actions';
import * as constants from '../constants/constants-workouts';

const initialWorkoutState = {
  description: '',
  exercise_id: null,
  exercise_url: '',
  tags: '',
  title: '',
  thumbnail: '',
  exercises: [{}],
  selectedVideos: [],
  selectedWorkouts: [],
  patientExerciseVideos: [],
};

const WorkoutReducer = handleActions(
  {
    [constants.GET_EXERCISE_VIDEOS]: (state, action) => ({
        ...state,
        exercises: action.payload,
      }),
    [constants.GET_SELECTED_VIDEOS]: (state, action) => ({
        ...state,
        selectedVideos: action.payload,
      }),
    [constants.GET_SELECTED_WORKOUTS]: (state, action) => ({
        ...state,
        selectedWorkouts: action.payload,
      }),
    [constants.GET_PATIENT_EXERCISE_VIDEOS]: (state, action) => ({
        ...state,
        patientExerciseVideos: action.payload,
      }),
    // [constants.CREATE_NEW_WORKOUT] : (state,action) => {
    //     return {
    //         ...state,
    //         newWorkout: action.payload
    //     }
    // }
  },
  initialWorkoutState,
);

export default WorkoutReducer;
