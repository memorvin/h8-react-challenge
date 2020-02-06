import React from 'react'
import PropTypes from 'prop-types'
import { Link } from "react-router-dom";

export default function MovieCard({ picture }) {

  return (
    <div className="w-1/4 h-1/3 rounded shadow-xl m-4">
      {
        picture.media_type === 'image'
        ? <img className="w-full" src={picture.url} alt={picture.title} />
        // eslint-disable-next-line
        : <iframe className="w-full" src={picture.url} alt={picture.title}></iframe>
      }
      <div className="px-6 py-4">
        <Link to={`pictures/${picture.date}`}>
          <div className="font-bold text-xl mb-2 hover:text-gray-700">{picture.title}</div>
        </Link>
        <p className="text-gray-700 text-base">
          {picture.copyright ? picture.copyright : 'No copyright data'}
        </p>
      </div>
      <div className="px-6 py-4">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">{picture.date}</span>
      </div>
    </div>
  )
}

MovieCard.propTypes = {
  picture: PropTypes.object.isRequired
}