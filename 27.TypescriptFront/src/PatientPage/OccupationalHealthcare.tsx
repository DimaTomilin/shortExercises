import React from 'react';
import { Icon, Card, List } from 'semantic-ui-react';
import { OccupationalHealthcareEntry } from '../types';

const style = { margin: 10, width: 350 };

const OccupationalHealthcare: React.FC<{
  entry: OccupationalHealthcareEntry;
}> = ({ entry }) => (
  <div>
    <Card style={style}>
      <Card.Content>
        <Card.Header>
          {entry.date} <Icon color="purple" name="stethoscope" />
        </Card.Header>
        <Card.Meta>by {entry.specialist}</Card.Meta>
        <Card.Description>{entry.description}</Card.Description>
        <br />
        {'Diagnoses:'}
        {entry.diagnosisCodes?.map((code, index) => {
          return <li key={index}>{code}</li>;
        })}
      </Card.Content>
      <Card.Content extra>
        <List>
          <List.Item>
            <strong>Employer:</strong> {entry.employerName}
          </List.Item>
          {entry.sickLeave && (
            <List.Item>
              <strong>Sick Leave:</strong> {entry.sickLeave.startDate} to{' '}
              {entry.sickLeave.endDate}
            </List.Item>
          )}
        </List>
      </Card.Content>
    </Card>
  </div>
);

export default OccupationalHealthcare;
