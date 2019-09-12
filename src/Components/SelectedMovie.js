import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Header, Segment } from 'semantic-ui-react';

class SelectedMovie extends Component {
  moviePosters = () => {
    let posterObj = {};
    this.props.nowPlaying.results.forEach(movie => {
      posterObj[
        movie.title
      ] = `http://image.tmdb.org/t/p/w185/${movie.poster_path}`;
    });
    return posterObj;
  };

  getMovieShowtimes = () => {
    let movieShowtimes = {};
    this.props.selectedMovie.showtimes.forEach(theatre => {
      if (movieShowtimes.hasOwnProperty([theatre.theatre.name])) {
        movieShowtimes[theatre.theatre.name].push(theatre.dateTime);
      } else {
        movieShowtimes[theatre.theatre.name] = [theatre.dateTime];
      }
    });
    return movieShowtimes;
  };

  render() {
    let theatreShowtimes = this.getMovieShowtimes();
    let times = [];
    // eslint-disable-next-line
    for (let key in theatreShowtimes) {
      times.push(
        <h3>
          {key}:{' '}
          {theatreShowtimes[key]
            .map(time =>
              new Date(time).toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit'
              })
            )
            .join(', ')}
        </h3>
      );
    }

    let { selectedMovie } = this.props;

    return (
      <Segment id='selectedmovie'>
      <Header size='huge'>{selectedMovie.title}</Header>
      <Header size='medium'>Directed by:</Header>
      <p>{selectedMovie.directors.join(', ')}</p>
      <Header size='medium'>Starring:</Header>
      <p> {selectedMovie.topCast.join(', ')}</p>
      <Header size='medium'>Synopsis:</Header>
      <p>{selectedMovie.longDescription}</p>
      <Header size='medium'>Genre(s):</Header>
      <p>{selectedMovie.genres.join(', ')}</p>
      <Header size='medium'>Now Playing at:</Header>
      <p>{times}</p>
    </Segment>
    );
  }
}

const mapState = state => {
  return {
    loadedMovies: state.movieData.loadedMovies,
    selectedMovie: state.movieData.selectedMovie
  };
};

export default withRouter(connect(mapState)(SelectedMovie));
