import React from 'react';
import { Grid, Button } from 'semantic-ui-react';
import { Field, Formik, Form } from 'formik';

import { useStateValue } from '../state';
import { TextField, DiagnosisSelection } from '../AddPatientModal/FormField';
import EntryTypeFields from './EntryTypeField';
import { EntryType, HealthCheckEntry, NewEntry } from '../types';

export type EntryFormValues = Omit<HealthCheckEntry, 'id'>;

interface Props {
  initialValues: NewEntry;
  validationSchema: unknown;
  onSubmit: (values: NewEntry) => void;
  onCancel: () => void;
}

const AddEntryForm: React.FC<Props> = ({
  onSubmit,
  onCancel,
  initialValues,
  validationSchema,
}) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize={true}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched, values }) => {
        return (
          <Form className="form ui">
            <Field
              label="Discription"
              placeholder="Discription"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            <EntryTypeFields entryType={values.type as EntryType} />
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
