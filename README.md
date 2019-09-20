# NowPlaying
---

This app was built as a Redux learning exercise. It gives users the ability to find films that are currently playing at cinemas within a specified radius of a given zipcode - like Fandango. 
It was implemented with redux (createStore, applyMiddleware, combineReducers), redux-thunk (thunk), react-redux (Provider), and react-router-dom (BrowserRouter). There is a movieReducer and accompanying movieAction.
* it is yet to be responsive

## Getting Started
To get a copy of NowPlaying up and running on your local machine, clone the repo:
```
git clone git@github.com:jonfreed256/now-playing.git
```
cd into the directory:
```
cd now-playing
```
Install dependencies:
```
npm i
```
For movie showtimes, head over to Gracenotes for an API key:
```
http://developer.tmsapi.com/docs/read/data_v1_1/movies/Movie_showtimes
```
For posters, head over to TMDB for an API key:
```
https://developers.themoviedb.org/3/getting-started/introduction
```
After adding API keys to your .env file, run the local server:
```
npm start
```
