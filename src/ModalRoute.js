import React from "react";
import { Route } from "react-router-dom";
import ModalRouteContent from "./ModalRouteContent";
import propTypes from "prop-types";

function ModalRoute({ defaultParentPath, component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props => (
        <ModalRouteContent {...{ ...props, defaultParentPath }}>
          {component}
        </ModalRouteContent>
      )}
    />
  );
}

ModalRoute.propTypes = {
  ...Route.propTypes,
  defaultParentPath: propTypes.string.isRequired
};

export default ModalRoute;
