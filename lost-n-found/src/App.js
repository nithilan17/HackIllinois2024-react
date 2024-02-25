import React from 'react';
// import db from ./firebase;
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './components/main-page/MainPage'
import LostPage from './components/lost-page/LostPage'
import FoundPage from './components/found-page/FoundPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/lost/" element={<LostPage />} />
        <Route path="/found/" element={<FoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
