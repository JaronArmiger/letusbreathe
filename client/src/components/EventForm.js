import React from 'react';
import { connect } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { getErrors } from '../actions/errors';
import { loadEvent } from '../actions/event';
import { useHistory } from 'react-router-dom';
import DateTimePicker from 'react-datetime-picker';

const EventForm = ({ errors, dispatch }) => {
  let history = useHistory();

  const handleFormSubmit = (e) => {
  	e.preventDefault(e);
    const startTimeString = e.target.startDate.value + ' ' + e.target.startTime.value + ':00';
    const endTimeString = e.target.endDate.value + ' ' + e.target.endTime.value + ':00';

    axios.post('/events/create', {
      title: e.target.title.value,
      description: e.target.description.value,
      start: startTimeString,
      end: endTimeString,
    })
    .then((res) => {
      if (errors = res.data.errors) {
        dispatch(getErrors(errors))
      } else {
        dispatch(loadEvent(res.data.event));
        history.push('/event');
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
          name='startDate'
        />
        <input 
          type='time'
          name='startTime'
          defaultValue='12:00'
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Start</Form.Label>
        <Form.Control 
          type='date'
          name='endDate'
        />
        <input 
          type='time'
          name='endTime'
          defaultValue='12:00'
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