import { createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import rootReducer from "../reducer/rootReducer";

// redux-thunk middleware is required for actions to work as async
const middleware = applyMiddleware(
    thunk,
);

//Where all the data (or states) is gonna be stored
const store = createStore(rootReducer, middleware);

export default store;
