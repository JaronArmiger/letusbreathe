import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { loadEvent } from '../../actions/event';
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
        const withDate = results.data.map((event) => {
          /*
          const startDate = new Date(event.start);
          const endDate = new Date(event.end);
          const timeDiff = startDate.getTimezoneOffset / 60;
          startDate.setHours(startDate.getHours() + 5);
          endDate.setHours(endDate.getHours() + 5);
          event.start = startDate;
          event.end = endDate;
          */
          return event;
        });
        setEvents(withDate);
      })
      .catch((err) => console.log(err));
  }, []);
/*
  useEffect(() => {
    console.log(events);
  }, [events])
*/
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
