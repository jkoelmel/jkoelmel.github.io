import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import axios from "axios"

const PatientListRedux = props => {

    return (
        <div>
            <h3>Patients List</h3>
            <l1>{props.patients[0].f_name}</l1>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        patients: state.patients
    }
}

export default connect(mapStateToProps)(PatientListRedux)
