import React from 'react';
import './App.css';
import HomePage from './components/HomePage';
import LogInPage from './components/LogIn/LogInPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
 
    <Router>
    <div className="App-header">
    <Routes>
      <Route path="/"  Component={LogInPage } />
      <Route path="/home" Component={HomePage } />
    </Routes>
    </div>
  </Router>
    // <div className='App-header'>
    //   {/* <HomePage /> */}
    //   <LogInPage />
    // </div>
  );
}

export default App;
