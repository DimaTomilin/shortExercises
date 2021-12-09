export enum Gender {
  Male = 'male',
  Female = 'female',
}

export interface Entry {}

export interface Diagnose {
  code: string;
  name: string;
  latin?: string;
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

export type PublicPatient = Omit<Patient, 'ssn' | 'entries'>;

export type newPatientEntry = Omit<Patient, 'id'>;
