import React from 'react'
import { useSelector } from 'react-redux';
import { useQuery } from "react-query";
import Loader from "react-loader-spinner";
import { Link } from "react-router-dom";

import Show from './show';

export default function PopularShows({ data }) {
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

// const { data, error, isLoading, isError } = useQuery("shows", fetchPopularShows);

// if(isLoading) {
//   return(
//     <>
//       <Loader type="ThreeDots" color="#cccccc" height={30} />
//     </>
//   )
// }

// if(isError) {
//   return <span>Error: {error.message}</span>
// }
