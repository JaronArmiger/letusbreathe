import React from 'react';
import { connect } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { getErrors } from '../../actions/errors';
import { loadEvent } from '../../actions/event';
import { useHistory } from 'react-router-dom';
import DateTimePicker from 'react-datetime-picker';

const EventForm = ({ 
    errors, 
    dispatch, 
    update=false,
    event,
    handleFormSubmit,
  }) => {

  return (
    <React.Fragment>
    <div>
      {(errors) && (errors.length > 0) && (
        <h3>Errors:</h3>
      )}
      {(errors) && (errors.length > 0) && (
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
          defaultValue={event && update ? event.title : ''}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Description</Form.Label>
        <Form.Control 
          as='textarea'
          name='description'
          rows={3}
          defaultValue={event && update ? event.description : ''}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Start</Form.Label>
        <Form.Control 
          type='date'
          name='startDate'
          defaultValue={event && update ? event.start.toISOString().substr(0,10) : ''}
        />
        <input 
          type='time'
          name='startTime'
          defaultValue={event && update ? event.start.toLocaleTimeString('en-US', { timeZone: 'America/Chicago', hour12: false }).substr(0,5) : '12:00'}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>End</Form.Label>
        <Form.Control 
          type='date'
          name='endDate'
          defaultValue={event && update ? event.end.toISOString().substr(0,10) : ''}
        />
        <input 
          type='time'
          name='endTime'
          defaultValue={event && update ? event.end.toLocaleTimeString('en-US', { timeZone: 'America/Chicago', hour12: false }).substr(0,5) : '12:00'}
        />
      </Form.Group>
      <Form.Group>
          <Form.Label>Add photo</Form.Label>
          <Form.Control 
            type="file" 
            name="photo"
            accept="image/jpeg image/jpg"
            />
      </Form.Group>
      <Button
        type='submit'
      >
      	{update ? 'Update Event' : 'Create Event' }
      </Button>
    </Form>
    </React.Fragment>
  );
}
/*
const mapStateToProps = (state) => ({
  errors: state.errors || {},
  event: state.event || null,
});
*/

//export default connect(mapStateToProps)(EventForm);

export default EventForm;