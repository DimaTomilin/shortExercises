import React from 'react';
import { Modal, Segment } from 'semantic-ui-react';
import AddEntryFormWrapper from './WrapperEntryForm';
import { NewEntry } from '../types';

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: NewEntry) => void;
  error?: string;
}

const AddEntryModal = ({ modalOpen, onClose, onSubmit, error }: Props) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Add a new entry</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
      <AddEntryFormWrapper onCancel={onClose} onSubmit={onSubmit} />
    </Modal.Content>
  </Modal>
);

export default AddEntryModal;
