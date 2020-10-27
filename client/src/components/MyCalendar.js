import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

const localizer = momentLocalizer(moment);

const MyCalendar = (props) => {
  const events = [
    {
      title: 'damn',
      start: new Date(),
      end: new Date(),
      allDay: false,
    }
  ];
  return (<Calendar 
      localizer={localizer}
      events={events}
      startAccessor='start'
      endAccessor='end'
      style={{ height: 500 }}
    />);
};

export default MyCalendar;
