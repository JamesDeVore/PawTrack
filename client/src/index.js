import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers/rootReducer";
import logger from 'redux-logger';
import App from './App'

import "bootstrap/dist/css/bootstrap.css";

import "./App.css";
// import "./css/tailwind.css";

const store = createStore(rootReducer, {}, applyMiddleware(thunk,logger));


ReactDOM.render(
  <Provider store={store}>
        <App />
  </Provider>

  , document.getElementById('root'));


