import patients from '../../data/patients';
import {
  PublicPatient,
  newPatientEntry,
  Patient,
  NewEntry,
  Entry,
} from '../types';
import { v1 as uuid } from 'uuid';

const getNonSsnPatients = (): PublicPatient[] => {
  return patients.map(({ id, name, gender, dateOfBirth, occupation }) => ({
    id,
    name,
    gender,
    dateOfBirth,
    occupation,
  }));
};

const getPatientById = (id: string): Patient => {
  const patient = patients.find((patient) => {
    return patient.id === id;
  });
  if (patient === undefined) {
    throw new Error('Incorrect id. Patient don`t found');
  }
  return patient;
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
    entries: [],
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

const addEntry = (patient: Patient, newEntry: NewEntry): Patient => {
  const entry: Entry = { ...newEntry, id: uuid() };
  const savedPatient = { ...patient, entries: patient.entries.concat(entry) };
  patients.map((p) => (p.id === savedPatient.id ? savedPatient : p));

  return savedPatient;
};

export default {
  getNonSsnPatients,
  getPatientById,
  addPatient,
  addEntry,
};
