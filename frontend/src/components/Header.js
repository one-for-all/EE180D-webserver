import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { NavLink, Redirect } from 'react-router-dom'
import { withRouter } from 'react-router'
import axios from 'axios'
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

import siteIcon from '../../assets/images/dragon_icon.svg'

class Header extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired
  }

  render() {
    return (
      <header className="header">
        <NavLink className='header__home-link' to='/'>
          <h1 className="header__heading">Dungeon & Dragon</h1>
          <img className="header__icon" src={siteIcon}></img>
        </NavLink>
      </header>
    )
  }
}

export default withRouter(Header)
