const usersUrl = 'https://now-playing-zip.herokuapp.com/api/v1/users'

export const loginUserPending = () => ({type: 'LOGIN_USER_PENDING', payload: null});

export const loginUserError = (error) => ({type: 'LOGIN_USER_FAIL', payload: error});

export const loginUser = (newUser) => {
  return {
    type: 'LOGIN_USER',
    payload: newUser}
};

export const logoutUser = () => {
    return {
      type: 'USER_LOGOUT',
      payload: null
    }
};

export const createUser = (newUser) => {
  return dispatch => {
    return fetch(usersUrl, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'accepts': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({user: newUser})
    })
        .then(r => r.json())
        .then(newUser => {
          if(newUser.jwt){
          localStorage.setItem('token', newUser.jwt);
          dispatch(loginUser(newUser.user))
          }
    }).catch(error => console.log(error))
  }
};

export const getUser =  (token) => {
  return dispatch => {
    return fetch('https://now-playing-zip.herokuapp.com/api/v1/current_user', {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'accepts': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
        .then(r => r.json())
        .then(currentUser => dispatch(loginUser((currentUser))))
        .catch(console.error)
  }
};

export const login = (user) => {
  return dispatch => {
    dispatch(loginUserPending());
    return fetch('https://now-playing-zip.herokuapp.com/api/v1/login', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'accepts': 'application/json'
      },
      body: JSON.stringify({user: user})
    })
        .then(r => r.json())
        .then(currentUser => {
          if(currentUser.jwt) {
            localStorage.setItem('token', currentUser.jwt);
            return dispatch(loginUser(currentUser))
          }
    }).catch(error => {
      dispatch(loginUserError(error))
    })
  }
};