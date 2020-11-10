import { Typography } from '@material-ui/core'
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button'
import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import {loginPT} from '../../Redux/actions/actions-pt';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: "white",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 300,
        width: 400
    },
    textfield: {
        // borderColor: theme.palette.secondary.main
    }

}))

const LoginForm = props => {
    const classes = useStyles();
    const [email,setEmail] = React.useState('')
    const [password,setPassword] = React.useState('')
    const [emailError,setEmailError] = React.useState(false)
    const [passwordError,setPasswordError] = React.useState(false)

    const handleSubmit = () => {
       props.loginPT({
           email: email,
           password: password
       })
    };

    return (
        <div>
            <Paper className={classes.root}>
                <Grid container direction="column" spacing={3} alignItems="center">
                    <Grid item >
                        <TextField
                             onChange={(e) => {setEmail(e.target.value)}}
                            className={classes.textfield}
                            error = {emailError}
                            id="outlined-error"
                            label="Email"
                            defaultValue="sample@mail.com"
                            variant="outlined"
                            color= "secondary"
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            onChange={(e) => {setPassword(e.target.value)}}
                            error = {passwordError}
                            id="outlined-error"
                            label="Password"
                            defaultValue="Password"
                            variant="outlined"
                            color= "secondary"
                            type="password"
                        />
                    </Grid>
                    <Grid item>
                        <Button onClick={handleSubmit} color= "secondary">Login</Button>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    )
}

export default connect((state) => ({
    // The state of the pt, as defined by reducer-pt
    pt: state.pt,
    // The state of the pt's patients, defined by reducer-pt
    patients: state.pt.patients
}), (dispatch) => ({
    // The action from actions-pt which will effect reducer-pt
    loginPT: (pt) => dispatch(loginPT(pt))
})
)(LoginForm)
