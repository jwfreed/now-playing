import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '../Redux/Actions/userAction';
import { Link, withRouter } from 'react-router-dom';
import { Container, Form, Divider, Button, Segment } from 'semantic-ui-react';
import '../App.css'

class Login extends Component {
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
    this.props.login(this.state);
    this.setState({
      username: "",
      password: ""
    });
    this.props.history.push('/zips')
  };
  
  render() {
    let { username, password } = this.state;
    return (
        <Container id='log'>
         <Segment textAlign='center' id='form'>
           <h1>Login</h1>
              <Form onSubmit={this.submitHandler} textAlign='center'>
                 <Form.Input label='Username' icon='user' iconPosition='left' type="text" placeholder="username" value={username} name="username" onChange={this.changeHandler}/>
                 <Form.Input label='Password' icon='lock' iconPosition='left' type="password" placeholder="password" value={password} name="password" onChange={this.changeHandler}/>
                 <Form.Button color='green' content="Login"/>
                 <Divider horizontal>Or</Divider>
                 <Button color='purple' size='small'><Link to={'/signup'}>Sign Up</Link></Button>
              </Form>
          </Segment>
        </Container>
    )
  }
}

const mapState = (state) => {
  return{
    user: state.user
  }
};

export default withRouter(connect(mapState, {login})(Login));