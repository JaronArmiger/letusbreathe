import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { loadEvent } from '../actions/event';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

const localizer = momentLocalizer(moment);

const MyCalendar = ({ event, dispatch }) => {
  let history = useHistory();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios
      .get('/events/')
      .then((results) => {
        setEvents(results.data)
      })
      .catch((err) => console.log(err));
  }, []);

  const onEventClick = (e) => {
    dispatch(loadEvent(e));
    history.push('/event');
  }

  return (<Calendar 
      localizer={localizer}
      events={events}
      startAccessor='start'
      endAccessor='end'
      style={{ height: 500 }}
      onSelectEvent={onEventClick}
    />);
};

const mapStateToProps = (state) => ({
  event: state.event || null
})

export default connect(mapStateToProps)(MyCalendar);
