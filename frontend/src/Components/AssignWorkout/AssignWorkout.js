import React from 'react'
import List from "@material-ui/core/List";
import {Divider, ListItem, ListItemText, ListSubheader} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {connect} from "react-redux";
import {fetchPTsPatients} from "../../Redux/actions/actions-pt";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Modal from "@material-ui/core/Modal";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Button from "@material-ui/core/Button";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        //   border: '2px solid #000',a
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        outline: 'none',
    },
    sticky: {
        backgroundColor: 'white'
    }
}));

const AssignWorkout = (props) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [checked, setChecked] = React.useState([]);

    React.useEffect(() => {
        props.fetchPTsPatients(props.pt.pt_id)
    }, []);

    const handleCheckToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);

    };
    console.log(checked)

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const assignToPatients = () => {
        const params = new URLSearchParams();
        params.append("pt", props.pt.pt_id);

        for (let i = 0; i < checked.length; i++) {
            params.append("patient", checked[i])
        }
        for (let j = 0; j < props.selectedWorkouts.length; j++) {
            params.append("workout", props.selectedWorkouts[j]);
        }

        axios.post('api/pt/assign', params)
            .then((response) => {
                if (response.data == 200) {
                    console.log("Message success")
                    window.alert("Assignments complete")
                    window.location.reload()
                }
            })
            .catch(console.log);
    }

    return (
        <div>
            <List component="nav" aria-label="workout-list"
                  style={{maxHeight: 300, overflowY: "scroll", backgroundColor: "white"}}
                  subheader={
                      <ListSubheader component="div" color="inherit" className={classes.sticky}>
                          Patient List
                      </ListSubheader>
                  }>
                {props.patients.map((p,k) => (
                    <div key={k}>
                    <ListItem>
                        <ListItemText primary={`${p.f_name} ${p.l_name}`} />
                        <ListItemSecondaryAction>
                            <Checkbox
                                edge="end"
                                tabIndex={-1}
                                disableRipple
                                onChange={handleCheckToggle(p.patient_id)}
                                checked={checked.indexOf(p.patient_id) !== -1}
                                inputProps={{"aria-labelledby": `checkbox-list-label-${p.patient_id}`}}
                            />
                        </ListItemSecondaryAction>
                    </ListItem>
                    </div>
                ))}

            </List>
            <Button onClick={assignToPatients}>ASSIGN</Button>
        </div>
    )
}

export default connect((state) => ({
        // The state of the pt, as defined by reducer-pt
        pt: state.pt,
        // The state of the pt's patients, defined by reducer-pt
        patients: state.pt.patients,
        selectedWorkouts: state.exercises.selectedWorkouts
    }), (dispatch) => ({
        // The action from actions-pt which will effect reducer-pt
        fetchPTsPatients: (pt_id) => dispatch(fetchPTsPatients(pt_id)),

    })
)(AssignWorkout)