const initialState = {
  allComments: []
};

const commentReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_COMMENTS':{
      console.log('comment reducer', action.payload)
      return {...state, allComments: action.payload}
    }
    default:
    return state
  }
};

export default commentReducer;