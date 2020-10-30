import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { loadEvent } from '../../actions/event';

const Event = ({ event, dispatch }) => {
  let history = useHistory();
  
  const [errMsg, setErrMsg] = useState(null);

  const handleEdit = (e) => {
    history.push('/update_event');
  }

  const handleDelete = (e) => {
    axios.delete(`/events/${event._id}`)
      .then((res) => {
        if (res.data.success === true) {
          history.push('calendar');
        } else {
          setErrMsg(res.data.error);
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }
  
  let eventInfo;

  if (event) {
    const startDate = new Date(event.start);
    const endDate = new Date(event.end);

    eventInfo = (
        <div>
          {errMsg && <p>{errMsg}</p>}
          <h1>Title: {event.title}</h1>
          <p><b>Start Date: </b>{startDate.toLocaleDateString()}</p>
          <p><b>Start Time: </b>{startDate.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}</p>
          <p><b>End Date: </b>{endDate.toLocaleDateString()}</p>
          <p><b>End Time: </b>{endDate.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}</p>
          <p><b>Description: </b>{event.description}</p>
          <Button
            type='submit'
            onClick={handleEdit}
          >
            Edit  
          </Button>
          <Button
            type='submit'
            onClick={handleDelete}
          >
            Delete  
          </Button>
        </div>
    );
  } else {
    eventInfo = (
      <h1>no event found</h1>
    );
  }

  return (
    <div>
      {eventInfo}
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