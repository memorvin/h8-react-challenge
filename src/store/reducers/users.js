import {
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_SUCCESS,
  USER_LOADING,
  USER_FAILED,
  CLEAR_USER_ERROR,
  CLEAR_USER_SUCCESS
} from '../actionTypes'

const initialState = {
  userId: null,
  isLoading: false,
  error: null,
  success: false
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
        userId: action.payload,
        success: true
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
    case CLEAR_USER_SUCCESS:
      return {
        ...state,
        success: false
      }
    default:
      return state
  }
}