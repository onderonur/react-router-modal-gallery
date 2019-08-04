import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Movie from './components/Movie';
import Movies from './components/Movies';
import Director from './components/Director';
import MuiModal from './components/MuiModal';
import Directors from './components/Directors';
import { ModalSwitch, ModalRoute } from '../../src';

const routes = [
  {
    exact: true,
    path: '/movies',
    component: Movies
  },
  {
    defaultParentPath: '/movies',
    modal: true,
    path: '/movies/:id',
    component: Movie
  },
  {
    exact: true,
    path: '/directors',
    component: Directors
  },
  {
    defaultParentPath: '/directors',
    modal: true,
    path: '/directors/:id',
    component: Director
  },
  {
    path: '*',
    // eslint-disable-next-line
    render: () => <Redirect to="/movies" />
  }
];

const modalRoutes = routes
  .filter(route => route.modal)
  .map(route => <ModalRoute key={route.path} {...route} />);

const Routes = () => (
  <ModalSwitch
    renderModal={({ open, redirectToBack }) => (
      <MuiModal open={open} scroll="body" onExited={redirectToBack}>
        {modalRoutes}
      </MuiModal>
    )}
  >
    {routes.map(route =>
      route.modal ? (
        <ModalRoute key={route.path} {...route} />
      ) : (
        <Route key={route.path} {...route} />
      )
    )}
  </ModalSwitch>
);

export default Routes;
