import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import logout from '../requests/logout';

function LogOut() {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleClick = (decision) => {
    if (decision) {
      dispatch(logout());
      history.push('/');
    } else {
      history.push('/');
    }
  }

  return (
    <>
      <div>
        <p>Are you sure?</p>
        <button onClick={() => handleClick(true)}>Yes</button>
        <button onClick={() => handleClick(false)}>No</button>
      </div>
    </>
  );
}

export default LogOut;
