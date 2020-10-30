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
  }) => {
  let history = useHistory();

  const handleFormSubmit = (e) => {
  	e.preventDefault(e);
    const startTimeString = e.target.startDate.value + ' ' + e.target.startTime.value + ':00';
    const endTimeString = e.target.endDate.value + ' ' + e.target.endTime.value + ':00';
    const title = e.target.title.value;
    const description = e.target.description.value;
    
    if (update) {
      if (event) {
        axios.put(`/events/${event._id}`)
        .then((res) => {
          if (errors = res.data.errors) {
            dispatch(getErrors(errors))
          } else {
            const updatedEvent = res.data.event;
            updatedEvent.start = new Date(updatedEvent.start);
            updatedEvent.end = new Date(updatedEvent.end);
            dispatch(loadEvent(updatedEvent));
            history.push('/event');
          }
        })
        .catch((err) => {
          console.log(err);
        })
      } else {
        dispatch(getErrors({0: { msg: 'no event loaded' }}));
      }
    } else {
      axios.post('/events/create', {
        title,
        description,
        start: startTimeString,
        end: endTimeString,
      })
      .then((res) => {
        if (errors = res.data.errors) {
          dispatch(getErrors(errors))
        } else {
          const createdEvent = res.data.event;
          createdEvent.start = new Date(createdEvent.start);
          createdEvent.end = new Date(createdEvent.end);
          dispatch(loadEvent(createdEvent));
          history.push('/event');
        }
      })
      .catch((err) => {
        console.log(err);
      })
    }
  }

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
          defaultValue={event && update ? event.start.toLocaleString([], { hour: '2-digit', minute: '2-digit' }).substr(0,5) : '12:00'}
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
          defaultValue={event && update ? event.end.toLocaleString([], { hour: '2-digit', minute: '2-digit' }).substr(0,5) : '12:00'}
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

const mapStateToProps = (state) => ({
  errors: state.errors || {},
  event: state.event || null,
});

export default connect(mapStateToProps)(EventForm);