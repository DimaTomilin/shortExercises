export enum Gender {
  Male = 'male',
  Female = 'female',
}

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
}

export type nonSsnPatient = Omit<Patient, 'ssn'>;

export type newPatientEntry = Omit<Patient, 'id'>;
