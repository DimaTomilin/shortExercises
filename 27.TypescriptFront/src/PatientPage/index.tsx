import React from 'react';
import { useParams } from 'react-router-dom';
import { Icon, Button } from 'semantic-ui-react';
import axios from 'axios';

import AddEntryModal from '../AddEntryModal/index';
import { Patient, Entry, NewEntry } from '../types';
import { apiBaseUrl } from '../constants';
import { useStateValue } from '../state';
import Hospital from './Hospital';
import HealthCheck from './HealthCheck';
import OccupationalHealthcare from './OccupationalHealthcare';

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case 'Hospital':
      return <Hospital entry={entry} />;
    case 'OccupationalHealthcare':
      return <OccupationalHealthcare entry={entry} />;
    case 'HealthCheck':
      return <HealthCheck entry={entry} />;
    default:
      return assertNever(entry);
  }
};

const PatientPage = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patients }, dispatch] = useStateValue();

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: NewEntry) => {
    const body = { ...values };

    try {
      const { data: returnedPatient } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${id}/entries`,
        body
      );
      dispatch({ type: 'UPDATE_PATIENT', payload: returnedPatient });
      closeModal();
    } catch (e: any) {
      setError(e.response?.data?.error || 'Oops! Something went wrong!');
    }
  };

  let currentPatient: Patient | undefined = Object.values(patients).find(
    (patient: Patient) => patient.id === id
  );

  if (!currentPatient?.ssn) {
    const fetchPatient = async () => {
      try {
        const { data: patient } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        console.log(patient);
        currentPatient = patient;
        dispatch({ type: 'SET_PATIENT', payload: patient });
      } catch (e) {
        console.error(e);
      }
    };
    void fetchPatient();
  }

  let iconName: 'man' | 'woman' | 'genderless';

  if (currentPatient) {
    switch (currentPatient.gender) {
      case 'male':
        iconName = 'man';
        break;
      case 'female':
        iconName = 'woman';
        break;
      case 'other':
        iconName = 'genderless';
        break;
      default:
        iconName = 'man';
    }

    return (
      <div>
        <h2>
          {currentPatient.name} <Icon name={iconName} />{' '}
        </h2>
        <p>ssn: {currentPatient.ssn}</p>
        <p>occupation: {currentPatient.occupation}</p>
        <h3>Entries:</h3>
        {currentPatient.entries?.map((entry, i) => (
          <EntryDetails entry={entry} key={i} />
        ))}
        <AddEntryModal
          modalOpen={modalOpen}
          onSubmit={submitNewEntry}
          error={error}
          onClose={closeModal}
        />
        <Button onClick={openModal}>Add New Entry</Button>
      </div>
    );
  }
  return null;
};

export default PatientPage;
