import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>  
      <Route path='/*' element={<App />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
//deprecated Api
//managing routing
//This component is a container for all the Route components and manages the navigation between them.
     