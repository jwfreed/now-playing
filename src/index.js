import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import userReducer from './Redux/reducers/userReducer';
import movieReducer from './Redux/reducers/movieReducer';
import commentReducer from './Redux/reducers/commentReducer';

const appReducer = combineReducers({
  userData: userReducer,
  movieData: movieReducer,
  commentData: commentReducer
});

const rootReducer = (state, action) => {
  if(action.type === 'USER_LOGOUT'){
    console.log('root', state);
    state = undefined;
  }
  return appReducer(state, action)
};

const store = createStore(rootReducer, composeWithDevTools(
    applyMiddleware(thunk)));

ReactDOM.render(
    <BrowserRouter>
      <Provider store={store}>
         <App />
      </Provider>
    </BrowserRouter>, document.getElementById('root'));