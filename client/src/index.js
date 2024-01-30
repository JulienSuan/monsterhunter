import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Home from './pages/Home/Home';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import UserProvider from './contexts/UserProvider';
import HomePage from './pages/HomePage/HomePage';
import ProfilPage from './pages/ProfilPage/ProfilPage';


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <UserProvider>

<BrowserRouter>
    <Routes>
      <Route path='/' element={<Home />} ></Route>
      <Route path='/ProfilPage' element={<ProfilPage />} ></Route>
      <Route path='/HomePage' element={<HomePage />} ></Route>
    </Routes>
</BrowserRouter>
  </UserProvider>

);


reportWebVitals();
