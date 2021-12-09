import React from 'react';
import { useParams } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';
import axios from 'axios';

import { Patient } from '../types';
import { apiBaseUrl } from '../constants';
import { useStateValue } from '../state';

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
      </div>
    );
  }
  return null;
};

export default PatientPage;
