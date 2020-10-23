import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import UploadForm from '../components/UploadForm';
import Gallery from '../components/Gallery';

const AppRouter = () => (
  <BrowserRouter>
    <div>
      <div className='main-content'>
      	<Switch>
      	  <Route component={UploadForm} path='/' exact />
      	  <Route component={Gallery} path='/gallery'/>
      	</Switch>
      </div>
    </div>
  </BrowserRouter>
);

export default AppRouter;