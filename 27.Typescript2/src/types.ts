export interface Diagnose {
  code: string;
  name: string;
  latin?: string;
}

/*
*
Patient
*
*/
export enum Gender {
  Male = 'male',
  Female = 'female',
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[];
}

/*
*
Entry
*
*/
export enum HealthCheckRating {
  'Healthy' = 0,
  'LowRisk' = 1,
  'HighRisk' = 2,
  'CriticalRisk' = 3,
}

export enum EntryType {
  HealthCheck = 'HealthCheck',
  OccupationalHealthCare = 'OccupationalHealthcare',
  Hospital = 'Hospital',
}

interface BaseEntry {
  id: string;
  type: EntryType;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnose['code']>;
}

interface HealthCheckEntry extends BaseEntry {
  type: EntryType.HealthCheck;
  healthCheckRating: HealthCheckRating;
}

interface OccupationalHealthcareEntry extends BaseEntry {
  type: EntryType.OccupationalHealthCare;
  employerName: string;
  sickLeave?: {
    startDate: string;
    endDate: string;
  };
}

interface HospitalEntry extends BaseEntry {
  type: EntryType.Hospital;
  discharge: {
    date: string;
    criteria: string;
  };
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

type DistributiveOmit<T, K extends keyof Entry> = T extends Entry
  ? Omit<T, K>
  : never;

/*
*
Adding New
*
*/
export type NewEntry = DistributiveOmit<Entry, 'id'>;

export type NewBaseEntry = Omit<BaseEntry, 'id'>;

export type PublicPatient = Omit<Patient, 'ssn' | 'entries'>;

export type newPatientEntry = Omit<Patient, 'id'>;
