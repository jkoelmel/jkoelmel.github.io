import { combineReducers } from "redux";
import PatientsReducer from "./reducer-patients";
import PTReducer from "./reducer-pt";

const rootReducer = combineReducers({
  patients: PatientsReducer,
  pt: PTReducer,
});

export default rootReducer;
