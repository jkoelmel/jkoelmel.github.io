import { combineReducers } from "redux";
import PatientsReducer from "./reducer-patients";
import PTReducer from "./reducer-pt";
import WorkoutReducer from "./reducer-workouts";
import MessagingReducer from "./reducer-messaging";

const rootReducer = combineReducers({
  patients: PatientsReducer,
  pt: PTReducer,
  exercises: WorkoutReducer,
  messages: MessagingReducer
});

export default rootReducer;
