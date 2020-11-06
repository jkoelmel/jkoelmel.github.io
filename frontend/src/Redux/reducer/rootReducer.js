import {combinedReducers, combineReducers} from 'redux'
import reducerPatients from './reducer-patients'

const rootReducer = combineReducers({
    patients: reducerPatients
})

export default rootReducer
     