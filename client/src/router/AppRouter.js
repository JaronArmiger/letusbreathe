import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from '../components/Header';
import UploadForm from '../components/photos/UploadForm';
import Gallery from '../components/photos/Gallery';
import MyCalendar from '../components/events/MyCalendar';
import Event from '../components/events/Event';
import CreateEventForm from '../components/events/CreateEventForm';
import UpdateEventForm from '../components/events/UpdateEventForm';

const AppRouter = () => (
  <BrowserRouter>
    <div>
      <Header />
      <div className='main-content'>
      	<Switch>
      	  <Route component={UploadForm} path='/' exact />
      	  <Route component={Gallery} path='/gallery'/>
          <Route component={MyCalendar} path='/calendar'/>
          <Route component={Event} path='/event'/>
          <Route component={CreateEventForm} path='/create_event'/>
          <Route component={UpdateEventForm} path='/update_event'/>
      	</Switch>
      </div>
    </div>
  </BrowserRouter>
);

export default AppRouter;