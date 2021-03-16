import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

// Components
import PopularShows from './components/popular_shows';
// Requests
import fetchMostFavoritedShows from '../requests/fetch_most_favorited_shows.js';

function Index() {
  const dispatch = useDispatch();
  // const [showst, setShowst] = useState(false);
  // const shows = useSelector((state) => state.shows.entities);

  useEffect(() => {
    dispatch(fetchMostFavoritedShows())
  }, [])

  return (
    <div>
      <p>Autenticado</p>
      <Link to="/logout">Logout</Link>
      <PopularShows />
    </div>
  );
}

export default Index;
