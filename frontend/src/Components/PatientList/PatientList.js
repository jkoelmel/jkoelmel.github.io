import React from 'react'
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListSubheader from '@material-ui/core/ListSubheader';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { makeStyles } from '@material-ui/core/styles';

import axios from "axios"

import './PatientList.css'
import { ListItem, ListItemText } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));  

    const PatientList = () => {
        const classes = useStyles();
        const [patients,setPatients] = React.useState([]);
        const [selectedPatient, setSelectedPatient] = React.useState('');
        const [open, setOpen] = React.useState(false);
        const [firstname, setFirstName] = React.useState('');

        
        //TODO save pt id 
       
        
        const fetchPatients = () => {
            axios.get('api/pt/patients',{
                params: {
                    pt_id: 1
                }
            })
                .then( (response) => {
                    console.log(response);
                    console.log(response.data[0].f_name);
                    
                    setPatients(response.data.map((p) => {
                        return p
                    }))
                })
                .catch(console.log)
            
        }
        console.log(patients.map((patient) => {
            return patient
        }))
        
        const handlePatientClick = (e,patientId) => {
            setSelectedPatient(patientId);
            setOpen(true)
            //TODO return patients info by its ID. 
        }
          
        const handleClose = () => {
            setOpen(false);
          };
        
        console.log(selectedPatient);

        React.useEffect(() => {
            //will load patients when the page loads
            fetchPatients();
        }, []);


    return (
        <div className = 'patientlist-root'>
               <List component = "nav" aria-label="patient-list"
            style={{maxHeight: 200, overflow: 'scroll'} }
            subheader={
                <ListSubheader component="div" color="inherit" classes= {"patient-list"}>
                Patient List
              </ListSubheader>   
            }> 
                { patients.map((p) => (
                    <ListItem 
                        key = {p.patient_id}
                        button
                        selected= {selectedPatient == p.patient_id}
                        onClick={(event) => handlePatientClick(event, p.patient_id)}>
                        <ListItemText primary = {`${p.f_name} ${p.l_name}`}/> 
                    </ListItem>
                ))}

                </List>

                <List component = "nav" aria-label="patient-list"
                    style={{maxHeight: 200, overflow: 'scroll'}}
                    subheader={
                <ListSubheader component="div" color="inherit" id="potential-patient-list">
                Potential Patient List
              </ListSubheader>
            }>
                 {/* { patients.map((p) => (
                    <ListItem 
                        key = {p.patient_id}
                        button
                        selected= {selectedPatient == p.patient_id}
                        onClick={(event) => handlePatientClick(event, p.patient_id)}>
                        <ListItemText primary = {`${p.f_name} ${p.l_name}`}/> 
                    </ListItem>
                ))} */}
            </List>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
           <List>
               <ListItem>
                    <ListItemText primary = {`Full Name:${firstname}`}/> 
               </ListItem>
               <Divider/>
               <ListItem>
                    <ListItemText primary = {`Company Name: name here`}/> 
               </ListItem>
               <Divider/>
               <ListItem>
                    <ListItemText primary = {`Company Name: name here`}/> 
               </ListItem>
               <Divider/>
           </List>
          </div>
        </Fade>
      </Modal>

        </div>
    )
}
export default PatientList

{/* <List component = "nav" aria-label="patient-list"
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
</List> */}
