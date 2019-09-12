const tmsAPIkey = process.env.REACT_APP_TMS_API_KEY;
const tmdbAPIkey = process.env.REACT_APP_THEMOVIEDB_API_KEY;

export const getMovies = moviesData => ({
  type: 'GET_MOVIES',
  payload: moviesData
});

export const zipMovies = (zipCode, zipRadius) => {
  return dispatch => {
    let currentDate = new Date().toISOString().slice(0, 10);
    return fetch(
      `https://data.tmsapi.com/v1.1/movies/showings?startDate=${currentDate}&zip=${zipCode}&radius=${zipRadius}&api_key=${tmsAPIkey}`,
      {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          accepts: 'application/json'
        }
      }
    )
      .then(r => r.json())
      .then(moviesData => dispatch(getMovies(moviesData)))
      .catch(console.error);
  };
};

export const selectMovie = movie => ({ type: 'SELECT_MOVIE', payload: movie });

//***** three fetches on app load to get as many posters as possible *****//
export const addPlaying = nowPlaying => ({
  type: 'ADD_PLAYING',
  payload: nowPlaying
});

export const getNowPlaying = () => {
  return dispatch => {
    return fetch(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${tmdbAPIkey}&language=en-US&page=1`
    )
      .then(r => r.json())
      .then(nowPlaying => dispatch(addPlaying(nowPlaying.results)))
      .catch(console.error);
  };
};

export const addPlayingTwo = nowPlaying => ({
  type: 'ADD_PLAYING_TWO',
  payload: nowPlaying
});

export const getNowPlayingTwo = () => {
  return dispatch => {
    return fetch(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${tmdbAPIkey}&language=en-US&page=2`
    )
      .then(r => r.json())
      .then(nowPlaying => dispatch(addPlayingTwo(nowPlaying.results)))
      .catch(console.error);
  };
};

export const addPlayingThree = nowPlaying => ({
  type: 'ADD_PLAYING_THREE',
  payload: nowPlaying
});

export const getNowPlayingThree = () => {
  return dispatch => {
    return fetch(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${tmdbAPIkey}&language=en-US&page=3`
    )
      .then(r => r.json())
      .then(nowPlaying => dispatch(addPlayingThree(nowPlaying.results)))
      .catch(console.error);
  };
};
