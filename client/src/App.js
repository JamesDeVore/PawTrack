import React, { Component } from 'react';
import NavBar from './components/NavBar'
import Home from './components/Home'
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import MapItem from './components/map'
import Stream from './components/Stream'
import Upload from './components/Upload'


import './App.css';

class App extends Component {
  render() {
    return (
    <div>
        <NavBar />
       
        <BrowserRouter>
        <Switch>
          <Route exact path = '/' component={Home} />
          <Route exact path ='/stream' component={Stream} />
          <Route exact path='/upload' component={Upload} />
          <Route exact path='/test' component={MapItem} />
        </Switch>
        </ BrowserRouter >
      </div>
      )
  }
}

export default App;
