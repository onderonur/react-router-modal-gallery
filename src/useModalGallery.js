import { useContext } from 'react';
import { ModalRouteContext } from './ModalSwitch';

function useModalGallery() {
  const context = useContext(ModalRouteContext);

  return context;
}

export default useModalGallery;
