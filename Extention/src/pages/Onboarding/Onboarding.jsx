import React from 'react';
import './Onboarding.css';
import { Routes, Route, Outlet, useLocation } from 'react-router-dom';
import GreetingPage from './routes/GreetingPage';
import Authenticate from './routes/Authenticate';
function Onboarding() {
  return (
    <>
      <Routes>
        <Route>
          <Route path="/greeting" element={<GreetingPage />} />
          <Route path="/authenticate" element={<Authenticate />} />
        </Route>
      </Routes>
    </>
  );
}

export default Onboarding;
