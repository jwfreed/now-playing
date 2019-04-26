import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createUser } from '../Redux/Actions/userAction';
import { Form, Divider, Button, Segment} from 'semantic-ui-react';
import '../App.css';
import { withRouter, Link } from 'react-router-dom'

class SignUp extends Component {
  state = {
    username: "",
    password: ""
  };

  changeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  };

  submitHandler = e => {
    e.preventDefault();
    let newUser = this.state;
    this.props.createUser(newUser);
    this.props.history.push('/zips');
  };

  render() {
    let { username, password } = this.state;
    return (
        <div id='log'>
          <Segment textAlign='center' id='form'>
            <h1>Sign Up</h1>
            <Form onSubmit={this.submitHandler} textAlign='center'>
              <Form.Input label='Username' icon='user' iconPosition='left' type="text" placeholder="username" value={username} name="username" onChange={this.changeHandler}/>
              <Form.Input label='Password' icon='lock' iconPosition='left' type="password" placeholder="password" value={password} name="password" onChange={this.changeHandler}/>
              <Form.Button color='purple' content="Sign Up"/>
              <Divider horizontal>Or</Divider>
              <Button color='green' size='small'><Link to={'/login'}>Login</Link></Button>
            </Form>
          </Segment>
        </div>
    )
  }
}

// const mapState = (state) => {
//   console.log(state);
//   return {
//     user: state.user
//   }
// };

// const mapDispatch = (dispatch) => {
//   return {
//     createUser: (newUserObject) => dispatch({type: 'ADD_USER', payload: newUserObject})
//   }
// }

export default connect(null, {createUser})(withRouter(SignUp));