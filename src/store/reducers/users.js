import {
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_SUCCESS,
  USER_LOADING,
  USER_FAILED,
  CLEAR_USER_ERROR
} from '../actionTypes'

const initialState = {
  userId: null,
  isLoading: false,
  error: null
}

export default function usersReducer(state = initialState, action) {
  switch(action.type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        userId: action.payload
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        userId: action.payload
      }
    case LOGOUT:
      return {
        ...state,
        userId: null
      }
    case USER_LOADING:
      return {
        ...state,
        isLoading: true
      }
    case USER_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      }
    case CLEAR_USER_ERROR:
      return {
        ...state,
        error: null
      }
    default:
      return state
  }
}