const commentsUrl = 'http://localhost:3001/api/v1/comments'

export const persistComment = (comment) => {
  console.log(comment)
  return dispatch => {
    return fetch(commentsUrl, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'accepts': 'application/json',
        Authorization: `Bearer ${localStorage.token}`
      },
      body: JSON.stringify({comment})
    }).then(res => res.json()).then(console.log)
  }
};

export const getComments = (comments) => ({type: 'GET_COMMENTS', payload: comments});

export const getAllComments = () => {
  return dispatch => {
    return fetch(commentsUrl, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'accepts': 'application/json',
        Authorization: `Bearer ${localStorage.token}`
      }
    })
    .then(r => r.json())
    .then(comments => dispatch(getComments(comments)))
    .catch(console.error)
  }
}