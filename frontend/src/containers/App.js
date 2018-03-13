import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import axios from 'axios'
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

import Header from '../components/Header'
import Home from '../components/Home'

class Application extends Component {

  render() {
    return (
      <BrowserRouter>
        <div className='app'>
        <Header />
        <Home />
        </div>
      </BrowserRouter>
    )
  }
}

export default Application

// let xhr = new XMLHttpRequest()
// xhr.onreadystatechange = function () {
//   if (xhr.readyState === XMLHttpRequest.DONE) {
//     console.log(xhr.responseText)
//   }
// }
// xhr.open('GET', '/index/')
// xhr.send()
