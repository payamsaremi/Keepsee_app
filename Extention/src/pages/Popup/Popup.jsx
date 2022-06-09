import React from 'react';
import logo from '../../assets/img/icon-128.png';
import './Popup.css';

const Popup = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>Welcome to Keepsee.</h2>
        <p>Your knowledge space.</p>
        <a
          className="App-link"
          href="https://keepsee.joinx.me"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn more.
        </a>
      </header>
    </div>
  );
};

export default Popup;
