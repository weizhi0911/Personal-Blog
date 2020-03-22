import React,{useEffect} from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './Login';
import Adminlndex from './Adminlndex';

function Main() {
  
    return (
        <Router>
            <Route path="/" exact component={Login}></Route>
            <Route path="/index/" component={Adminlndex}></Route>
           

        </Router>
    )
}

export default Main;