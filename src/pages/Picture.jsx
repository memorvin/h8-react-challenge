import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from "react-router-dom";
import SweetAlert from 'sweetalert-react'

export default function PictureDetail() {

  function useFetchData() {
    const [picture, setPicture] = useState({})
    const [error, setError] = useState(null)
    const [date] = useState(useParams().date)
    const [isLoading, setIsLoading] = useState(false)
    
    useEffect(() => {
      setIsLoading(true)
      axios.get(`${process.env.REACT_APP_API_URL}&date=${date}`)
        .then(({ data }) => {
          setPicture(data)
          setIsLoading(false)
        })
        .catch(err => {
          setIsLoading(false)
          setError(err)
        })
    }, [date])

    return [picture, isLoading, error]
  }

  const [picture, isLoading, error] = useFetchData()

  return (
    <>
      <SweetAlert
        show={isLoading}
        title="Loading"
        text="Fetching data..."
      />
      <SweetAlert
        show={error}
        title="Error"
        text="An error occured"
      />
      <div className="flex flex-wrap text-center">
        {
          picture.media_type === 'image'
          ? <img className="w-full" src={picture.url} alt={picture.title} />
          // eslint-disable-next-line
          : <iframe className="w-full" src={picture.url} alt={picture.title}></iframe>
        }
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{picture.title}</div>
            <p className="text-gray-700 text-base italic">
              {picture.copyright ? picture.copyright : 'No copyright data'}
            </p>
            <p className="text-gray-700 text-base">
              {picture.explanation}
            </p>
          </div>
      </div>
    </>
  )

}