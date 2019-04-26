import React from 'react';
import { connect } from 'react-redux';
import { Card, Image } from 'semantic-ui-react';
import { selectMovie } from '../Redux/Actions/movieAction';
import { withRouter } from 'react-router-dom'

const MovieCard = props => {

  const { movie, selectedMovie } = props;
      return(
          <Card id='moviecard' onClick={() => {selectedMovie(movie); props.history.push(`/movies/${movie.title}`)}}>
            <Image src={props.posters}/>
            <Card.Content header={movie.title} />
            <Card.Content description={movie.shortDescription} />
          </Card>
  )
};

const mapState = (state) => {
  return {
    loadedMovies: state.loadedMovies,
  }
};

const mapDispatch = (dispatch) => ({
  selectedMovie: (movie) => dispatch(selectMovie(movie))
});

export default withRouter(connect(mapState, mapDispatch)(MovieCard));