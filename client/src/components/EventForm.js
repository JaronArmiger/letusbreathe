import React from 'react';
import { connect } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { getErrors } from '../actions/errors';
import { useHistory } from 'react-router-dom';

const EventForm = ({ errors, dispatch }) => {
  let history = useHistory();

  const handleFormSubmit = (e) => {
  	e.preventDefault(e);
    axios.post('/events/create', {
      title: e.target.title.value,
      description: e.target.description.value,
      start: e.target.start.value,
      end: e.target.end.value,
    })
    .then((res) => {
      if (errors = res.data.errors) {
        dispatch(getErrors(errors))
      } else {
        history.push('/calendar');
      }
    })
    .catch((err) => {
      console.log(err);
    })
  }

  return (
    <React.Fragment>
    <div>
      {(errors.length > 0) && (
        <h3>Errors:</h3>
      )}
      {(errors.length > 0) && (
          errors.map((err, i) => {
            return <p key={i}>{err.msg}</p>
          })
        )
      }
    </div>
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
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
  errors: state.errors || {}
});

export default connect(mapStateToProps)(EventForm);