import React from 'react';
import { useParams } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';
import axios from 'axios';

import { Patient, Entry } from '../types';
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
      </div>
    );
  }
  return null;
};

export default PatientPage;
