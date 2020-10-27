import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { loadEvent } from '../actions/event';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

const localizer = momentLocalizer(moment);

const MyCalendar = ({ event, dispatch }) => {
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
