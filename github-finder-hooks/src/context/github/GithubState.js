import React,{useReducer} from 'react';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';
import axios from 'axios';
import {
SEARCH_USERS,
SET_ALERT,
SET_LOADING,
GET_REPOS,
GET_USER,
CLEAR_USERS
}
 from '../type'

const GithubState = (props) => {
    const initialState = {
        users :[],
        user: {},
        repos:[],
        loading:false,
    }
    
    const [state,dispatch] = useReducer(GithubReducer,initialState);

    // Search Users
    const searchUsers = async text => {
        setLoading();
        const res = await axios.get(`https://api.github.com/search/users?q=${text}&
        client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&
        client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
       
        dispatch({
            type: SEARCH_USERS,
            payload: res.data.items
        });

      };
      
    
    // Get User
    const getUser = async username => {
        setLoading();
        const res = await axios.get(`https://api.github.com/users/${username}?
        client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&
        client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
       dispatch({
           type: GET_USER,
           payload: res.data
       })
      }

    // Get Repos
    const getUserRepos = async username => {
        setLoading();
        const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=6&sort=created:asc&
        client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&
        client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
        dispatch({
            type: GET_REPOS,
            payload: res.data
        })
      }
      

    // Clear Users

    const clearUsers = () => dispatch({type: CLEAR_USERS});

    // Set Loading

      const setLoading = () => dispatch({type: SET_LOADING});

    

    return (

        <GithubContext.Provider
        value={{
            
            users:state.users,
            user:state.user,
            repos:state.repos,
            loading:state.loading,
            searchUsers,
            clearUsers,
            getUser,
            getUserRepos
        }}>
        {props.children}
        </GithubContext.Provider>
        )
 }

export default GithubState;