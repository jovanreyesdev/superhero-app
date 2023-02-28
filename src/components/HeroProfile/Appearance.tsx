import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';

import { Appearance } from '@types';

type Props = {
  data: Appearance;
}

const AppearanceComponent: React.FC<Props> = ({ data }) => {
  return (
    <ListGroup>
      <ListGroup.Item
        as="li"
        className="d-flex justify-content-between align-items-start"
      >
        <small>Eye Color</small>
        <small dangerouslySetInnerHTML={{ __html: data?.['eye-color'] }} />
      </ListGroup.Item>
      <ListGroup.Item
        as="li"
        className="d-flex justify-content-between align-items-start"
      >
        <small>Gender</small>
        <small dangerouslySetInnerHTML={{ __html: data?.gender }} />
      </ListGroup.Item>
      <ListGroup.Item
        as="li"
        className="d-flex justify-content-between align-items-start"
      >
        <small>Hair Color</small>
        <small dangerouslySetInnerHTML={{ __html: data?.['hair-color'] }} />
      </ListGroup.Item>
      <ListGroup.Item
        as="li"
        className="d-flex justify-content-between align-items-start"
      >
        <small>Height</small>
        <small dangerouslySetInnerHTML={{ __html: `${data?.height?.[0]} / ${data?.height?.[1]}` }} />
      </ListGroup.Item>
      <ListGroup.Item
        as="li"
        className="d-flex justify-content-between align-items-start"
      >
        <small>Race</small>
        <small dangerouslySetInnerHTML={{ __html: data?.race }} />
      </ListGroup.Item>
      <ListGroup.Item
        as="li"
        className="d-flex justify-content-between align-items-start"
      >
        <small>Weight</small>
        <small dangerouslySetInnerHTML={{ __html: `${data?.weight?.[0]} / ${data?.weight?.[1]}` }} />
      </ListGroup.Item>
    </ListGroup>
  )
}

export default AppearanceComponent;