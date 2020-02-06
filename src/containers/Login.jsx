import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { login } from '../store/actions'
import { connect } from 'react-redux'
import loader from '../assets/spin.gif'
import SweetAlert from 'sweetalert2-react';
import { CLEAR_USER_ERROR } from '../store/actionTypes'

const mapDispatchToProps = (dispatch) => {
  return {
    login: (obj) => {
      dispatch(login(obj));
    },
    clearError: () => {
      dispatch({
        type: CLEAR_USER_ERROR
      })
    }
  };
};

const mapStateToProps = (state) => {
  return {
    user: state.users.userId,
    error: state.users.error,
    isLoading: state.users.isLoading
  }
}

class Login extends Component {

  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
    this.updateEmail = this.updateEmail.bind(this)
    this.updatePassword = this.updatePassword.bind(this)
    this.submitForm = this.submitForm.bind(this)
  }

  updateEmail = (e) => {
    this.setState({email: e.target.value});
  }

  updatePassword = (e) => {
    this.setState({password: e.target.value});
  }

  submitForm = () => {
    this.props.login({
      email: this.state.email,
      password: this.state.password
    }) 
    this.setState({password: ''})
    this.setState({email: ''})
  }

  render() {
    return (
      this.props.isLoading
      ? <img src={loader} alt="loading" className="mx-auto mt-20"/>
      : this.props.error
        ? <SweetAlert
          show={this.props.error}
          title="Error"
          text={this.props.error}
          onConfirm={() => this.props.clearError()}
        />
        : this.props.user
          ? <Redirect to="/" />
          : <div className="w-1/3 mx-auto mt-24">
              <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Email
                  </label>
                  <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username" onChange={this.updateEmail} value={this.state.email}/>
                </div>
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Password
                  </label>
                  <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" onChange={this.updatePassword} value={this.state.password}/>
                </div>
                <div className="flex items-center justify-between">
                  <button onClick={this.submitForm} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                    Sign In
                  </button>
                  <Link to='/register'>
                    <button className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
                      Doesn't have an account? Register here!
                    </button>
                  </Link>
                </div>
              </form>
            </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);