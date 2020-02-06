import React, { useEffect } from 'react'
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { fetchPicture } from '../store/actions'
import loader from '../assets/spin.gif'
import SweetAlert from 'sweetalert2-react';
import { CLEAR_API_ERROR } from '../store/actionTypes'

export default function PictureDetail() {

  // function useFetchData() {
  //   const [picture, setPicture] = useState({})
  //   const [error, setError] = useState(null)
  //   const [date] = useState(useParams().date)
  //   const [isLoading, setIsLoading] = useState(false)
    
  //   useEffect(() => {
  //     setIsLoading(true)
  //     axios.get(`${process.env.REACT_APP_API_URL}&date=${date}`)
  //       .then(({ data }) => {
  //         setPicture(data)
  //         setIsLoading(false)
  //       })
  //       .catch(err => {
  //         setIsLoading(false)
  //         setError(err)
  //       })
  //   }, [date])

  //   return [picture, isLoading, error]
  // }

  // const [picture, isLoading, error] = useFetchData()

  const dispatch = useDispatch()
  const picture = useSelector(state => state.API.picture)
  const isLoading = useSelector(state => state.API.isLoading)
  const error = useSelector(state => state.API.error)
  const date = useParams().date

  useEffect(() => {
    dispatch(fetchPicture(`${process.env.REACT_APP_API_URL}&date=${date}`))
  }, [dispatch, date])

  const clearError = () => {
    dispatch({
      type: CLEAR_API_ERROR
    })
  }

  return (
    isLoading
    ? <img src={loader} alt="loading" className="mx-auto mt-20"/>
    : error
      ? <SweetAlert
        show={error}
        title="Error"
        text={error}
        onConfirm={() => clearError()}
      />
      : <div className="content mt-24 max-w-4xl mx-auto">
          <header className="text-center">
            <h1 className="text-4xl md:text-5xl font-semibold">{picture.title}</h1>
            <h3 className="text-lg max-w-md mx-auto font-serif text-gray-600">{picture.copyright ? picture.copyright : 'No copyright data'}</h3>
          </header>

          <div className="image my-16">
            {
              picture.media_type === 'image'
              ? <img src={`${picture.url}?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80`} alt={picture.title} className="shadow-md mx-auto" />
              // eslint-disable-next-line
              : <iframe src={`${picture.url}?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80`} alt={picture.title} className="shadow-md mx-auto"></iframe>
            }
          </div>
          <div className="content-text max-w-lg mx-auto text-left leading-relaxed text-gray-600 px-4">
            <p className="align-center text-justify">{picture.explanation}</p>
            <div className="flex px-8 py-6">
              <div className="flex">
                
              </div>
            </div>
          </div>
        </div>
    
  )
}