import React from 'react';
import EventForm from './EventForm';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getErrors } from '../../actions/errors';
import { loadEvent } from '../../actions/event';
import axios from 'axios';

const CreateEventForm = ({
  errors,
  dispatch,
}) => {
  let history = useHistory();

  const createPhoto = (photo) => {
    const formData = new FormData();
    formData.append('photo', photo);
    axios.post('/bucket/post_file', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    }).then((response) => response.data.photoId)
      .catch((err) => {
        err.response && dispatch(getErrors(err.response.data));
      })
  }

  const createEvent = (eventObj) => {
    axios.post('/events/create', eventObj)
      .then((response) => {
        if (errors = response.data.errors) {
          dispatch(getErrors(errors));
        } else {
          const createdEvent = response.data.event;
          dispatch(loadEvent(createdEvent));
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
          const photoId = await createPhoto(photo);
          createEvent({
            title,
            description,
            start: startTimeString,
            end: endTimeString,
            photo: photoId,
          });
        } else {
          createEvent({
            title,
            description,
            start: startTimeString,
            end: endTimeString,
          });
        }
      } catch (err) {
      	err.response && dispatch(getErrors(err.response.data));
      }
    }

  return (
    <EventForm 
      update={false}
      errors={errors}
      handleFormSubmit={handleFormSubmit}
      photoURL={''}
    />
  );
}

const mapStateToProps = (state) => ({
  errors: state.errors || {},
  event: state.event || null,
});

export default connect(mapStateToProps)(CreateEventForm);