import { createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import rootReducer from "../reducer/rootReducer";
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'

const initalState = {

}
const middleware = [thunk]

// redux-thunk middleware is required for actions to work as async
const middleware = applyMiddleware(
    thunk,
);

//Where all the data (or states) is gonna be stored
const store = createStore(rootReducer, middleware);

export default store;
