import React, { Component } from 'react';
import NavBar from './components/NavBar'
import Home from './components/Home'
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import MapItem from './components/map'


import './App.css';

class App extends Component {
  render() {
    return (
    <div>
        <NavBar />
        <MapItem />
        <BrowserRouter>
        <Switch>
          <Route exact path = '/' component={Home} />
        </Switch>
        </ BrowserRouter >
      </div>
      )
  }
}

export default App;
