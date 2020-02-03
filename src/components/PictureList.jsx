import React, { Component, useState, useEffect } from 'react'
import axios from 'axios'
import PictureCard from './PictureCard'
import SearchBox from './SearchBox'

// export default class MainContainer extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       pictures: []
//     }
//     this.onDateSearch = this.onDateSearch.bind(this)
//   }

//   componentDidMount() {
//     axios.get(`${process.env.REACT_APP_API_URL}&count=15`)
//       .then(({ data }) => {
//         this.setState({ pictures: data })
//       })
//       .catch(err => {
//         console.log(err)
//       })
//   }

//   componentWillUnmount() {
//     this.setState({
//       pictures: []
//     })
//   }

//   onDateSearch(value) {
//     axios.get(`${process.env.REACT_APP_API_URL}&start_date=${value.startYear}-${value.startMonth}-${value.startDate}&end_date=${value.endYear}-${value.endMonth}-${value.endDate}`)
//       .then(({ data }) => {
//         this.setState({ pictures: data })
//       })
//       .catch(err => {
//         console.log(err)
//       })
//   }

//   PicturesList() {
//     return this.state.pictures.map(picture => {
//       return <PictureCard picture={picture} key={picture.date} />
//     })
//   }

//   render() {
//     return (
//       <>
//         <SearchBox onSearch={this.onDateSearch} />
//         <div className="flex flex-wrap text-center ml-40">
//           {this.PicturesList()}
//         </div>
//       </>
//     )
//   }
// }

export default function MainContainer() {
  // this.onDateSearch = this.onDateSearch.bind(this)

  const [pictures, setPictures] = useState([])

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}&count=15`)
      .then(({ data }) => {
        setPictures(data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  const onDateSearch = ((value) => {
    axios.get(`${process.env.REACT_APP_API_URL}&start_date=${value.startYear}-${value.startMonth}-${value.startDate}&end_date=${value.endYear}-${value.endMonth}-${value.endDate}`)
      .then(({ data }) => {
        setPictures(data)
      })
      .catch(err => {
        console.log(err)
      })
  })

  const PicturesList = (() => {
    return pictures.map(picture => {
      return <PictureCard picture={picture} key={picture.date} />
    })
  })

  return (
    <>
      <SearchBox onSearch={onDateSearch} />
      <div className="flex flex-wrap text-center ml-40">
        {PicturesList()}
      </div>
    </>
  )
}