import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';

const Event = ({ event }) => {
  //const [event, setEvent] = useState(null);

  return (
    <div>
      <h1>
      	Title: {event.title}
      </h1>
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