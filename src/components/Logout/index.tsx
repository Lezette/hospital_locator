import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import { auth } from '../../Firebase';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  })
);

const Logout = () => {
  const [user, setUser] = useState(localStorage.user);
  const history = useHistory();
  useEffect(() => {
    if (!user) {
      history.push('/');
    }
  }, [user]);
  const signOut = () => {
    setUser(localStorage.clear());
    auth().signOut();
  };
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Fab size="medium" color="secondary" aria-label="add" onClick={signOut}>
        <ExitToAppRoundedIcon />
      </Fab>
    </div>
  );
};

export default Logout;
