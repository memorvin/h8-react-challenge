import React, { Component } from 'react'
import { Link } from "react-router-dom";

export default class NavBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      
    }
  }

  render() {
    return (
      <nav className="flex items-center justify-between flex-wrap bg-blue-700 p-4">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <Link to="/">
            <span className="font-semibold text-xl tracking-tight cursor-pointer">Astronomy Picture of The Day</span>
          </Link>
        </div>
        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <div className="text-sm lg:flex-grow">
            <Link to="/pictures">
              <span className="inline-block text-sm px-4 py-2 leading-none rounded text-white border-white hover:border-transparent hover:text-blue-700 hover:bg-white mt-4 mx-1 lg:mt-0">Pictures</span>
            </Link>
            <Link to="/bookmarks">
              <span className="inline-block text-sm px-4 py-2 leading-none rounded text-white border-white hover:border-transparent hover:text-blue-700 hover:bg-white mt-4 mx-1 lg:mt-0">Bookmarks</span>
            </Link>
          </div>
          <div>
            <span className="inline-block cursor-pointer text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-blue-700 hover:bg-white mt-4 lg:mt-0">Sign In</span>
          </div>
        </div>
      </nav>
    )
  }
}