import * as constants from '../constants/constants-pt'
import {getAuth, postAuth} from './actions-auth'

export const createNewPT = (pt) => {
    const data = {email: pt.email, f_name: pt.f_name, l_name: pt.l_name, company: pt.compact}
    return (dispatch) => {
        postAuth('/api/pt/register', data)
            .then(dispatch(createPT(pt)))
            .catch(err => console.log('Error creating pt:', err))
    }
}

export const createPT = (pt) => {
    return {
        type: constants.CREATE_PT,
        payload: pt
    }
}

export const fetchPTs = () => {
    return (dispatch) => {
        getAuth('/api/pt/all')
            .then((response) => dispatch(loadPTs(response.data)))
            .catch(err => console.log('Error fetching all patients:', err))
    }
}

export const loadPTs = (pts) => {
    return {
        type: constants.GET_ALL_PTS,
        payload: pts
    }
}

export const fetchPTsPatients = (pt) => {
    return (dispatch) => {
        getAuth('/api/pt/patients', {pt_id: pt})
            .then((response) => dispatch(loadPTsPatients(response.data)))
            .catch(err => console.log(`Error fetching patients for PT ${pt}`, err))
    }
}

export const loadPTsPatients = (patients) => {
    return {
        type: constants.GET_PT_PATIENTS,
        payload: patients
    }
}