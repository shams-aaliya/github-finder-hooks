import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import './App.css';
import Navbar from './components/layout/Navbar.jsx';
import Home from './components/pages/Home'
import NotFound from './components/pages/NotFound';
import About from './components/pages/About'
import Alert from './components/layout/Alert'
import User from './components/users/User';


import AlertState from './context/alert/AlertState'
import GithubState from './context/github/GithubState'

const App = () => {

return (
  <GithubState>
  <AlertState>
  <Router>
  <div className="App">
  <Navbar />
  <div className="container">
  <Alert/>
      <Switch>
      <Route exact path='/' component={Home}/>
        <Route exact path='/about' component={About}/>
        <Route exact path='/user/:login' component={User} />
        <Route component={NotFound}/>
        </Switch>
      </div>
      </div>
      </Router>
      </AlertState>
      </GithubState>
    );
  }

export default App;