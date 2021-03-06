import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";

import Show from './show';

export default function PopularShows() {
  const shows = useSelector((state) => state.shows.entities);
  const ids = useSelector((state) => state.shows.ids);

  return (
    <div>
      {ids && ids.map((id) => {
        return <Show key={id} data={shows[id]} />
      })}
      <div>
        <Link to="/scheduler">Scheduler</Link>
      </div>
    </div>
  );
}
