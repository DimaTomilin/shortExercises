import patients from '../../data/patients';
import { nonSsnPatient, newPatientEntry, Patient } from '../types';
import { v1 as uuid } from 'uuid';

const getNonSsnPatients = (): nonSsnPatient[] => {
  return patients.map(({ id, name, gender, dateOfBirth, occupation }) => ({
    id,
    name,
    gender,
    dateOfBirth,
    occupation,
  }));
};

const addPatient = ({
  name,
  dateOfBirth,
  ssn,
  gender,
  occupation,
}: newPatientEntry): Patient => {
  const newPatientEntry = {
    id: uuid(),
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation,
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getNonSsnPatients,
  addPatient,
};
