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

const Login = () => {
  const classes = useStyles();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
  const setData = (event: any) => {
    event.preventDefault();
    setDisabled(true);
    if (email.trim() && password.trim()) {
      auth()
        .signInWithEmailAndPassword(email, password)
        .then((result) => {
          setDisabled(false);
          const user = JSON.stringify(result.user);
          alert('Login Successful');
          localStorage.user = user;
          setUser(user);
        })
        .catch((error) => {
          alert(error.message);
          setDisabled(false);
        });
    }
  };
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
            Sign in
          </Typography>
          <form className={classes.form} noValidate onSubmit={setData}>
            <TextField
              variant="outlined"
              margin="dense"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="off"
              autoFocus
              onChange={handleEmailChange}
            />
            <TextField
              variant="outlined"
              margin="dense"
              required
              fullWidth
              autoComplete="off"
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange={handlePasswordChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={disabled}
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to="#">Forgot password?</Link>
              </Grid>
              <Grid item>
                <Link to="/signup">{"Don't have an account? Sign Up"}</Link>
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

export default Login;
