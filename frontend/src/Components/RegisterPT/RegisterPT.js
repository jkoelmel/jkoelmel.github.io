import {Typography} from '@material-ui/core';
import {Button} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 500,
    width: 500,
    padding: 10,
  },
  cssLabel: {
    color: '#00559A'
  },

  cssOutlinedInput: {
    '&$cssFocused $notchedOutline': {
      borderColor: `#00559A !important`,
    }
  },

  cssFocused: {},

  notchedOutline: {
    borderWidth: '1px',
    borderColor: '#00559A !important'
  },
}));

const RegisterPT = () => {
  const classes = useStyles();
  const [emailError, setEmailError] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState(false);

  return (
    <div>
      <Paper className={classes.root}>
        <Grid container direction="column" spacing={3} alignItems="center">
          <Grid item>
            <TextField
              //  onChange={(e) => {}
              className={classes.textfield}
              error={emailError}
              id="outlined-error"
              label="Email"
              defaultValue=""
              variant="outlined"
              color="secondary"
              InputLabelProps={{
                classes: {
                  root: classes.cssLabel,
                  focused: classes.cssFocused,
                },
              }}
              InputProps={{
                classes: {
                  root: classes.cssOutlinedInput,
                  focused: classes.cssFocused,
                  notchedOutline: classes.notchedOutline,
                },
                inputMode: "numeric"
              }}
            />
          </Grid>
          <Grid item>
            <TextField
              error={passwordError}
              id="outlined-error"
              label="Password"
              placeholder="password"
              variant="outlined"
              color="secondary"
              type="password"
              InputLabelProps={{
                classes: {
                  root: classes.cssLabel,
                  focused: classes.cssFocused,
                },
              }}
              InputProps={{
                classes: {
                  root: classes.cssOutlinedInput,
                  focused: classes.cssFocused,
                  notchedOutline: classes.notchedOutline,
                },
                inputMode: "numeric"
              }}
            />
          </Grid>
          <Grid item>
            <TextField
              error={passwordError}
              id="outlined-error"
              label="First Name"
              defaultValue=""
              variant="outlined"
              color="secondary"
              InputLabelProps={{
                classes: {
                  root: classes.cssLabel,
                  focused: classes.cssFocused,
                },
              }}
              InputProps={{
                classes: {
                  root: classes.cssOutlinedInput,
                  focused: classes.cssFocused,
                  notchedOutline: classes.notchedOutline,
                },
                inputMode: "numeric"
              }}
            />
          </Grid>
          <Grid item>
            <TextField
              error={passwordError}
              id="outlined-error"
              label="Last Name"
              defaultValue=""
              variant="outlined"
              color="secondary"
              InputLabelProps={{
                classes: {
                  root: classes.cssLabel,
                  focused: classes.cssFocused,
                },
              }}
              InputProps={{
                classes: {
                  root: classes.cssOutlinedInput,
                  focused: classes.cssFocused,
                  notchedOutline: classes.notchedOutline,
                },
                inputMode: "numeric"
              }}
            />
          </Grid>
          <Grid item>
            <TextField
              error={passwordError}
              id="outlined-error"
              label="Company"
              defaultValue=""
              variant="outlined"
              color="secondary"
              InputLabelProps={{
                classes: {
                  root: classes.cssLabel,
                  focused: classes.cssFocused,
                },
              }}
              InputProps={{
                classes: {
                  root: classes.cssOutlinedInput,
                  focused: classes.cssFocused,
                  notchedOutline: classes.notchedOutline,
                },
                inputMode: "numeric"
              }}
            />
          </Grid>
          <Grid item>
        <Button
                  // variant='contained'
                  color="secondary"
                  type="submit"
                  style={{marginTop: '1.5rem'}}
                >
                  Login
                </Button>
        </Grid>
        </Grid>
        
      </Paper>
    </div>
  );
};

export default RegisterPT;
