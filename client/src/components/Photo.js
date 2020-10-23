import React from 'react';
import { Card } from 'react-bootstrap';

const Photo = ({ id }) => {
  return (
    <Card className='photo'>
      <Card.Img
        variant='top'
        src={'https://upload.wikimedia.org/wikipedia/commons/0/0c/Nigo_in_Thailand%2C_2006.jpg'}
        alt='Photo'
      />
    </Card>
  )
}

export default Photo;