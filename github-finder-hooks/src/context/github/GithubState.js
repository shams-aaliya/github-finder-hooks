import React,{useReducer} from 'react';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';
import axios from 'axios';
import {
SEARCH_USERS,
SET_ALERT,
SET_LOADING,
GET_REPOS,
GET_USER
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
        })

      }
      
    
    // Get User

    // Get Repos

    // Clear Users

    // Set Loading

      const setLoading = () => dispatch({type: SET_LOADING});

    return <GithubReducer.Provider
    value={{
        
        users:state.users,
        user:state.user,
        repos:state.repos,
        loading:state.loading,
        searchUsers
    }}>
    {props.children}
</GithubReducer.Provider>
};

export default GithubContext;