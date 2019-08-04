import React from "react";
import { Link } from "react-router-dom";

export function splitPathnameAndQueryString(path) {
  const [pathname, search] = path.split("?");

  return {
    pathname,
    search: search ? `?${search}` : ""
  };
}

function addModalStateToLink(to) {
  if (typeof to === "string") {
    const { pathname, search } = splitPathnameAndQueryString(to);
    return {
      pathname,
      search: search,
      state: {
        modal: true
      }
    };
  } else {
    return {
      ...to,
      state: {
        ...to.state,
        modal: true
      }
    };
  }
}

function ModalLink({ to, ...rest }) {
  return <Link {...rest} to={addModalStateToLink(to)} />;
}

ModalLink.propTypes = Link.propTypes;

export default ModalLink;
