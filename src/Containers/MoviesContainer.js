import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import MovieCard from '../Components/MovieCard'
import { Card, Container } from 'semantic-ui-react';

class MoviesContainer extends Component {

  moviePosters = () => {
    let posterObj = {};
    if(Array.isArray(this.props.nowPlaying)) {
      this.props.nowPlaying.forEach(movie => {
        posterObj[movie.title] = `http://image.tmdb.org/t/p/w185/${movie.poster_path}`
      });
    }
    return posterObj
  };


render() {
  let { loadedMovies } = this.props;
  let posters = this.moviePosters();
    let moviesArray = loadedMovies.map(movie => {
      return <MovieCard key={movie.tmsId} movie={movie} posters={posters[movie.title.replace("3D", "").trim()]}/>;
    });
    return(
        <Container id='movie-container'>
          <Card.Group itemsPerRow={4}>
            {moviesArray}
          </Card.Group>
        </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    loadedMovies: state.movieData.loadedMovies,
    nowPlaying: state.movieData.nowPlaying
  }
};

export default withRouter(connect(mapStateToProps)(MoviesContainer));