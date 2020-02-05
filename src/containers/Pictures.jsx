import React, { useEffect } from 'react'
import PictureCard from '../components/PictureCard'
import SearchBox from '../components/SearchBox'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPictures } from '../store/actions'
import { CHANGE_URL } from '../store/actionTypes'

export default function PictureList() {

  const dispatch = useDispatch()
  const url = useSelector(state => state.API.url)
  const pictures = useSelector(state => state.API.pictures)
  const error = useSelector(state => state.API.error)
  const isLoading = useSelector(state => state.API.isLoading)
  
  useEffect(() => {
    dispatch(fetchPictures(url))
  }, [dispatch, url])

  const onDateSearch = (value => {
    dispatch({
      type: CHANGE_URL,
      payload: `${process.env.REACT_APP_API_URL}&start_date=${value.startYear}-${value.startMonth}-${value.startDate}&end_date=${value.endYear}-${value.endMonth}-${value.endDate}`
    })  
  })

  const renderPicturesList = (() => {
    return pictures.map(picture => {
      return <PictureCard picture={picture} key={picture.date} />
    })
  })
  
  return (
    isLoading
      ? <p>LOADING</p>
      : error
        ? <p>{error}</p>
        : <>
            <SearchBox onSearch={onDateSearch} />
            <div className="flex flex-wrap text-center ml-40">
              {renderPicturesList()}
            </div>
          </>
  )
}