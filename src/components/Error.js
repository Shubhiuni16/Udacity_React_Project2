import React, { Component } from 'react'
import { connect } from 'react-redux'
import NavigationBar from './NavigationBar'
import {Link} from 'react-router-dom'

class Error extends Component {


  render() {
    return (
      <div>
        <NavigationBar />
        <h1>404<br /> PAGE NOT FOUND</h1>
        <Link to={"/"}> BACK TO HOME </Link>
        </div>
    )
  }
}



export default connect()(Error)