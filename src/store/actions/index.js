import {
  FETCH_PICTURES_SUCCESS,
  FETCH_PICTURE_SUCCESS,
  FETCH_FAILED,
  FETCH_LOADING,
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  USER_LOADING,
  USER_FAILED
} from '../actionTypes'
import axios from 'axios'
import firebase from '../../components/Firestore'

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

export function register(obj) {
  return function(dispatch, getState) {
    dispatch({
      type: USER_LOADING
    })
    const db = firebase.firestore();
    db.collection('users')
      .where("email", "==", `${obj.email}`)
      .get()
      .then(querySnapshot => {
        const data = querySnapshot.docs.map(doc => doc.data());
        if (data.length) {
          throw new Error('This email address has been registered. Please sign in or use another one.')
        } else {
          return db.collection('users').add({
            email: obj.email,
            password: obj.password
          })
        }
      })
      .then(data => {
        dispatch({
          type: REGISTER_SUCCESS,
          payload: data.id
        })
      })
      .catch(err => {
        dispatch({
          type: USER_FAILED,
          payload: err.message
        })
      })
  }
}

export function login(obj) {
  return function(dispatch, getState) {
    dispatch({
      type: USER_LOADING
    })
    const db = firebase.firestore();
    db.collection('users')
      .where("email", "==", `${obj.email}`)
      .get()
      .then(querySnapshot => {
        const data = querySnapshot.docs.map(doc => doc.data());
        if (!data.length) {
          dispatch({
            type: USER_FAILED,
            payload: 'Wrong username or password'
          })
        } else if (String(data[0].password) === String(obj.password)) {
          dispatch({
            type: LOGIN_SUCCESS,
            payload: data[0].email
          })
        } else {
          dispatch({
            type: USER_FAILED,
            payload: 'Wrong username or password'
          })
        }
      })
      .catch(err => {
        dispatch({
          type: USER_FAILED,
          payload: err
        })
      })
  }
}