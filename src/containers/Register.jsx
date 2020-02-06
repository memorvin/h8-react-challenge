import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../store/actions'
import loader from '../assets/spin.gif'
import SweetAlert from 'sweetalert2-react';
import { CLEAR_USER_ERROR } from '../store/actionTypes'

export default function Register() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const user = useSelector(state => state.users.userId)
  const isLoading = useSelector(state => state.users.isLoading)
  const error = useSelector(state => state.users.error)

  const updateEmail = (e) => {
    setEmail(e.target.value);
  }

  const updatePassword = (e) => {
    setPassword(e.target.value);
  }

  const submitForm = () => {
    dispatch(register({
      email: email,
      password: password
    }))
      
    setPassword('')
    setEmail('')
  }

  const clearError = () => {
    dispatch({
      type: CLEAR_USER_ERROR
    })
  }

  return (
    isLoading
      ? <img src={loader} alt="loading" className="mx-auto mt-20"/>
      : error
        ? <SweetAlert
            show={error}
            title="Error"
            text={error}
            onConfirm={() => clearError()}
          />
        : user
          ? <Redirect to="/" />
          : <div className="w-1/3 mx-auto mt-24">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Email
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username" onChange={updateEmail} value={email}/>
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Password
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" onChange={updatePassword} value={password}/>
              </div>
              <div className="flex items-center justify-between">
                <button onClick={submitForm} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                  Register
                </button>
                <Link to='/login'>
                  <button className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
                    Already have an account? Sign In!
                  </button>
                </Link>
              </div>
            </form>
          </div>
  )
}