import React from 'react';
import './Onboarding.css';
import { Routes, Route, Outlet, useLocation } from 'react-router-dom';
import GreetingPage from './routes/GreetingPage';
function Onboarding() {
  return (
    <>
      <Routes>
        <Route>
          <Route path="/greeting" element={<GreetingPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default Onboarding;
