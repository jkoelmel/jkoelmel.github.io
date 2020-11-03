import React, {useState} from 'react'
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import { ListItem, ListItemText, ListSubheader } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Divider } from '@material-ui/core';
import Button from '@material-ui/core/Button'
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { makeStyles } from '@material-ui/core/styles';
import DatePicker from "react-date-picker";

//Currently Unused imports
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import NumberFormat from 'react-number-format';



import './SearchPlan.css';
import axios from 'axios'
import userEvent from "@testing-library/user-event";

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
    sticky: {
        backgroundColor: 'white'
    },
}));  


const SearchPlan = ({patients,setPatients,selectedPatient,setSelectedPatient}) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [exercisePlan,setExercisePlan] = React.useState([]);
    const [workoutbyDate,setWorkoutByDate] = React.useState([]);
    const [start,setStart] = React.useState('')
    const [end,setEnd] = React.useState('')
    const [startYear,setStartYear] = React.useState('')
    const [startMonth,setStartMonth] = React.useState('')
    const [startDay,setStartDay] = React.useState('')
    const [endYear,setEndYear] = React.useState('')
    const [endMonth,setEndMonth] = React.useState('')
    const [endDay,setEndDay] = React.useState('')
    const [readySearch,setReadySearch] = React.useState(false)

    const [values, setValues] = React.useState({textmask: '    -   -   '});


    const fetchWorkouts = () => {
      axios.get( 'api/assign/all',{
          params: {
              patient: selectedPatient,
              start: start,
              end: end
              
          }
      })
          .then( (response) => {
              console.log(response.data);
              setExercisePlan(response.data.map((e) => {
                return e
            }))
              
          })
          .catch(console.log)
        
  }
  const handleClose = () => {
    setOpen(false);
  }

  const handleSearch = () => {
    setStart(startDate.toISOString().split('T')[0]);
    setEnd(endDate.toISOString().split('T')[0]);

  }
  console.log(start)
  console.log(end)
  console.log(startYear)
  console.log(`values: ${values}`)

        console.log(exercisePlan.map((exercisePlan) => {
            return exercisePlan
        }))

    const ExercisePlan = [
        {title: 'Leg Exercise'},
        {title: 'Back Exercise'},
        {title: 'Acl Rehabilitation'}
    ];
    const handleReadySearch = () => {
      setReadySearch(true)
      setOpen(true)
      handleSearch()
    }
    console.log(readySearch)

    const handleChange = (event) => {
      setValues({
        ...values,
        [event.target.name]: event.target.value,
      });
    };

React.useEffect(() => {
          if(readySearch)
              fetchWorkouts()
              
          
        }, [selectedPatient,readySearch]);

    const [startDate, onChange1] = useState(new Date());
    const [endDate,onChange2] = useState(new Date());
    return (
        <div>
          <div style={{ width: "auto" }}>
              <p>Search Workout Assignments</p>
          {/* <FormControl>
            <InputLabel htmlFor="formatted-text-mask-input">Start Date</InputLabel>
            <Input
              value={values.textmask}
              onChange={handleChange}
              name="textmask"
              id="formatted-text-mask-input"

            />
      </FormControl>
      <TextField
        label="YYYY-MM-DD"
        value={values.numberformat}
        onChange={handleChange}
        name="numberformat"
        id="formatted-numberformat-input"
        InputProps={{
        }}
      /> */}
        {/*    <TextField*/}
        {/*    label="Start Year"*/}
        {/*    id="outlined-margin-none"*/}
        {/*    // defaultValue="Default Value"*/}
        {/*    helperText="YYYY"*/}
        {/*    variant="outlined"*/}
        {/*    onChange={(e)=>{setStartYear(e.target.value)}}*/}
        {/*/>*/}
        {/* <TextField*/}
        {/*    label="Start Month"*/}
        {/*    id="outlined-margin-none"*/}
        {/*    // defaultValue="Default Value"*/}
        {/*    helperText="MM"*/}
        {/*    variant="outlined"*/}
        {/*    onChange={(e)=>{setStartMonth(e.target.value)}}*/}
        {/*/>*/}
        {/*<TextField*/}
        {/*  label="Start Day"*/}
        {/*  id="outlined-margin-none"*/}
        {/*  // defaultValue="Default Value"*/}
        {/*  helperText="DD"*/}
        {/*  variant="outlined"*/}
        {/*  onChange={(e)=>{setStartDay(e.target.value)}}*/}
        {/*/>*/}
        {/*  <TextField*/}
        {/*    label="End Year"*/}
        {/*    id="outlined-margin-none"*/}
        {/*    // defaultValue="Default Value"*/}
        {/*    helperText="YYYY"*/}
        {/*    variant="outlined"*/}
        {/*    onChange={(e)=>{setEndYear(e.target.value)}}*/}
        {/*/>*/}

        {/* <TextField*/}
        {/*    label="End Month"*/}
        {/*    id="outlined-margin-none"*/}
        {/*    // defaultValue="Default Value"*/}
        {/*    helperText="MM"*/}
        {/*    variant="outlined"*/}
        {/*    onChange={(e)=>{setEndMonth(e.target.value)}}*/}
        {/*/>*/}
        {/*<TextField*/}
        {/*  label="End Day"*/}
        {/*  id="outlined-margin-none"*/}
        {/*  // defaultValue="Default Value"*/}
        {/*  helperText="DD"*/}
        {/*  variant="outlined"*/}
        {/*  onChange={(e)=>{setEndDay(e.target.value)}}*/}
        {/*/>*/}
        <p>Start Date: &nbsp;
        <DatePicker
            onChange={onChange1}
            value={startDate}
            name={"Start Date"}
            format={"yyyy-MM-dd"}
            showLeadingZeros={true}
        />
        </p><br/>
        <p>End Date: &nbsp;&nbsp;
        <DatePicker
            onChange={onChange2}
            value={endDate}
            name={"End Date"}
            format={"yyyy-MM-dd"}
            minDate={startDate}
            showLeadingZeros={true}
        />
        </p><br/>
        <div class="search">
        <Button onClick= {handleReadySearch} color="secondary">Search</Button>
        </div>
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
           <List style={{maxHeight: 500, overflow: 'scroll'} }
                 subheader={ <ListSubheader component="div" color="inherit" classes ={{sticky: classes.sticky}}>
                     {`${start} to ${end}`}</ListSubheader>
                 }>


             <Divider/>
             {exercisePlan.map((e) => (
               <div>
                   <ListItem>
                       <ListItemText primary = {`Assigned On`} secondary = {`${e.start_time}`}/>

                   </ListItem>
               <ListItem>
                    <ListItemText primary = {`Title`} secondary = {`${e.title}`}/>
                       
               </ListItem>
               <ListItem>
                    <ListItemText primary = {`URL`} secondary = {`${e.exercise_url}`}/>
                    
               </ListItem>
               <ListItem>
                    <ListItemText primary = {`description`} secondary = {`${e.description}`}/>   
               </ListItem>
               <Divider/>

               </div>
               ))}
           </List>
          </div>
        </Fade>
      </Modal>
        </div>
    )
}
 

export default SearchPlan