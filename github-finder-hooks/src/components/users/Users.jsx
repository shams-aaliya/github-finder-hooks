import React, {useContext} from 'react';
import Useritem from './Useritem';
import Spinner from '../layout/Spinner/Spinner';
import GithubContext from '../../context/github/githubContext';

const Users = () => {
    const githubContext = useContext(GithubContext);
    const {users,loading} = githubContext;

    if (loading){
    return <Spinner />
    }
    else{
        return (
            <div style={UserStyle}>
               { users.map(user => (
                <Useritem key={user.id} user={user}/>
                ))}
            </div>
        );}
};

const UserStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridGap: '1rem'
}

export default Users; 