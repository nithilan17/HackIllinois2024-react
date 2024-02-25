// MainPage.js

import React from 'react';
import { Link } from 'react-router-dom';
import './MainPage.css';

const MainPage = () => {
  return (
    <div className="container">
      <h1>Main Page</h1>
      <p>Welcome to the main page!</p>

      <Link to="/lost">
        <button className="navigation-button">Go to Lost Page</button>
      </Link>

      <Link to="/found">
        <button className="navigation-button">Go to Found Page</button>
      </Link>
    </div>
  );
};

export default MainPage;
