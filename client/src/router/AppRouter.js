import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import UploadForm from '../components/UploadForm';

const AppRouter = () => (
  <BrowserRouter>
    <div>
      <div className='main-content'>
      	<Switch>
      	  <Route component={UploadForm} path='/' exact />
      	</Switch>
      </div>
    </div>
  </BrowserRouter>
);

export default AppRouter;