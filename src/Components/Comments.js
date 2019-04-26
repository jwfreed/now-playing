import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Comment } from 'semantic-ui-react';

class Comments extends Component {


render() {
  console.log('Comments', this.props)
  return(
        <Comment>
        <Comment.Content>
          <Comment.Author>{this.props.comment.user.username}</Comment.Author>
            <Comment.Text>
              <p>
                {this.props.comment.comment}
              </p>
            </Comment.Text>
        </Comment.Content>
        </Comment>
    )
  }
}

const mapState = (state) => {
  return {
    user: state.userData.user
  }
};

export default connect(mapState)(Comments);