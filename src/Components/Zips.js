import React, { Component } from 'react';
import { connect } from 'react-redux';
import { zipMovies } from '../Redux/Actions/movieAction';
import { withRouter } from 'react-router-dom';
import { Form, Segment } from 'semantic-ui-react';
import '../App.css';

class Zips extends Component {
  state = {
    zip: '',
    radius: ''
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    let newZip = this.state.zip;
    let newRadius = this.state.radius;
    this.props.zipMovies(newZip, newRadius);
    this.props.history.push('/movies');
  };

  render() {
    let { zip, radius } = this.state;
    return (
      <Segment textAlign='center' id='form'>
        <h1>Find Movies:</h1>
        <Form onSubmit={this.handleSubmit}>
          <Form.Input
            label='Enter Zip Code'
            type='text'
            placeholder='zip code  -  ex: 11231'
            name='zip'
            value={zip}
            onChange={this.handleChange}
          />
          <Form.Input
            label='Enter Radius (miles)'
            type='text'
            placeholder='radius  -  ex: 2'
            name='radius'
            value={radius}
            onChange={this.handleChange}
          />
          <Form.Button content='submit' color='purple' />
        </Form>
      </Segment>
    );
  }
}

export default withRouter(
  connect(
    null,
    { zipMovies }
  )(Zips)
);
