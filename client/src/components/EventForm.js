import React from 'react';
import { connect } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

const EventForm = ({ errors, dispatch }) => {
  const handleFormSubmit = (e) => {
  	e.preventDefault(e);
    axios.post('/events/create', {
      title: e.target.title.value,
      description: e.target.description.value,
      start: e.target.start.value,
      end: e.target.end.value,
    })
  }

  return (
    <Form
      onSubmit={handleFormSubmit}
      method='post'
    >
      <Form.Group>
        <Form.Label>Title</Form.Label>
        <Form.Control 
          type='text'
          name='title'
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Description</Form.Label>
        <Form.Control 
          as='textarea'
          name='description'
          rows={3}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Start</Form.Label>
        <Form.Control 
          type='date'
          name='start'
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Start</Form.Label>
        <Form.Control 
          type='date'
          name='end'
        />
      </Form.Group>
      <Button
        type='submit'
      >
      	Create
      </Button>
    </Form>
  );
}

const mapStateToProps = (state) => ({
  errors: state.errors || {}
});

export default connect(mapStateToProps)(EventForm);