import React from 'react';
import { Card } from 'react-bootstrap';

const Photo = ({ id }) => {
  return (
    <Card className='photo'>
      <Card.Img
        variant='top'
        src={}
        alt='Photo'
      />
    </Card>
  )
}