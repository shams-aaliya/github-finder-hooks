import React, {useState, Fragment} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import './App.css';
import Navbar from './components/layout/Navbar.jsx';
import About from './components/pages/About'
import Alert from './components/layout/Alert'
import Search from './components/users/Search';
import Users from './components/users/Users.jsx';
import User from './components/users/User';
import axios from 'axios'; 

import GithubState from './context/github/GithubState'

const App = () => {

const [users,setUsers] = useState([]);
const [user,setUser] = useState({});
const [repos,setRepos] = useState([]);
const [loading,setLoading] = useState(false);
const [alert,setAlert] = useState(null);

// Search and get users from github

// Get a single user
const getUser = async username => {
  setLoading(true);
  const res = await axios.get(`https://api.github.com/users/${username}?
  client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&
  client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
  setLoading(false);
  setUser(res.data);
}
// Get User Repos
const getUserRepos = async username => {
  setLoading(true);
  const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=6&sort=created:asc&
  client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&
  client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
  setRepos(res.data);
  setLoading(false);
}

//  Clear User from State
const clearUsers = () => {
  setUsers([]);
  setLoading(false);
}

// Set Alert
const showAlert = (msg,type) => {
setAlert({msg,type});
setTimeout(() => setAlert(null),5000)
}

return (
  <GithubState>
    <Router>
      <div className="App">
      <Navbar />
      <div className="container">
      <Alert alert={alert}/>
      <Switch>
      <Route exact path='/' render={props => (
        <Fragment>
        <Search clearUsers={clearUsers}
        showClear={users.length>0 ? true : false}
        setAlert={showAlert}/>
        <Users loading={loading} users={users}/>
        </Fragment>
        )}/>
        <Route exact path='/about' component={About}/>
        <Route exact path='/user/:login' 
        render=
        {props => (<User {...props} 
          getUser={getUser}
          getUserRepos={getUserRepos}
          repos={repos} 
          loading={loading} 
          user={user}/>)} />
      </Switch>
      </div>
      </div>
      </Router>
      </GithubState>
    );
  }

export default App;