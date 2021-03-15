import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

//Components


// Actions && Requests


function Index() {
  const isAuthenticated = useSelector((state) => state.user.entity.is_authenticated);

  return (
    <div>
      { isAuthenticated ?
        <>
        <p>Autenticado</p>
        <Link to="/logout">Logout</Link>
        </>
        :
        <>
        <p>Não autenticado</p>
        </>
      }
    </div>
  );
}

export default Index;
