import * as React from 'react';
import {Formik, Form} from 'formik';
import {connect} from 'react-redux';
import {loginPT} from '../../Redux/actions/actions-pt';
import {Redirect} from 'react-router-dom';

import {
  TextField,
  Button,
  makeStyles,
  InputAdornment,
  IconButton,
  FormControl,
  Typography,
} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import {Visibility, VisibilityOff} from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  form: {
    margin: '10px auto',
    height: '300px',
    width: '400px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: '200px',
    marginBottom: '1.5rem',
  },
}));
//TODO handle error text and redux.... might have to swtich it to a regular func instead of formik.

const LoginForm = (props, {submit, isLoading, error}) => {
  const classes = useStyles();

  // ~ Logic
  const [showPassword, handleShowPassword] = React.useState(false);
  if (isLoading) {
    return <Typography>Loading</Typography>;
  }

  return (
    <Paper className={classes.root}>
      <React.Fragment>
        <Formik
          initialValues={{email: '', password: ''}}
          onSubmit={async (data, {setSubmitting}) => {
            console.log(data);
            setSubmitting(true);
            // make async call
            await props.loginPT(data);
            setSubmitting(false);
          }}
        >
          {({
            values,
            isSubmitting,
            handleChange,
            handleBlur,
            touched,
            errors,
          }) => (
            <Form className={classes.form}>
              <TextField
                color="secondary"
                className={classes.box}
                placeholder="email"
                name="email"
                label="email"
                error={props.errorCode ? true : false}
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                // helperText={
                //   // props.errorCode
                // }
              />
              <TextField
                color="secondary"
                placeholder="password"
                className={classes.box}
                label="password"
                name="password"
                error={props.errorCode ? true : false}
                helperText={props.errorCode}
                type={showPassword ? 'text' : 'password'}
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        style={{fontSize: '200px'}}
                        aria-label="toggle password visibility"
                        onClick={() => {
                          handleShowPassword(!showPassword);
                        }}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              {/* {error && <p style={{ color: 'red' }}>{error}</p>} */}
              {/* {props.errorCode && <p style={{ color: 'red' }}>{props.errorCode}</p>} */}
              <FormControl>
                <Button
                  disabled={isSubmitting}
                  // variant='contained'
                  color="secondary"
                  type="submit"
                  style={{marginTop: '1.5rem'}}
                >
                  Login
                </Button>
              </FormControl>
              {/* <pre>{JSON.stringify(values, null, 2)}</pre> */}
            </Form>
          )}
        </Formik>
      </React.Fragment>
    </Paper>
  );
};

export default connect(
  (state) => ({
    // The state of the pt, as defined by reducer-pt
    pt: state.pt,
    // The state of the pt's patients, defined by reducer-pt
    patients: state.pt.patients,

    errorCode: state.pt.errorCode,
  }),
  (dispatch) => ({
    // The action from actions-pt which will effect reducer-pt
    loginPT: (data) => dispatch(loginPT(data)),
  }),
)(LoginForm);
