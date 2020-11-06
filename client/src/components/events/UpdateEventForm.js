import React from 'react';
import EventForm from './EventForm';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { getErrors } from '../../actions/errors';
import { loadEvent } from '../../actions/event';

const UpdateEventForm = ({ 
  errors,
  dispatch,
  event, 
}) => {
  let history = useHistory();

  const deleteOldPhoto = (photoId) => {
    return new Promise((resolve, reject) => {
      axios.delete(`/bucket/delete_file/${photoId}`)
        .then((response) => {
          if (response.data.error) {
            reject(response.data.error);
          }
          resolve(true);
        })
        .catch((err) => reject(err));
    })
  }

  const updatePhoto = (photo) => {
    console.log('updatePhoto');
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append('photo', photo);
      axios.post('/bucket/post_file', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      }).then((response) => resolve(response.data.photoId))
        .catch((err) => {
          err.response && reject(err.response.data);
        })
    })
  }

  const updateEvent = (eventObj) => {
    axios.put(`/events/${event._id}`, eventObj)
      .then((response) => {
        if (errors = response.data.errors) {
          dispatch(getErrors(errors));
        } else {
          const updatedEvent = response.data.event;
          console.log(updatedEvent);
          dispatch(loadEvent(updatedEvent));
          history.push('/event');
        }
      })
  }
  
  const handleFormSubmit = async (e) => {
  	e.preventDefault(e);
    const photo = e.target.photo.files[0];
    const startTimeString = e.target.startDate.value + ' ' + e.target.startTime.value + ':00';
    const endTimeString = e.target.endDate.value + ' ' + e.target.endTime.value + ':00';
    const title = e.target.title.value;
    const description = e.target.description.value;
    
    try {
        if (photo) {
          const photoId = await updatePhoto(photo);
          if (event.photo) await deleteOldPhoto(event.photo.toString());
          updateEvent({
            title,
            description,
            start: startTimeString,
            end: endTimeString,
            photo: photoId,
          });
        } else {
          updateEvent({
            title,
            description,
            start: startTimeString,
            end: endTimeString,
            photo: event.photo.toString(),
          });
        }
      } catch (err) {
        err.response && dispatch(getErrors(err.response.data));
      }
  }

  return (
    <React.Fragment>
    {event ? 
      <EventForm 
        update={true}
        event={event}
        errors={errors}
        handleFormSubmit={handleFormSubmit}
        photoURL={event.photo ? event.photo.toString() : ''}
      /> : 
      <h1>No event found</h1>
    }
    </React.Fragment>
  );

}

const mapStateToProps = (state) => ({
  errors: state.errors || {},
  event: state.event || null,
});

export default connect(mapStateToProps)(UpdateEventForm);