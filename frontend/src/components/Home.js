import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import axios from 'axios'

class Home extends Component {

  state = {
    updated: false,
    game_host_ip: '',
    game_host_ip_error: null,
    recog_host_ip: '',
    recog_host_ip_error: null,
    error: null
  }

  componentWillMount() {
    axios.get('/api/v1/request-ip/')
    .then(response => {
      this.setState({
        game_host_ip: response.data.game_host_ip,
        recog_host_ip: response.data.recog_host_ip
      })
    }).catch(error => {
      console.log(error)
      this.setState({
        error: 'request error'
      })
    })
  }

  handleSubmit = (e) => {
    if (!this.gameHost.value && !this.recogHost.value) {
      return
    }
    e.preventDefault()
    axios.post('/api/v1/update-ip/', {
      game_host_ip: this.gameHost.value,
      recog_host_ip: this.recogHost.value
    })
    .then(response => {
      this.setState({
        updated: true,
        game_host_ip_error: null,
        recog_host_ip_error: null
      })
    })
    .catch(error => {
      console.log(error.response.data)
      const errors = error.response.data
      const newState = {
        updated: false
      }
      for (let key in errors) {
        const errorString = errors[key][0]
        switch (key) {
          case 'game_host_ip':
            newState.game_host_ip_error = errorString
            break
          case 'recog_host_ip':
            newState.recog_host_ip_error = errorString
            break
        }
      }
      this.setState(newState)
    })
  }

  onValChange = (name, value) => {
    this.setState({
      [name]: value
    })
  }

  render () {
    return (
      <div className='home'>
      <form className='signin__form' onSubmit={this.handleSubmit}>
            <div className='signin__input-div'>
              <label htmlFor='game-host'>GAME HOST IP</label>
              <input id='game-host' type='text' value={this.state.game_host_ip} onChange={e => this.onValChange('game_host_ip', e.target.value)} ref={(input) => this.gameHost = input}></input>
              {this.state.game_host_ip_error && <p className='signin__error'>{this.state.game_host_ip_error}</p>}
            </div>
            <div className='signin__input-div'>
              <label htmlFor='recog-host'>RECOGNITION HOST IP</label>
              <input id='recog-host' type='text' value={this.state.recog_host_ip} onChange={e => this.onValChange('recog_host_ip', e.target.value)} ref={(input) => this.recogHost = input}></input>
              {this.state.recog_host_ip_error && <p className='signin__error'>{this.state.recog_host_ip_error}</p>}
            </div>
            <input className='signin__button' type='submit' value='Update'></input>
            {this.state.updated && <p>Success</p>}
            {this.state.error && <p>{this.state.error}</p>}
      </form>
      </div>
    )
  }
}

export default Home
