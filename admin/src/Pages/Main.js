import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Login from './Login'
import Adminlndex from './Adminlndex'
// import Toys from './Toys'

function Main() {
  return (
    <Router>
      <Route path="/login" exact component={Login}></Route>
      <Route path="/admin" component={Adminlndex}></Route>
    </Router>
  )
}

export default Main
