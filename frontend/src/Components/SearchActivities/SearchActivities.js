import React from 'react'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import axios from "axios";
import Button from "@material-ui/core/Button";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import List from "@material-ui/core/List";
import {Divider, ListItem, ListItemText, ListSubheader} from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        //   border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        outline: 'none'
    },
}));

const SearchActivities = ({selectedPatient,setSelectedPatient}) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [activities,setActivities] = React.useState([]);
    const [patient,setPatient] = React.useState([]);
    const [pt, setPt] = React.useState(1);
    const [messaging, setMessaging] = React.useState(0);
    const [feedback, setFeedback] = React.useState(0);
    const [reading, setReading] = React.useState(0);
    const [assigning, setAssigning] = React.useState(0);
    const [readySearch,setReadySearch] = React.useState(false)
    console.log(`patient id: ${selectedPatient}`)

    const fetchPatientActivity = () => {
        axios.get('api/activity/id',{
            params: {
                patient: selectedPatient,
                pt: pt
            }
        }).then((response) => {
            console.log(response);
            console.log(response.data.patient)

            setActivities(response.data.map((pa) => {
                console.log(response.data)
                return pa;
            }))
        })
            .catch(console.log)
    }

   function calculateResults(map) {
        console.log(map[1][2]);
        let size = map.size;
        for(let i = 0; i < size; i++) {
            if(map[i][1] == "messaging") {
                setMessaging(messaging + map[i][2]);
            } else if (map[i][1] == "assessing videos/feedback") {
                setFeedback(feedback + map[i][2]);
            } else if (map[i][1] == "reading profile") {
                setReading(reading + map[i][2]);
            } else {
                setAssigning(assigning + map[i][2]);
            }
        }
   }

    const handleClose = () => {
        setOpen(false);
    }

    const handleReadySearch = () => {
        setReadySearch(true)
        setOpen(true)
    }

    React.useEffect(() => {
        //will load patients activities when the page loads
        if(selectedPatient!='')
            fetchPatientActivity();
    }, [selectedPatient]);


    return (
        <div>
            <div style={{ width: "auto" }}>
                <h3>Report for selected patient: </h3>
                <Button onClick= {handleReadySearch} color="primary">Generate</Button>
            </div>


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
                            <ListSubheader>{`PT activity with current patient`}</ListSubheader>
                            <Divider/>
                                <div>
                                    <ListItem>
                                        <ListItemText primary = {`Messaging`} secondary = {messaging}/>

                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary = {`Reading`} secondary = {reading}/>

                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary = {`Assigning Exercises`} secondary = {assigning}/>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary = {`Assessing Workout/Feedback`} secondary = {feedback}/>
                                    </ListItem>
                                    <Divider/>

                                </div>
                        </List>
                    </div>
                </Fade>
            </Modal>
        </div>


    )
}

export default SearchActivities