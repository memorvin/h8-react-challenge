import {
  LOGIN,
  LOGOUT,
} from '../actionTypes'

const initialState = {
  userId: null,
  userName: null
}

export default function usersReducer(state = initialState, action) {
  switch(action.type) {
    case LOGIN:
      return {
        ...state,
        userId: action.payload.userId,
        userName: action.payload.userName
      }
    case LOGOUT:
      return {
        ...state,
        userId: null,
        userName: null
      }
    default:
      return state
  }
}