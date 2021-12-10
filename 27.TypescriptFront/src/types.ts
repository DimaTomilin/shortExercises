export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

export enum HealthCheckRating {
  'Healthy' = 0,
  'LowRisk' = 1,
  'HighRisk' = 2,
  'CriticalRisk' = 3,
}

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

export interface HealthCheckEntry extends BaseEntry {
  type: 'HealthCheck';
  healthCheckRating: HealthCheckRating;
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: 'OccupationalHealthcare';
  employerName: string;
  sickLeave?: SickLeave;
}

export interface HospitalEntry extends BaseEntry {
  type: 'Hospital';
  discharge: Discharge;
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export interface Patient {
  id: string;
  name: string;
  dateOfBirth?: string;
  ssn?: string;
  gender: Gender;
  occupation: string;
  entries: Entry[];
}

export enum EntryType {
  HealthCheck = 'HealthCheck',
  OccupationalHealthCare = 'OccupationalHealthcare',
  Hospital = 'Hospital',
}

interface SickLeave {
  startDate: string;
  endDate: string;
}

interface Discharge {
  date: string;
  criteria: string;
}

type DistributiveOmit<T, K extends keyof Entry> = T extends Entry
  ? Omit<T, K>
  : never;

export type NewBaseEntry = Omit<BaseEntry, 'id'>;

export type NewEntry = DistributiveOmit<Entry, 'id'>;
