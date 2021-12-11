import React from 'react';
import { Icon, Card, List } from 'semantic-ui-react';
import { HospitalEntry } from '../types';

const style = { margin: 10, width: 350 };

const Hospital: React.FC<{ entry: HospitalEntry }> = ({ entry }) => (
  <div>
    <Card style={style}>
      <Card.Content>
        <Card.Header>
          {entry.date} <Icon color="red" name="hospital symbol" />
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
            <List.Header>Discharged on {entry.discharge.date}</List.Header>
            {entry.discharge.criteria}
          </List.Item>
        </List>
      </Card.Content>
    </Card>
  </div>
);

export default Hospital;
