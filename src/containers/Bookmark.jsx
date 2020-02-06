import React, { Component } from 'react'
import image from '../assets/undraw_empty_xct9.png'

export default class Bookmark extends Component {
  
  render() {
    return (
      <>
        <h1 className="text-center mt-6 text-xl">There's nothing here, yet. Just testing the private route.</h1>
        <img src={image} alt="empty page"/>
      </>
    )
  }
}