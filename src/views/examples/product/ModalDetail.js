import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const ModalDetail = (props) => {
  const {
    data,
    className
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button color="primary" onClick={toggle}>Detail</Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Product Detail</ModalHeader>
        <ModalBody>
            <strong>Title:</strong> {data.productDetail.name} <br />
            <strong>Link:</strong> <a href={data.url} target="_blank" rel="noopener noreferrer">{data.url}</a> <br />
            <strong>Price:</strong> {data.productDetail.price} <br />
            <strong>Description:</strong> {data.productDetail.description}
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>Close</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ModalDetail;