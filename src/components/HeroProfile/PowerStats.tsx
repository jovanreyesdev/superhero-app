import React from 'react';
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';

import { PowerStats } from '@types';

type Props = {
  data: PowerStats;
}

const PowerStatsComponent: React.FC<Props> = ({ data }) => {
  return (
    <ListGroup>
      {
        Object.keys(data || {})?.map((stat) => {
          const statItem = data?.[stat as keyof typeof data]
          return (
            <ListGroup.Item
              as="li"
              className="d-flex justify-content-between align-items-start"
            >
              <small>{stat}</small>
              <Badge bg="primary" pill dangerouslySetInnerHTML={{ __html: statItem }} />
            </ListGroup.Item>
          )
        })
      }
    </ListGroup>
  )
}

export default PowerStatsComponent;