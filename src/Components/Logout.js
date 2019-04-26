import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {login, logoutUser} from '../Redux/Actions/userAction';

const Logout = (props) => {

  const clickHandler = () => {
    console.log("in clickHandler")
    localStorage.removeItem('token');
    console.log(props.logoutUser())
    console.log("after the dispatch")
  };

  return(
      <Link to='/login' onClick={clickHandler}>Logout</Link>
  )
};


export default withRouter(connect(null, { login, logoutUser } )(Logout));