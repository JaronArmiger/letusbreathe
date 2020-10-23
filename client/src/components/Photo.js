import React from 'react';
import { Card } from 'react-bootstrap';

const Photo = ({ url }) => {
  return (
    <Card className='photo'>
      <Card.Img
        variant='top'
        src={`https://letusbreathe.s3.us-east-2.amazonaws.com/${url}`}
        alt='Photo'
      />
    </Card>
  )
}

export default Photo;