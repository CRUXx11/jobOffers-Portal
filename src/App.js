import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import JobCard from './components/jobs/jobCard';
import MainComponent from './components/main/main';


function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" exact element={<MainComponent />} />
          <Route path="/job" element={<JobCard/>} />
        </Routes>
      </Router>

  );
}

export default App;
