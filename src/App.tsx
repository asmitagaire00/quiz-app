import React from 'react';
import Quiz from './components/Quiz';
import './css/global.css';

import './App.css';
import Login from './components/Login/Login';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';

const App = () => {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/quiz" element={<Quiz />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
};

export default App;
