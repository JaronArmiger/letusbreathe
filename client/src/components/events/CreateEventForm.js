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

  const handleFormSubmit = async (e) => {
  	e.preventDefault(e);
    const photo = e.target.photo.files[0];
    const startTimeString = e.target.startDate.value + ' ' + e.target.startTime.value + ':00';
    const endTimeString = e.target.endDate.value + ' ' + e.target.endTime.value + ':00';
    const title = e.target.title.value;
    const description = e.target.description.value;

    if (photo) {
      try {
        const formData = new FormData();
        formData.append('photo', photo);
        const photoResponse = await axios.post('/bucket/post_file', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        });
        const photoId = photoResponse.data.photoId;

        const eventResponse = await axios.post('/events/create', {
          title,
          description,
          start: startTimeString,
          end: endTimeString,
          photo: photoId,
        });
        if (errors = eventResponse.data.errors) {
          dispatch(getErrors(errors));
        } else {
          const createdEvent = eventResponse.data.event;
          dispatch(loadEvent(createdEvent));
          history.push('/event');
        }
      } catch (err) {
      	err.response && dispatch(getErrors(err.response.data));
      }
    }

  }

  return (
    <EventForm 
      update={false}
      errors={errors}
      handleFormSubmit={handleFormSubmit}
    />
  );
}

const mapStateToProps = (state) => ({
  errors: state.errors || {},
  event: state.event || null,
});

export default connect(mapStateToProps)(CreateEventForm);