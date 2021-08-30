import React, {useState,useContext} from 'react';
import GithubContext from '../../context/github/githubContext';
import PropTypes from 'prop-types';


const Search = ({setAlert}) => {
const [text,setText] = useState('');
const githubContext = useContext(GithubContext);
const {clearUsers} = githubContext;


const onChange = (e) => {
  setText(e.target.value)
}

const onSubmit = (e) => {
  e.preventDefault();
  if (text===''){
    setAlert('Please Enter Something', 'light')
  }else{
    githubContext.searchUsers(text);
    setText('');
  }
    
}
    return (
      <div>
        <form className='form' onSubmit={onSubmit}>
        <input 
        type="text" 
        name="text" 
        placeholder='Search Users...'
        value={text} 
        onChange={onChange}/>
        <input 
        type="submit" 
        value="Search" 
        className='btn btn-block btn-dark' />
        </form>
        {
        githubContext.users.length > 0 && (
          <button className="btn btn-block btn-light" onClick={clearUsers}>
          Clear Users
          </button>)
        }
      </div>
    )
  }

Search.propTypes = {
  setAlert: PropTypes.func.isRequired
}

export default Search