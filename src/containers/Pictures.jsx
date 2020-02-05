import React, { useEffect } from 'react'
import PictureCard from '../components/PictureCard'
import SearchBox from '../components/SearchBox'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPictures } from '../store/actions'
import { CHANGE_URL } from '../store/actionTypes'
import loader from '../assets/spin.gif'

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
      ? <img src={loader} alt="loading" className="mx-auto mt-20"/>
      : error
        ? <div className="mx-auto mt-20"> 
            <img src="https://loading.io/icon/akv0s0" alt="error" />
            <p className="text-2xl">Something wrong!</p>
            <p className="text-xl">{error}</p>
          </div>
        : <>
            <SearchBox onSearch={onDateSearch} />
            <div className="flex flex-wrap text-center ml-40">
              {renderPicturesList()}
            </div>
          </>
  )
}