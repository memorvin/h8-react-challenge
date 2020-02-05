import {
  FETCH_PICTURES_SUCCESS,
  FETCH_PICTURE_SUCCESS,
  FETCH_FAILED,
  FETCH_LOADING
} from '../actionTypes'
import axios from 'axios'

export function fetchPictures(url) {
  return function(dispatch, getState) {
    dispatch({
      type: FETCH_LOADING
    })
    axios.get(url)
      .then(({ data }) => {
        dispatch({
          type: FETCH_PICTURES_SUCCESS,
          payload: data
        })
      })
      .catch(err => {
        dispatch({
          type: FETCH_FAILED,
          payload: err
        })
      })
  }
}

export function fetchPicture(url) {
  return function(dispatch, getState) {
    dispatch({
      type: FETCH_LOADING
    })
    axios.get(url)
      .then(({ data }) => {
        console.log(data, 'DARI ACTIONS')
        dispatch({
          type: FETCH_PICTURE_SUCCESS,
          payload: data
        })
      })
      .catch(err => {
        dispatch({
          type: FETCH_FAILED,
          payload: err
        })
      })
  }
}