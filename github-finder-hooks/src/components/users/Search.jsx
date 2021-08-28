import PropTypes from 'prop-types';
import React, {useState} from 'react';


const Search = ({searchUsers,clearUsers,showClear,setAlert}) => {
const [text,setText] = useState('');


const onChange = (e) => {
  setText(e.target.value)
}

const onSubmit = (e) => {
  e.preventDefault();
  if (text===''){
    setAlert('Please Enter Something', 'light')
  }else{
    searchUsers(text);
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
        showClear && (
          <button className="btn btn-block btn-light" onClick={clearUsers}>
          Clear Users
          </button>)
        }
      </div>
    )
  }

Search.propTypes = {
  clearUsers: PropTypes.func.isRequired,
  showClear: PropTypes.bool.isRequired,
  setAlert: PropTypes.func.isRequired
}

export default Search