import * as constants from "../constants/constants-patient";
import { getAuth, postAuth, putAuth } from "./actions-auth";

export const createNewPatient = (patient) => {
  const data = {
    email: patient.email,
    f_name: patient.f_name,
    l_name: patient.l_name,
    company: patient.compact,
  };
  return (dispatch) => {
    postAuth("/api/patient/register", data)
      .then(dispatch(createPatient(patient)))
      .catch((err) => console.log("Error creating patient:", err));
  };
};

export const createPatient = (patient) => {
  return {
    type: constants.CREATE_PATIENT,
    payload: patient,
  };
};

export const fetchPatients = () => {
  return (dispatch) => {
    getAuth("/api/patient/all")
      .then((response) => dispatch(loadPatients(response.data.patients)))
      .catch((err) => console.log("Error fetching all patients:", err));
  };
};

export const loadPatients = (patients) => {
  return {
    type: constants.GET_PATIENTS,
    payload: patients,
  };
};

export const updatePatientPT = (patient, pt, prospective_pt) => {
  const data = { patient_id: patient, pt: pt, prospective_pt: prospective_pt };
  return (dispatch) => {
    putAuth("api/patient/update-pt", data)
      .then(dispatch(submitUpdatePatientPT(patient, pt, prospective_pt)))
      .catch((err) =>
        console.log(
          `Error updating patient PT's to ${pt} and/or ${prospective_pt}:`,
          err
        )
      );
  };
};

export const submitUpdatePatientPT = (patient, pt, prospective_pt) => {
  return {
    type: constants.UPDATE_PATIENT_PTS,
    payload: {
      patient: patient,
      pt: pt,
      prospective_pt: prospective_pt,
    },
  };
};
