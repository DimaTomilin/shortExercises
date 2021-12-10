/* eslint-disable @typescript-eslint/no-unsafe-argument */
// import diagnoses from '../data/diagnoses';
import {
  newPatientEntry,
  NewEntry,
  Gender,
  EntryType,
  HealthCheckRating,
  NewBaseEntry,
} from './types';

/*
*
Types of data
*
*/
type Fields = {
  name: unknown;
  dateOfBirth: unknown;
  ssn: unknown;
  gender: unknown;
  occupation: unknown;
  entries: unknown;
};

type EntryFields = {
  description: unknown;
  type: EntryType;
  date: unknown;
  specialist: unknown;
  diagnosisCodes?: unknown[];
  healthCheckRating?: unknown;
  employerName?: unknown;
  sickLeave?: {
    startDate: unknown;
    endDate: unknown;
  };
  discharge?: {
    date: unknown;
    criteria: unknown;
  };
};

/*
*
Error function
*
*/
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

/*
*
New Patient
*
*/

export const toNewPatientEntry = (object: Fields): newPatientEntry => {
  const newEntry: newPatientEntry = {
    name: parseToString(object.name, 'name'),
    dateOfBirth: parseToDate(object.dateOfBirth, 'dateOfBirth'),
    ssn: parseToString(object.ssn, 'ssn'),
    gender: parseGender(object.gender),
    occupation: parseToString(object.occupation, 'occupation'),
    entries: [],
  };

  return newEntry;
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

/*
*
New Entry
*
*/

const toNewBaseEntry = (object: EntryFields): NewBaseEntry => {
  const newBaseEntry: NewBaseEntry = {
    description: parseToString(object.description, 'description'),
    type: parseEntryType(object.type),
    date: parseToDate(object.date, 'date'),
    specialist: parseToString(object.specialist, 'specialist'),
  };

  if (object.diagnosisCodes) {
    newBaseEntry.diagnosisCodes = parseArrayDiagnoses(object.diagnosisCodes);
  }

  return newBaseEntry;
};

const parseEntryType = (entryType: EntryType): EntryType => {
  if (!Object.values(EntryType).includes(entryType)) {
    throw new Error(`Incorrect or missing type: ${entryType || ''}`);
  }

  return entryType;
};

const parseArrayDiagnoses = (diagnoses: unknown[]): string[] => {
  if (!diagnoses || !isArrayOfStrings(diagnoses)) {
    throw new Error('Incorrect or missing diagnoses');
  }
  return diagnoses;
};

const parseHealthCheckRating = (
  healthCheckRating: unknown
): HealthCheckRating => {
  if (
    healthCheckRating === null ||
    healthCheckRating === undefined ||
    !isHealthCheckRating(healthCheckRating)
  ) {
    throw new Error(
      `Incorrect or missing health check rating: ${healthCheckRating || ''}`
    );
  }
  return healthCheckRating;
};

const parseSickLeave = (object: {
  startDate: unknown;
  endDate: unknown;
}): { startDate: string; endDate: string } => {
  if (!object) throw new Error('Missing sick leave');

  return {
    startDate: parseToDate(object.startDate, 'sick leave start date'),
    endDate: parseToDate(object.endDate, 'sick leave end date'),
  };
};

const parseDischarge = (object: {
  date: unknown;
  criteria: unknown;
}): { date: string; criteria: string } => {
  if (!object) throw new Error('Missing discharge');

  return {
    date: parseToDate(object.date, 'discharge date'),
    criteria: parseToString(object.criteria, 'discharge criteria'),
  };
};

export const toNewEntry = (object: EntryFields): NewEntry => {
  const newBaseEntry = toNewBaseEntry(object) as NewEntry;

  switch (newBaseEntry.type) {
    case EntryType.HealthCheck:
      return {
        ...newBaseEntry,
        healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
      };
    case EntryType.OccupationalHealthCare:
      const newEntry = {
        ...newBaseEntry,
        employerName: parseToString(object.employerName, 'employer name'),
      };

      if (object.sickLeave) {
        newEntry.sickLeave = parseSickLeave(object.sickLeave);
      }

      return newEntry;
    case EntryType.Hospital:
      if (object.discharge) {
        return { ...newBaseEntry, discharge: parseDischarge(object.discharge) };
      }
      return { ...newBaseEntry };
    default:
      return assertNever(newBaseEntry);
  }
};

/*
*
Generic Parse
*
*/

const parseToDate = (param: unknown, paramName: string): string => {
  if (!param || !isString(param) || !isDate(param)) {
    throw new Error(`Incorrect or missing ${paramName}: ${param || ''}`);
  }
  return param;
};

const parseToString = (param: unknown, paramName: string): string => {
  if (!param || !isString(param)) {
    throw new Error(`Incorrect or missing ${paramName}: ${param || ''}`);
  }
  return param;
};

/*
*
Check IsSomething
*
*/
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const isDate = (date: string): date is string => {
  return Boolean(Date.parse(date));
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isArrayOfStrings = (param: unknown[]): param is string[] => {
  const hasNonString = param.some((item) => {
    return !isString(item);
  });

  return !hasNonString;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};
