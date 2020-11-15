import { createStore, applyMiddleware } from "redux";
import rootReducer from "../reducer/rootReducer";
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'

const initalState = {};

// redux-thunk middleware is required for actions to work as async
const middleware =[
    thunk]

//Where all the data (or states) is gonna be stored
const store = createStore(rootReducer, initalState,composeWithDevTools(applyMiddleware(...middleware)));
export default store;
