import React from 'react'
import { render } from 'react-dom'

import Application from './src/containers/App'

import './scss/application.scss'

render(
  <Application />,
  document.getElementById('container')
)
