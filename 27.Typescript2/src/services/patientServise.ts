import patients from '../../data/patients';
import { nonSsnPatient } from '../types';

const getNonSsnPatients = (): nonSsnPatient[] => {
  return patients.map(({ id, name, gender, dateOfBirth, occupation }) => ({
    id,
    name,
    gender,
    dateOfBirth,
    occupation,
  }));
};

const addEntry = () => {
  return null;
};

export default {
  getNonSsnPatients,
  addEntry,
};
