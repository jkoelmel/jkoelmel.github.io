<<<<<<< HEAD
import { createStore,applyMiddleware } from "redux";
=======
import { createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
>>>>>>> fdeb29855e109ec8163d4b9035d6c5ef2fa9837f
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
<<<<<<< HEAD
const store = createStore(rootReducer,initalState, composeWithDevTools(applyMiddleware(...middleware)));
=======
const store = createStore(rootReducer, middleware);
>>>>>>> fdeb29855e109ec8163d4b9035d6c5ef2fa9837f

export default store;
