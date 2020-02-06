import React, { Component } from 'react'
import { Link } from "react-router-dom";
import { connect } from 'react-redux'
import { LOGOUT } from '../store/actionTypes'
import { fetchPictures } from '../store/actions'

const mapStateToProps = (state) => {
  return {
    user: state.users.userId
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => {
      dispatch({
        type: LOGOUT
      });
    },
    fetchPictures: () => {
      dispatch(fetchPictures(`${process.env.REACT_APP_API_URL}&count=15`))
    }
  };
};

class NavBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      
    }
  }

  logout = () => {
    this.props.logout()
  }

  render() {
    return (
      // fixed w-full z-10
      <nav className="shadow-lg flex items-center justify-between flex-wrap bg-blue-700 p-4">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <Link to="/">
            <span className="font-semibold text-xl tracking-tight cursor-pointer">Astronomy Picture of The Day</span>
          </Link>
        </div>
        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <div className="text-sm lg:flex-grow">
            <Link to="/pictures">
              <span onClick={this.props.fetchPictures} className="inline-block text-sm px-4 py-2 leading-none rounded text-white border-white hover:border-transparent hover:text-blue-700 hover:bg-white mt-4 mx-1 lg:mt-0">Pictures</span>
            </Link>
            <Link to="/bookmarks">
              <span className="inline-block text-sm px-4 py-2 leading-none rounded text-white border-white hover:border-transparent hover:text-blue-700 hover:bg-white mt-4 mx-1 lg:mt-0">Bookmarks</span>
            </Link>
          </div>
          <div>
            {
              this.props.user
              ? <span onClick={this.logout} className="inline-block cursor-pointer text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-blue-700 hover:bg-white mt-4 lg:mt-0">Sign Out</span>
              : <Link to="/login">
                  <span className="inline-block cursor-pointer text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-blue-700 hover:bg-white mt-4 lg:mt-0">Sign In</span>
                </Link> 
            }
          </div>
        </div>
      </nav>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)
(NavBar);