import React from 'react';
import './App.css';
import Navbar from "./components/Navbar";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Home from "./components/Home";
import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp";
import User from "./components/User";
import NewIdea from "./components/NewIdea";
import jwtDecode from 'jwt-decode'
import axios from 'axios'
// REDUX
import store from "./redux/store";
import { checkIfLoginIn, logOutUser } from './redux/actions/userActions'


const token = localStorage.FBToken;
if (token) {
    const decodedToken = jwtDecode(token);
    if (decodedToken.exp * 1000 > Date.now()) {
        axios.defaults.headers.common['Authorization'] = token;
        store.dispatch(checkIfLoginIn());
    } else {
        store.dispatch(logOutUser());
    }
}

function App() {
  return (
          <div>
              <BrowserRouter>
                  <Navbar/>
                  <Switch>
                      <Route exact path='/' component={Home}/>
                      <Route path='/login' component={LogIn}/>
                      <Route path='/signup' component={SignUp}/>
                      <Route path='/user' component={User}/>
                      <Route path='/newidea' component={NewIdea}/>
                  </Switch>
              </BrowserRouter>
          </div>
  );
}

export default App;
