import { createStore } from "redux";
import rootReducer from "../reducer/rootReducer";

//Where all the data (or states) is gonna be stored
const store = createStore(rootReducer);

export default store;
