import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import HomePage from './components/HomePage';
import ExercisePage from './components/ExercisePage';
import ProfilePage from './components/ProfilePage';
import WeeklyStatsPage from './components/WeeklyStatsPage';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import NavBar from './components/NavBar';
import Footer from './components/Footer';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the user is already logged in
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    // Clear the token from localStorage
    localStorage.removeItem('token');
  };

  return (
    <Router>
      <NavBar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route path="/exercise">
          {isLoggedIn ? <ExercisePage /> : <LoginPage onLogin={handleLogin} />}
        </Route>
        <Route path="/profile">
          {isLoggedIn ? <ProfilePage /> : <LoginPage onLogin={handleLogin} />}
        </Route>
        <Route path="/weeklystats">
          {isLoggedIn ? <WeeklyStatsPage /> : <LoginPage onLogin={handleLogin} />}
        </Route>
        <Route path="/login">
          <LoginPage onLogin={handleLogin} />
        </Route>
        <Route path="/signup">
          <SignupPage onLogin={handleLogin} />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
};

export default App;
