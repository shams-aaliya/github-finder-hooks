import React from 'react';
import PropTypes from 'prop-types'
import Useritem from './Useritem';
import Spinner from '../layout/Spinner/Spinner'

const Users = ({users, loading}) => {
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
Users.propTypes = {
    users: PropTypes.array.isRequired, 
    loading: PropTypes.bool.isRequired
}

export default Users; 