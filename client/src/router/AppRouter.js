import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from '../components/Header';
import UploadForm from '../components/UploadForm';
import Gallery from '../components/Gallery';
import MyCalendar from '../components/MyCalendar';
import Event from '../components/Event';
import EventForm from '../components/EventForm';

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
          <Route component={EventForm} path='/eventform'/>
      	</Switch>
      </div>
    </div>
  </BrowserRouter>
);

export default AppRouter;