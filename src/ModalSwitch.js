import { Switch, withRouter } from "react-router";
import React, {
  useEffect,
  useRef,
  useReducer,
  useState,
  useCallback
} from "react";
import propTypes from "prop-types";

export const ModalRouteContext = React.createContext();

// action types
const PUSH_MODAL_LOCATION_KEY = "PUSH_MODAL_LOCATION_KEY";
const CLEAR_MODAL_LOCATION_KEYS = "CLEAR_MODAL_LOCATION_KEYS";
const SET_MODAL_LOCATION_KEYS = "SET_MODAL_LOCATION_KEYS";

// initial state
const initialState = {
  modalLocationKeys: []
};

// reducer
function reducer(state, action) {
  switch (action.type) {
    case PUSH_MODAL_LOCATION_KEY: {
      const { modalLocationKeys } = state;
      const newKeys = [...modalLocationKeys, action.key];
      return { ...state, modalLocationKeys: newKeys };
    }
    case CLEAR_MODAL_LOCATION_KEYS:
      return { ...state, modalLocationKeys: [] };
    case SET_MODAL_LOCATION_KEYS:
      return { ...state, modalLocationKeys: action.modalLocationKeys };
    default:
      return state;
  }
}

function ModalSwitch({ history, location, children, renderModal }) {
  const previousParentLocation = useRef(location);
  const [state, dispatch] = useReducer(reducer, initialState);

  const checkIfStartedWithModal = useCallback(() => {
    return !!(
      location.state &&
      location.state.modal &&
      location.state.defaultParentPath
    );
  }, [location]);

  const [startedWithModal, setStartedWithModal] = useState();

  const { modalLocationKeys } = state;

  useEffect(() => {
    const keysLength = modalLocationKeys.length;
    const locationKey = location.key;

    function clearModalLocationKeys() {
      if (modalLocationKeys.length) {
        dispatch({ type: CLEAR_MODAL_LOCATION_KEYS });
      }
    }

    // IMPORTANT NOTE:
    // ModalSwitch uses "location.key" to handle history navigation.
    // When the user click the back or forward button of the browser, it uses "location.key" to
    // decide which one is clicked.
    // Because of HashRouter doesn't have a "location.key" or "location.state", it breaks this behavior.
    function handleHistoryNavigation() {
      if (keysLength) {
        const index = modalLocationKeys.indexOf(locationKey);
        let newKeys = modalLocationKeys;

        const lastIndex = modalLocationKeys.length - 1;

        if (index >= 0 && index !== lastIndex) {
          // Browser's "back" button is clicked
          newKeys = newKeys.slice(0, index + 1);
        } else if (index < 0) {
          // Key not found in stored location keys
          // Browser's "forward" button is clicked
          newKeys = [...newKeys, locationKey];
        }

        dispatch({
          type: SET_MODAL_LOCATION_KEYS,
          modalLocationKeys: newKeys
        });
      }
    }

    if (checkIfStartedWithModal()) {
      // Location has a modal and defaultParentPath in its state.
      // Meaning that the user opened the modal directly by url wihout previous navigation. (startedWithModal)
      // Thus, we are setting this info to state.
      previousParentLocation.current = {
        pathname: location.state.defaultParentPath,
        search: "",
        hash: ""
      };

      clearModalLocationKeys();

      setStartedWithModal(true);
    } else if (!location.state || !location.state.modal) {
      // Opened a non-modal route
      previousParentLocation.current = location;

      clearModalLocationKeys();

      setStartedWithModal(false);
    } else if (!startedWithModal) {
      // User opened a modal but didn't start by directly entering a modal route
      if (history.action === "POP") {
        handleHistoryNavigation();
      } else if (history.action !== "REPLACE") {
        // "history.replace" is called inside a modal route.
        // We should not add a location key to modal location keys array in this situation.
        // Or else, we will go back more than we want when the modal is closed.
        if (!modalLocationKeys.includes(locationKey)) {
          dispatch({ type: PUSH_MODAL_LOCATION_KEY, key: locationKey });
        }
      }
    }
  }, [
    location,
    history.action,
    modalLocationKeys,
    startedWithModal,
    checkIfStartedWithModal
  ]);

  function redirectToBack() {
    const prevLocation = previousParentLocation.current;

    const keysLength = modalLocationKeys.length;

    if (keysLength) {
      history.go(-keysLength);
    } else {
      history.push(prevLocation.pathname);
    }
  }

  const isModal = !!(
    location.state &&
    location.state.modal &&
    previousParentLocation.current !== location
  ); // not initial render

  const switchLocation = isModal ? previousParentLocation.current : location;

  return (
    <ModalRouteContext.Provider
      value={{
        redirectToBack,
        previousParentLocation: previousParentLocation.current,
        isModal
      }}
    >
      <Switch location={switchLocation}>{children}</Switch>
      {isModal &&
        renderModal({
          open: isModal,
          redirectToBack
        })}
    </ModalRouteContext.Provider>
  );
}

ModalSwitch.propTypes = {
  ...Switch.propTypes,
  renderModal: propTypes.func.isRequired
};

export default withRouter(ModalSwitch);
