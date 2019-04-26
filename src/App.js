import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import {Container} from 'semantic-ui-react'
import './App.css';

import MoviesContainer from './Containers/MoviesContainer';
import SignUp from './Components/SignUp';
import Login from './Components/Login';
import Zips from './Components/Zips';
import SelectedMovie from './Components/SelectedMovie';
import Logo from './Components/Logo';
import { getUser } from './Redux/Actions/userAction';
import {
  getNowPlaying,
  getNowPlayingTwo,
  getBackendMovies,
  getNowPlayingThree,
} from './Redux/Actions/movieAction';


class App extends Component {

componentDidMount() {
  let {getNowPlaying, getNowPlayingTwo, getNowPlayingThree, getBackendMovies } = this.props;
  let token = localStorage.token;
    !!token ? this.props.getUser(token) : this.props.history.push("/login");
    getBackendMovies();
    getNowPlaying();
    getNowPlayingTwo();
    getNowPlayingThree();
  }

  render() {
    return (
      <Container textAlign='center'>
        <Logo/>
        <Switch>
          <Route path="/signup" render={() => <SignUp />}/>
          <Route path="/login" render={() => <Login/>}/>
          <Route path="/zips" render={() => <Zips/>}/>
          <Route path="/movies/:name" render={() => <SelectedMovie/>}/>
          <Route path="/movies" render={() => <MoviesContainer/>}/>
          <Route path="/" render={() => <SignUp/>}/>
        </Switch>
      </Container>
    );
  }
}

export default connect(null, { getUser, getBackendMovies, getNowPlaying, getNowPlayingTwo, getNowPlayingThree })(withRouter(App));