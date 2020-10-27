import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { useHistory } from 'react-router-dom';

const localizer = momentLocalizer(moment);

const MyCalendar = (props) => {
  let history = useHistory();

  const events = [
    {
      title: 'damn',
      start: new Date(),
      end: new Date(),
      allDay: false,
    }
  ];

  const onEventClick = (e) => {
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

export default MyCalendar;
