import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { Link, useHistory } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Copyright from '../Copyright';
import { auth } from '../../Firebase';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/TqALOjrYE1A)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [conpassword, setConPassword] = useState('');
  const [disabled, setDisabled] = useState(false);
  const [user, setUser] = useState(localStorage.user);
  const history = useHistory();

  useEffect(() => {
    if (user) {
      history.push('/map');
    }
  }, [user]);
  const handleEmailChange = (e: any) => {
    const value = e.target.value;
    setEmail(value);
  };
  const handlePasswordChange = (e: any) => {
    const value = e.target.value;
    setPassword(value);
  };
  const handleConPasswordChange = (e: any) => {
    const value = e.target.value;
    setConPassword(value);
  };
  const addUser = (event: any) => {
    event.preventDefault();
    if (!(conpassword.trim() === password.trim())) {
      alert('password and confrim password must match');
      return;
    }
    if (email.trim() && password.trim()) {
      setDisabled(true);
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then((result) => {
          setDisabled(false);
          const user = JSON.stringify(result.user);
          localStorage.user = user;
          setUser(user);
          alert('Account created successfully');
          history.push('/map');
        })
        .catch((error) => {
          setDisabled(false);
          alert(error.message);
        });
    }
  };
  const classes = useStyles();

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <form className={classes.form} noValidate onSubmit={addUser}>
            <TextField
              variant="outlined"
              margin="dense"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              // autoComplete="off"
              autoFocus
              onChange={handleEmailChange}
            />
            <TextField
              variant="outlined"
              margin="dense"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              autoComplete="off"
              id="password"
              onChange={handlePasswordChange}
            />
            <TextField
              variant="outlined"
              margin="dense"
              required
              fullWidth
              name="conpassword"
              label="Confirm Password"
              type="password"
              autoComplete="off"
              id="conpassword"
              onChange={handleConPasswordChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={disabled}
              className={classes.submit}
            >
              Sign Up
            </Button>
            <Grid container>
              <Grid item>
                <Link to="/">{'Not a first time user? Sign in'}</Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};
export default Signup;
