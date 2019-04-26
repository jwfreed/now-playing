import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Header, Segment, Comment, Form, Button } from 'semantic-ui-react';
import Comments from './Comments';
import { persistComment, getAllComments } from '../Redux/Actions/commentAction';

class SelectedMovie extends Component {

  state = {
    addComment: ""
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  };

  handleSubmit = (e) => {
    e.preventDefault()
    let comment = this.state
    // console.log('persistComment', this.props.user.user.username, this.props.selectedMovie.title, comment.addComment)
    console.log(this.props)
    this.props.persistComment({username:this.props.user.user.username, title:this.props.selectedMovie.title, comment:comment.addComment}).then(r => this.props.getAllComments())
    this.setState({
      addcomment: ''
    })
  }

  // movie poster for
  // moviePosters = () => {
  //   let posterObj = {};
  //   this.props.nowPlaying.results.forEach(movie => {
  //     posterObj[movie.title] = `http://image.tmdb.org/t/p/w185/${movie.poster_path}`
  //   });
  //   return posterObj
  // };

  getMovieShowtimes = () => {
    let movieShowtimes = {};
    this.props.selectedMovie.showtimes.forEach(theatre => {
      if(movieShowtimes.hasOwnProperty([theatre.theatre.name])){
      movieShowtimes[theatre.theatre.name].push(theatre.dateTime)
      } else {
        movieShowtimes[theatre.theatre.name] = [theatre.dateTime]
      }
    });
    return movieShowtimes
  };

  render(){
    // let posters = this.moviePosters();
    let theatreShowtimes = this.getMovieShowtimes();
    let times = [];
    for(let key in theatreShowtimes){
      times.push(
          <h3>
           {key}: {theatreShowtimes[key].map(time => new Date(time).toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit'})).join(', ')}
          </h3>)
    }

    let { addComment } = this.state
    let { allComments, selectedMovie, backendMovies } = this.props

    let commentsArray = allComments.map(comment => <Comments key={comment.id} comment={comment}/>)

    return(
        <Segment id='selectedmovie'>
          {/*<Image src={posters[movie.title.replace("3D", "").trim()]} size='small' floated='right'/>*/}
          <Header size='huge'>{this.props.selectedMovie.title}</Header>
          <Header size='large'>Directed by:</Header>
            <h3>{this.props.selectedMovie.directors.join(', ')}</h3>
          <Header size='large'>Starring:</Header>
            <h3> {this.props.selectedMovie.topCast.join(', ')}</h3>
          <Header size='large'>Synopsis:</Header>
            <h3>{this.props.selectedMovie.longDescription}</h3>
          <Header size='large'>Genre(s):</Header>
            <h3>{this.props.selectedMovie.genres.join(', ')}</h3>
          <Header size='large'>Now Showing at:</Header>
            <h3>{times}</h3>
          <Header size='large'>Have you seen {this.props.selectedMovie.title}?</Header>
          <Comment.Group>
            {commentsArray}
          </Comment.Group>
          <Form onSubmit={this.handleSubmit}>
            <Form.Input label="Tell us about it!" type="text" placeholder="add comment" name="addComment" value={addComment} onChange={this.handleChange}/>
            <Button content='Add Comment' labelPosition='left' icon='edit' color='purple'/>
          </Form>
        </Segment>
    )
  }
}

const mapState = (state) => {
  return {
    loadedMovies: state.movieData.loadedMovies,
    selectedMovie: state.movieData.selectedMovie,
    backendMovies: state.movieData.backendMovies,
    allComments: state.commentData.allComments,
    user: state.userData.user
  }
};

export default withRouter(connect(mapState, {persistComment, getAllComments})(SelectedMovie));