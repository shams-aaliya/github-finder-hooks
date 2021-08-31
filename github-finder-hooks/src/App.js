import React,{Fragment} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import './App.css';
import Navbar from './components/layout/Navbar.jsx';
import About from './components/pages/About'
import Alert from './components/layout/Alert'
import Search from './components/users/Search';
import Users from './components/users/Users.jsx';
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
      <Route exact path='/' render={props => (
        <Fragment>
        <Search/>
        <Users />
        </Fragment>
        )}/>
        <Route exact path='/about' component={About}/>
        <Route exact path='/user/:login' 
        component={User} />
        </Switch>
      </div>
      </div>
      </Router>
      </AlertState>
      </GithubState>
    );
  }

export default App;