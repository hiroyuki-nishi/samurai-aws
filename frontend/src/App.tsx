import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Login } from './login/Login';
import './App.css';
import {Home} from "./home/Home";


const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;