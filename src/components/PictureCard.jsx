import React from 'react'

export default function MovieCard({ picture }) {
  
  return (
    <div className="w-1/4 h-1/3 rounded shadow-xl m-4">
      <img className="w-full" src={picture.url} alt={picture.title} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{picture.title}</div>
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