import * as constants from '../constants/constants-pt'
import * as constantsWorkout from '../constants/constants-workouts'
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
            }).catch(err => console.log('Error creating pt:', err))
    }
}
//TODO SEND MESSAGE IF ERROR
export const loginPTError = (err) => {
    return {
        type: constants.CHECK_LOGIN_ERROR,
        payload: err
    }
}

export const loginPT = (pt) => {
    const params = new URLSearchParams()
    params.append("email", pt.email)
    params.append("password", pt.password)
    console.log("params: ", params)

    return (dispatch) => {
        postAuth('/api/pt/login', params).then((res) => {
            console.log("login status: ", res.data)
            if (res.data == 200) {
                dispatch(getPTByEmail(pt.email))
            } else {
                console.log(res.data.payload.message)
                // dispatch(loginPTError(res.data))
            }
        }).catch((err) => {
            dispatch(loginPTError('username or password is invalid.'))
            console.log(err)
        })
    }

}

export const createWorkout = (pt, title, exercises, descriptions)=> {

    const params = new URLSearchParams()
    params.append("pt", pt.pt_id)
    params.append("title", title)

    for(let i = 0; i < exercises.length; i++) {
        params.append("exercise_id", exercises[i]);
        params.append("description", descriptions[i]);
    }
    return () => {
        postAuth('/api/pt/create', params).then((res) => {
            if (res.data == 200) {
                console.log(res.data)
            }
        }).catch((err) => {
            console.log(err)
        })
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

export const fetchExerciseVideos = () => {
    console.log('im here')
    return (dispatch) => {
        getAuth('/api/exercise/all')
            .then((response) => dispatch(loadExerciseVideos(response.data)))
            .catch(err => console.log(err))
    }
}

export const loadExerciseVideos = (exercises) => {
    return {
        type: constantsWorkout.GET_EXERCISE_VIDEOS,
        payload: exercises
    }

}
export const selectedExercises = (selectedVideos) => {
    return {
        type: constantsWorkout.GET_SELECTED_VIDEOS,
        payload: selectedVideos
    }
}

export const setSelectedWorkouts = (selectedWorkouts) => {
    return {
        type: constantsWorkout.GET_SELECTED_WORKOUTS,
        payload: selectedWorkouts
    }
}


export const setSelectedPatient = (patient) => {
    return {
        type: constants.SET_SELECTED_PATIENT,
        payload: patient
    }
}

