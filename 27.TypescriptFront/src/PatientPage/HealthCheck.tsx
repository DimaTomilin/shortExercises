import React from 'react';
import { Icon, Card } from 'semantic-ui-react';
import { HealthCheckEntry } from '../types';

const style = { margin: 10, width: 350 };

const HealthCheck: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => {
  let color: 'green' | 'yellow' | 'orange' | 'red';

  switch (entry.healthCheckRating) {
    case 0:
      color = 'green';
      break;
    case 1:
      color = 'yellow';
      break;
    case 2:
      color = 'orange';
      break;
    case 3:
      color = 'red';
      break;
    default:
      color = 'green';
      break;
  }

  return (
    <div>
      <Card style={style}>
        <Card.Content>
          <Card.Header>
            {entry.date} <Icon color="orange" name="doctor" />
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
          <Icon name="heart" color={color} />
        </Card.Content>
      </Card>
    </div>
  );
};

export default HealthCheck;
