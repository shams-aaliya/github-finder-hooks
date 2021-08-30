import React, { useContext,useEffect, Fragment } from 'react';
import Spinner from '../layout/Spinner/Spinner'
import Repos from '../repos/Repos'
import { Link } from 'react-router-dom';
import GithubContext from '../../context/github/githubContext';

const User = ({match,loading}) =>  {

    const githubContext = useContext(GithubContext);
    const {user,getUser,getUserRepos} = githubContext;

useEffect(() => {

    getUser(match.params.login) 
    getUserRepos(match.params.login) 
    // eslint-disable-next-line 
}, []);

const {name,
            login,
            avatar_url,
            bio,
            blog,
            company,
            location,
            html_url,
            followers,
            following,
            public_repos,
            public_gists,
            hireable
            } = user;
        
        if (loading) return <Spinner />
        return (
            <Fragment>
            <Link to='/' className='btn  btn-light'>Back to Homepage</Link>
            Hireable: {''}
            {hireable ? <i className='fas fa-check text-success'/> : <i className='fas fa-times-circle text-danger' />}
            <div className="card grid-2">
            <div className="all-center">
                <img src={avatar_url}
                 alt="Profile Avatar"
                 className='round-img'
                 style={{width:'150px'}}  />
                 <h1>{name}</h1>
                 <p>Location: {location}</p>
            </div>
            <div>
            { bio && <Fragment>
                <h3>BIO:</h3>
                <p>{bio}</p>
                </Fragment>}

                <a href={html_url} className='btn btn-dark my-1'>Visit Github Profile </a>
                <ul>  <li>
                { login && <Fragment>
                    <strong>Login: {login}</strong>
                    </Fragment>

                }</li>
                <li>
                { company && <Fragment>
                    <strong>Company: {company}</strong>
                    </Fragment>}
                    </li>
                    <li>
                { blog && <Fragment>
                    <strong>Website: {blog}</strong>
                    </Fragment>

                }</li>
                    </ul>
            </div>
            </div>
            <div className="card text-center">
            <div className="badge badge-primary">Followers: {followers}</div>
            <div className="badge badge-light">Following: {following}</div>
            <div className="badge badge-success">Public-Repos: {public_repos}</div>
            <div className="badge badge-dark">Public Gists: {public_gists}</div>

            </div>
            <Repos />
            </Fragment>
        )
    }

export default User
