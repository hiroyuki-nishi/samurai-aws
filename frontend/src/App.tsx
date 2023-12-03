import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { AuthenticateRoute } from './common/router/PrivateRoute';

import { Login } from './login/Login';
import './App.css';
import { Device } from './device/Device';
import { NotFound } from './error/NotFound';
// import { Header } from './header/Header';


const App: React.FC = () => {
  return (
    <BrowserRouter>
      {/* <Header visible={true} /> */}
      <Switch>
        <Route exact path="/">
          <div className="main">
            <Login />
          </div>
        </Route>
        <AuthenticateRoute path="/device" children={<Device />} />
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;