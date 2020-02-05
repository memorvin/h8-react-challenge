import { combineReducers } from 'redux'
import API from './API'
import users from './users'

export const rootReducer = combineReducers({
  API,
  users
})