import React from "react";
import MovieList from "./MovieList";
import { getAllMovies } from "../data";

const Movies = () => {
  const movies = getAllMovies();

  return (
    <React.Fragment>
      <h2>Movies</h2>
      <MovieList movies={movies} />
    </React.Fragment>
  );
};

export default Movies;
