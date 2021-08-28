import React, {Component, Fragment} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import './App.css';
import Navbar from './components/layout/Navbar.jsx';
import About from './components/pages/About'
import Alert from './components/layout/Alert'
import Search from './components/users/Search';
import Users from './components/users/Users.jsx';
import User from './components/users/User';
import axios from 'axios'; 

class App extends Component {
state = {
  users: [],
  user:{},
  repos:[],
  loading: false,
  alert: null
}
// Search and get users from github
searchUsers = async text => {
  this.setState({loading: true});
  const res = await axios.get(`https://api.github.com/search/users?q=${text}&
  client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&
  client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
  this.setState({users: res.data.items, loading: false})
}

// Get a single user
getUser = async username => {
  this.setState({loading: true});
  const res = await axios.get(`https://api.github.com/users/${username}?
  client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&
  client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
  this.setState({user: res.data, loading: false})

}
// Get User Repos
getUserRepos = async username => {
  this.setState({loading: true});
  const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=6&sort=created:asc&
  client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&
  client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
  this.setState({repos: res.data, loading: false})

}
//  Clear User from State
clearUsers = () => this.setState({users:[], loading:false})

// Set Alert
setAlert = (msg,type) => {
this.setState({alert:{msg,type}})
setTimeout(() => {this.setState({alert:null})},5000)
}

  render(){
    const {repos, loading, users, user} = this.state

  return (
    <Router>
      <div className="App">
      <Navbar />
      <div className="container">
      <Alert alert={this.state.alert}/>
      <Switch>
      <Route exact path='/' render={props => (
        <Fragment>
        <Search searchUsers={this.searchUsers} clearUsers={this.clearUsers}
        showClear={users.length>0 ? true : false}
        setAlert={this.setAlert}/>
        <Users loading={loading} users={users}/>
        </Fragment>
        )}/>
        <Route exact path='/about' component={About}/>
        <Route exact path='/user/:login' 
        render=
        {props => (<User {...props} 
          getUser={this.getUser}
          getUserRepos={this.getUserRepos}
          repos={repos} 
          loading={loading} 
          user={user}/>)} />
      </Switch>
      </div>
      </div>
      </Router>
    );
  }
}

export default App;