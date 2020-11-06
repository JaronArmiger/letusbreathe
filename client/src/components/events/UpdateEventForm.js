import React from 'react';
import EventForm from './EventForm';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const UpdateEventForm = ({ 
  errors,
  dispatch,
  event, 
}) => {
  console.log(event);
  let history = useHistory();
  
  const handleFormSubmit = async (e) => {
  	e.preventDefault(e);
    const photo = e.target.photo.files[0];
    const startTimeString = e.target.startDate.value + ' ' + e.target.startTime.value + ':00';
    const endTimeString = e.target.endDate.value + ' ' + e.target.endTime.value + ':00';
    const title = e.target.title.value;
    const description = e.target.description.value;
    /*
    let photoId;
    if (photo) {
      try {
        const formData = new FormData();
        formData.append('photo', photo);
        const response = await axios.post('/bucket/post_file', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        });
        photoId = response.data.photoId;
        if (event) {
          axios.put(`/events/${event._id}`, {
            title,
            description,
            start: startTimeString,
            end: endTimeString,
            photoId,
          })
          .then((res) => {
            if (errors = res.data.errors) {
              dispatch(getErrors(errors))
            } else {
              const updatedEvent = res.data.event;
              //updatedEvent.start = new Date(updatedEvent.start);
              //updatedEvent.end = new Date(updatedEvent.end);
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
      } catch (err) {
        err.response && dispatch(getErrors(err.response.data));
      }
    }
    */
  }

  return (
    <EventForm 
      update={true}
      event={event}
      errors={errors}
      handleFormSubmit={handleFormSubmit}
      photoURL={event ? event.photo.toString() : ''}
    />
  );

}

const mapStateToProps = (state) => ({
  errors: state.errors || {},
  event: state.event || null,
});

export default connect(mapStateToProps)(UpdateEventForm);