const initialState = {
  nowPlaying: [],
  loadedMovies: [],
  selectedMovie: {}
};

const movieReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_PLAYING': {
      return { ...state, nowPlaying: action.payload };
    }
    case 'ADD_PLAYING_TWO': {
      return { ...state, nowPlaying: [...state.nowPlaying, ...action.payload] };
    }
    case 'ADD_PLAYING_THREE': {
      return { ...state, nowPlaying: [...state.nowPlaying, ...action.payload] };
    }
    case 'GET_MOVIES': {
      return { ...state, loadedMovies: action.payload };
    }
    case 'SELECT_MOVIE': {
      return { ...state, selectedMovie: action.payload };
    }
    default:
      return state;
  }
};

export default movieReducer;
