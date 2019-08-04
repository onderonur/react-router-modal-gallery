import { useEffect } from 'react';
import { Route } from 'react-router-dom';
import propTypes from 'prop-types';
import useModalGallery from './useModalGallery';

function ModalRouteContent({ defaultParentPath, children, ...rest }) {
  const { previousParentLocation } = useModalGallery();

  const { location, history } = rest;

  const isModal = location.state && location.state.modal;
  const isInitialRender = previousParentLocation === location;

  // isModal: false => User opened a modal route directly (opened on a new tab etc.)
  // isInitialRender: true => User refreshed the page while on a modal route (pressed the F5 etc.)
  const reRenderRoute = !isModal || isInitialRender;

  useEffect(() => {
    function addStateToLocation() {
      history.replace({
        ...location,
        state: {
          ...location.state,
          defaultParentPath,
          modal: true
        }
      });
    }

    if (reRenderRoute) {
      ('rerender');
      addStateToLocation();
    }
  }, [location, defaultParentPath, reRenderRoute, history]);

  return !reRenderRoute
    ? children({
        ...rest
      })
    : null;
}

ModalRouteContent.propTypes = {
  ...Route.propTypes,
  defaultParentPath: propTypes.string.isRequired
};

export default ModalRouteContent;
