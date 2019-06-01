import React from "react";
import { ModalLink } from "../../../src";
import PropTypes from "prop-types";

const MovieList = ({ movies }) => {
  return (
    <ul>
      {movies.map(movie => (
        <li key={movie.id}>
          <ModalLink to={`/movies/${movie.id}`}>{movie.title}</ModalLink>
        </li>
      ))}
    </ul>
  );
};

MovieList.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object)
};

export default MovieList;
