import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Fab from '@material-ui/core/Fab';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import { auth } from '../../Firebase';
import '../../styles/popOverBtn.css';

const Logout = () => {
  const [user, setUser] = useState(localStorage.user);

  const history = useHistory();
  useEffect(() => {
    if (!user) {
      history.push('/');
    }
  }, [user]);

  // Log user-out
  const signOut = () => {
    setUser(localStorage.clear());
    auth().signOut();
  };

  return (
    <div className="popOver">
      <Fab size="medium" color="secondary" aria-label="add" onClick={signOut}>
        <ExitToAppRoundedIcon />
      </Fab>
    </div>
  );
};

export default Logout;
