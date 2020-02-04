import React, { useState, useEffect } from 'react'
import axios from 'axios'
import PictureCard from '../components/PictureCard'
import SearchBox from '../components/SearchBox'
import SweetAlert from 'sweetalert-react';
import 'sweetalert/dist/sweetalert.css';

export default function PictureList() {

  let [url, setUrl] = useState(`${process.env.REACT_APP_API_URL}&count=15`)

  function useFetchData(url) {
    const [pictures, setPictures] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
      setIsLoading(true)
      axios.get(url)
        .then(({ data }) => {
          setPictures(data)
          setIsLoading(false)
        })
        .catch(err => {
          setIsLoading(false)
          setError(err)
        })
    }, [url])

    return [pictures, isLoading, error]
  }

  let [pictures, isLoading, error] = useFetchData(url)

  const onDateSearch = ((value) => {
    setUrl(`${process.env.REACT_APP_API_URL}&start_date=${value.startYear}-${value.startMonth}-${value.startDate}&end_date=${value.endYear}-${value.endMonth}-${value.endDate}`)
  })

  const renderPicturesList = (() => {
    return pictures.map(picture => {
      return <PictureCard picture={picture} key={picture.date} />
    })
  })
  
  return (
    <>
      <SearchBox onSearch={onDateSearch} />
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
      <div className="flex flex-wrap text-center ml-40">
        {renderPicturesList()}
      </div>
    </>
  )
}