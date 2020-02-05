import {
  FETCH_PICTURES_SUCCESS,
  FETCH_FAILED,
  FETCH_LOADING,
  CHANGE_URL,
  FETCH_PICTURE_SUCCESS
} from '../actionTypes'

const initialState = {
  pictures: [],
  isLoading: false,
  error: null,
  url: `${process.env.REACT_APP_API_URL}&count=15`,
  picture: {}
}

export default function APIReducer(state = initialState, action) {
  switch(action.type) {
    case FETCH_LOADING:
      return {
        ...state,
        isLoading: true
      }
    case FETCH_PICTURE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        picture: action.payload
      }
    case FETCH_PICTURES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        pictures: action.payload
      }
    case FETCH_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      }
    case CHANGE_URL:
      return {
        ...state,
        url: action.payload
      }
    default:
      return state
  }
}