import React from 'react';
import { Card } from 'react-bootstrap';
import {} from 'dotenv/config';

const Photo = ({ url }) => {
  let envString;
  if (process.env.NODE_ENV === 'development') {
  	envString = 'dev';
  } else if (process.env.NODE_ENV === 'production') {
  	envString = 'prod';
  }
  return (
    <Card className='photo'>
      <Card.Img
        variant='top'
        src={`https://letusbreathe-${envString}.s3.us-east-2.amazonaws.com/${url}`}
        alt='Photo'
      />
    </Card>
  )
}

export default Photo;