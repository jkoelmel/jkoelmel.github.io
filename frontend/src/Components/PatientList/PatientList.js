import React from 'react'
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListSubheader from '@material-ui/core/ListSubheader';

import './PatientList.css'
import { ListItem, ListItemText } from '@material-ui/core';

    const PatientList = () => {
        const [patientName,setPatientName] = React.useState('');
        const [selectedPatient, setSelectedPatient] = React.useState(1);

        const handlePatientClick = (e,index) => {
            setSelectedPatient(index);
            console.log(selectedPatient);
        }

        const fetchPatients = () => {
            //axios GET 
        }

        React.useEffect(() => {
            //will load patients when the page loads
            //fetchPatients();
        }, []);


    return (
        <div className = 'patientlist-root'>
               <List component = "nav" aria-label="patient-list"
            style={{maxHeight: 200, overflow: 'scroll'} }
            subheader={
                <ListSubheader component="div" color="inherit" className="patient-list">
                Patient List
              </ListSubheader>
              
            }>
                <ListItem 
                button
                selected= {selectedPatient == 0}
                onClick={(event) => handlePatientClick(event, 0)}>
                    <ListItemText primary = "John Smith"/> 
                </ListItem>
                <ListItem button>
                    <ListItemText primary = "Steph Curry"/> 
                </ListItem>
                <ListItem button>
                    <ListItemText primary = "Michael Jordan"/> 
                </ListItem>
                </List>

                <List component = "nav" aria-label="patient-list"
                    style={{maxHeight: 200, overflow: 'scroll'}}
                    subheader={
                <ListSubheader component="div" color="inherit" id="potential-patient-list">
                Potential Patient List
              </ListSubheader>
            }>
                <ListItem button>
                    <ListItemText primary = "Bruce Lee"/> 
                </ListItem>
                <ListItem button>
                    <ListItemText primary = "Peter Hu"/> 
                </ListItem>
                <ListItem button>
                    <ListItemText primary = "Bob theBuilder"/> 
                </ListItem>
            </List>
        </div>
    )
}
export default PatientList
