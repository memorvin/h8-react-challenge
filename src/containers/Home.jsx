import React, { Component } from 'react'
import { connect } from "react-redux";
import { fetchPicture } from '../store/actions';
import loader from '../assets/spin.gif'
import { Link } from 'react-router-dom'
import SweetAlert from 'sweetalert2-react';
import { CLEAR_API_ERROR, CLEAR_USER_SUCCESS } from '../store/actionTypes'

const mapStateToProps = (state) => {
  return {
    picture: state.API.picture,
    error: state.API.error,
    isLoading: state.API.isLoading,
    success: state.users.success
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPicture: (url) => {
      dispatch(fetchPicture(url));
    },
    clearError: () => {
      dispatch({
        type: CLEAR_API_ERROR
      })
    },
    clearSuccess: () => {
      dispatch({
        type: CLEAR_USER_SUCCESS
      })
    }
  };
};

class Home extends Component {

  displayText() {
    return this.props.picture.explanation.slice(0, 300)
  }

  componentDidMount() {
    this.props.fetchPicture(`${process.env.REACT_APP_API_URL}`)
  }

  render() {
    const { picture, error, isLoading, success } = this.props
    return (
      isLoading
      ? <img src={loader} alt="loading" className="mx-auto mt-20"/>
      : error
        ? <SweetAlert
            show={error}
            title="Error"
            text={error}
            onConfirm={() => this.props.clearError()}
          />
        : success
          ? <SweetAlert
              show={success}
              title="Success"
              text="Successfully signed in!"
              onConfirm={() => this.props.clearSuccess()}
            />
          : picture.explanation
            ? <>
                <div className="lg:h-screen -mt-24 lg:pt-24 w-full flex flex-wrap">
                  <div className="h-screen w-full lg:h-full lg:w-1/2 flex justify-center items-center">
                    <div className="max-w-md px-12 lg:px-32">
                      <Link to={`pictures/${picture.date}`}>
                        <h1 className="text-2xl md:text-4xl hover:text-gray-700 leading-normal mb-8 font-serif">{picture.title}</h1>
                      </Link>
                      <div className="ml-12 -mr-12">
                        <p className="pr-6 md:pr-0 text-xs leading-normal md:leading-loose text-grey-800 mb-8 text-justify">{this.displayText()}</p>
                        <p className="text-xs text-black uppercase">{picture.copyright ? picture.copyright : 'No copyright data'} <span className="inline-block h-1 w-24 ml-4 border-t border-gray-700"></span></p>
                      </div>
                    </div>
                  </div>
                  <div className="h-screen w-full lg:h-full lg:w-1/2 relative">
                    {
                      picture.media_type === 'image'
                      ? <div className="w-full h-full bg-cover bg-no-repeat bg-center" style={{backgroundImage: `url('${picture.url}')`}}></div>
                      // eslint-disable-next-line
                      : <iframe className="w-full" src={picture.url} alt={picture.title}></iframe>
                    }
                  </div>
                </div>
              </>
            : <p></p>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);