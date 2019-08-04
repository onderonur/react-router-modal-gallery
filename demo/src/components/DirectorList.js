import React from 'react';
import { ModalLink } from '../../../src';
import PropTypes from 'prop-types';

const DirectorList = ({ directors }) => {
  return (
    <ul>
      {directors.map(director => (
        <li key={director.id}>
          <ModalLink to={`/directors/${director.id}`}>
            {director.name}
          </ModalLink>
        </li>
      ))}
    </ul>
  );
};

DirectorList.propTypes = {
  directors: PropTypes.arrayOf(PropTypes.object)
};

export default DirectorList;
