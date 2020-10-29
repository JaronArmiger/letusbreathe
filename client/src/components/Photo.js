import React from 'react';
import { Card } from 'react-bootstrap';
import {} from 'dotenv/config';

const Photo = ({ url }) => {
  let envString;
  console.log(process.env.NODE_ENV);
  if (process.env.NODE_ENV === 'development') {
  	envString = 'dev';
  }
  return (
    <Card className='photo'>
      <Card.Img
        variant='top'
        src={`https://letusbreathe-prod.s3.us-east-2.amazonaws.com/${url}`}
        alt='Photo'
      />
    </Card>
  )
}

export default Photo;