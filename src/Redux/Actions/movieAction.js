const moviesUrl = 'https://now-playing-zip.herokuapp.com/api/v1/movies'

const tmsAPIkey = process.env.TMS_API_KEY

const tmdbAPIkey = process.env.THEMOVIEDB_API_KEY

// future user comments feature for fetching persisted films and setting state 
export const backendMovies = (movies) => ({type: 'BACKEND_MOVIES', payload: movies})

export const getBackendMovies = () => {
  return dispatch => {
    return fetch(moviesUrl, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'accepts': 'application/json',
        Authorization: `Bearer ${localStorage.token}`
      }
    })
    .then(r => r.json())
    .then(movies => dispatch(backendMovies(movies)))
  }
};


// for fetching films, theaters, and showtimes in a given zip code and radius and persisting films
export const getMovies = (moviesData) => ({type: 'GET_MOVIES', payload: moviesData});

export const zipMovies =  (zipCode, zipRadius) => {
  return dispatch => {
    let currentDate = new Date().toISOString().slice(0,10);
    return fetch(`http://data.tmsapi.com/v1.1/movies/showings?startDate=${currentDate}&zip=${zipCode}&radius=${zipRadius}&api_key=${tmsAPIkey}`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'accepts': 'application/json'
      }
    })
    .then(r => r.json())
    .then(moviesData => dispatch(getMovies(moviesData)))
    .then(moviesData => persistMovies(moviesData))
  }
};

const persistMovies = (moviesData) => {
  let moviesArray = moviesData.payload.map(movie => movie.title);
  moviesArray.forEach(title => {
    return fetch(moviesUrl, {
    method: 'POST',
      headers: {
        'content-type': 'application/json',
        'accepts': 'application/json',
        Authorization: `Bearer ${localStorage.token}`
      },
      body: JSON.stringify({title})
    })
  })
};

// fetch for film posters to add to list of currently queried films 
export const selectMovie = (movie) => ({type: 'SELECT_MOVIE', payload: movie});

export const addPlaying = (nowPlaying) => ({type: 'ADD_PLAYING', payload: nowPlaying});

export const getNowPlaying = () => {
  return dispatch => {
    return fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${tmdbAPIkey}&language=en-US&page=1`)
    .then(r => r.json())
    .then(nowPlaying => dispatch(addPlaying(nowPlaying.results)))
    .catch(console.error)
  }
};

export const addPlayingTwo = (nowPlaying) => ({type: 'ADD_PLAYING_TWO', payload: nowPlaying});

export const getNowPlayingTwo = () => {
  return dispatch => {
    return fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${tmdbAPIkey}&language=en-US&page=2`)
    .then(r => r.json())
    .then(nowPlaying => dispatch(addPlayingTwo(nowPlaying.results)))
    .catch(console.error)
  }
};

export const addPlayingThree = (nowPlaying) => ({type: 'ADD_PLAYING_THREE', payload: nowPlaying});

export const getNowPlayingThree = () => {
  return dispatch => {
    return fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${tmdbAPIkey}&language=en-US&page=3`)
    .then(r => r.json())
    .then(nowPlaying => dispatch(addPlayingThree(nowPlaying.results)))
    .catch(console.error)
  }
};