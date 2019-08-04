import React from 'react';
import MovieList from './MovieList';
import { getDirectorById } from '../data';
import styled from 'styled-components';
import { Typography } from '@material-ui/core';
import PropTypes from 'prop-types';

const Root = styled.div`
  padding: 12px;
`;

const Director = ({
  match: {
    params: { id }
  }
}) => {
  const director = getDirectorById(id);

  return (
    <Root>
      <Typography variant="h6">{director.name}</Typography>
      <hr />
      <p>Movies by {director.name}:</p>
      <MovieList movies={director.movies} />
    </Root>
  );
};

Director.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string
    })
  }).isRequired
};

export default Director;
