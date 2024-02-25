// MainPage.js

import React from 'react';
import { Link } from 'react-router-dom';
import './MainPage.css';
import Header from '../header/Header';

const MainPage = () => {
  return (
    <div>
      <Header />
    <div className="container">
      <h3 className='motto'>Find your lost items at UIUC!</h3>  

      <Link to="/lost/">
        <button className="navigation-button">Lost something?</button>
      </Link>

      <Link to="/found/">
        <button className="navigation-button">Found Something?</button>
      </Link>
      
    </div>
    </div>
  );
};

export default MainPage;
