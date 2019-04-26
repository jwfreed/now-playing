import React, { Component } from 'react';
import { Header } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import Logout from './Logout';

class Logo extends Component {

  render(){
    console.log('yo', this.props.user);
    return(

          <Header id='logo'>
            NowPlaying
            {/*{ !this.props.user === undefined ? <Logout floated='right'/> : null}*/}
          </Header>

    )
  }
}

const mapState = (state) => {
  return{
    user: state.userData.user
  }
};

export default withRouter(connect(mapState)(Logo))