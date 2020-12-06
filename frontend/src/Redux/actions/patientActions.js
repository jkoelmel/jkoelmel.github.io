import {GET_PATIENTS, PATIENTS_ERROR} from '../types/types';
import axios from 'axios';

// TODO: This already exists in actions-pt as fetchPTsPatients, do we need this file?
export const getPatients = () => async (dispatch) => {
  try {
    const res = await axios.get('api/pt/patients', {
      params: {
        pt_id: 1,
      },
    });
    dispatch({
      type: GET_PATIENTS,
      payload: res.data,
    });
  } catch (e) {
    dispatch({
      type: PATIENTS_ERROR,
      payload: console.log(e),
    });
  }
};
