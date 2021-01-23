import React, {memo} from 'react';
import {Modal, Button} from 'react-bootstrap';

function Confirm(props){

    return (
        <Modal
        show={true}
        onHide={props.onClose}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          Do you want to delete {props.count} task{props.count>1 ? "s": ""}?
        </Modal.Title>
      </Modal.Header>
      <Modal.Footer>
        <Button 
        onClick={props.onConfirm}
        variant='danger'
        >
        Delete
        </Button>
        <Button onClick={props.onClose}>Cancel</Button>
      </Modal.Footer>
    </Modal>
    )
}

export default memo(Confirm);