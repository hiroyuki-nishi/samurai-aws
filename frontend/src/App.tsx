import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Login } from './login/Login';
import './App.css';


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
      </Switch>
    </BrowserRouter>
  );
}

export default App;