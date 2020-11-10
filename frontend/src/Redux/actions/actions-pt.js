import * as constants from '../constants/constants-pt'
import {getAuth, postAuth} from './actions-auth'

export const createNewPT = (pt) => {
    const params = new URLSearchParams()
    params.append("email", pt.email)
    params.append("f_name", pt.f_name)
    params.append("l_name", pt.l_name)
    params.append("password", pt.password)
    params.append("company", pt.company)

    return (dispatch) => {
        postAuth('/api/pt/register', params)
            .then(() => {
                dispatch(createPT(pt))
                dispatch(getPTByEmail(pt.email))
            })
            .then(dispatch(getPTByEmail(pt.email)))
            .catch(err => console.log('Error creating pt:', err))
    }
}
//TODO fix postauth
export const loginPT = (pt) => {
    const params = new URLSearchParams()
    params.append("email", pt.email)
    params.append("password", pt.password)

    return (dispatch) => {
        postAuth('/api/pt/login',params)
        .then(() => { 
            dispatch(getPTByEmail(pt.email))

        })
        .then(dispatch(getPTByEmail(pt.email)))
        .catch(err => console.log('error grabbing data from: ', err))
    }

}

export const createPT = (pt) => {
    return {
        type: constants.CREATE_PT,
        payload: pt
    }
}

export const getPTByEmail = (email) => {
    return (dispatch) => {
        getAuth('api/pt/email', {email: email})
            .then((response) => {
                dispatch(updatePT(response.data))
                dispatch(fetchPTsPatients(response.data.pt_id))
            })
            .catch(err => console.log(`Error fetching PT with email ${email}:`, err))
    }
}

export const updatePT = (pt) => {
    return {
        type: constants.UPDATE_PT,
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