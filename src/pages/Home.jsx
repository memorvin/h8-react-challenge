import React, { Component } from 'react'
import axios from 'axios'
import SweetAlert from 'sweetalert-react'

export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      picture: {},
      error: null,
      isLoading: false,
      displayText: ''
    }
  }

  componentDidMount() {
    this.setState({ isLoading: true })
    axios.get(`${process.env.REACT_APP_API_URL}`)
      .then(({ data }) => {
        this.setState({ isLoading: false })
        this.setState({ picture: data })
        this.setState({ displayText: data.explanation.slice(0, 200) })
      })
      .catch(err => {
        this.setState({ isLoading: false })
        this.setState({ error: err })
      })
  }

  render() {
    return (
      <>
        <SweetAlert
          show={this.state.isLoading}
          title="Loading"
          text="Fetching data..."
        />
        <SweetAlert
          show={this.state.error}
          title="Error"
          text={this.state.error}
        />
        <div className="lg:h-screen -mt-24 lg:pt-24 w-full flex flex-wrap">
        <div className="h-screen w-full lg:h-full lg:w-1/2 flex justify-center items-center">
          <div className="max-w-md px-12 lg:px-32">
            <h1 className="text-2xl md:text-4xl leading-normal mb-8 font-serif">{this.state.picture.title}</h1>
            <div className="ml-12 -mr-12">
              <p className="pr-6 md:pr-0 text-xs leading-normal md:leading-loose text-grey-darkest mb-8">{this.state.displayText}</p>
              <p className="text-xs text-black uppercase">{this.state.picture.copyright ? this.state.picture.copyright : 'No copyright data'} <span className="inline-block h-1 w-24 ml-4 border-t border-grey-light"></span></p>
            </div>
          </div>
        </div>
        <div className="h-screen w-full lg:h-full lg:w-1/2 relative">
          {
            this.state.picture.media_type === 'image'
            ? <div className="w-full h-full bg-cover bg-no-repeat bg-center" style={{backgroundImage: `url('${this.state.picture.url}')`}}></div>
            // eslint-disable-next-line
            : <iframe className="w-full" src={this.state.picture.url} alt={this.state.picture.title}></iframe>
          }
        </div>
      </div>
      </>
    )
  }
}