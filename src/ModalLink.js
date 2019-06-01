import React from "react";
import { Link } from "react-router-dom";

function ModalLink({ to, ...rest }) {
  return (
    <Link
      {...rest}
      to={
        typeof to === "string"
          ? {
              pathname: to,
              state: {
                modal: true
              }
            }
          : {
              ...to,
              state: to ? { ...to.state, modal: true } : { modal: true }
            }
      }
    />
  );
}

ModalLink.propTypes = Link.propTypes;

export default ModalLink;
