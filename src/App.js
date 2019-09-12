import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { Container } from 'semantic-ui-react';
import './App.css';

import MoviesContainer from './Containers/MoviesContainer';
import Zips from './Components/Zips';
import SelectedMovie from './Components/SelectedMovie';
import Logo from './Components/Logo';
import {
  getNowPlaying,
  getNowPlayingTwo,
  getNowPlayingThree
} from './Redux/Actions/movieAction';

class App extends Component {
  componentDidMount() {
    let { getNowPlaying, getNowPlayingTwo, getNowPlayingThree } = this.props;
    this.props.history.push('/zips');
    getNowPlaying();
    getNowPlayingTwo();
    getNowPlayingThree();
  }

  render() {
    return (
      <Container textAlign='center'>
        <Logo />
        <Switch>
          <Route path='/zips' render={() => <Zips />} />
          <Route path='/movies/:name' render={() => <SelectedMovie />} />
          <Route path='/movies' render={() => <MoviesContainer />} />
        </Switch>
      </Container>
    );
  }
}

export default connect(
  null,
  {  getNowPlaying, getNowPlayingTwo, getNowPlayingThree }
)(withRouter(App));