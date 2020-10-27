import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

const Event = () => {
  return (
    <div>
      <h1>
      	Event
      </h1>
      <NavLink to='/calendar' className='link'>
        Back to Calendar
      </NavLink>
    </div>
  );
}

export default Event;