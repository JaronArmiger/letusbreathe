import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

const Event = ({ event }) => {

  return (
    <div>
      {event ? (
        <h1>Title: {event.title}</h1>
      ) : (
        <h1>no event selected</h1>
      )}
      <NavLink to='/calendar' className='link'>
        Back to Calendar
      </NavLink>
    </div>
  );
}

const mapStateToProps = (state) => ({
  event: state.event || null
})

export default connect(mapStateToProps)(Event);