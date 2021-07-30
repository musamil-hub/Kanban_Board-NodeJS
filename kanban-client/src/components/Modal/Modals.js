import React from 'react';
import { Modal } from 'react-bootstrap';

const Modals = props => {
  return (
    <>
      <Modal {...props}>{props.components}</Modal>
    </>
  );
};

export default Modals;
