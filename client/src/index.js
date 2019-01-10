import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import reducers from "./reducers/rootReducer";
import logger from 'redux-logger'
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";


const createStoreWithMiddleware = applyMiddleware(logger)(createStore);


ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <div>
        Here there will be some routes
      </div>
    </BrowserRouter>
  </Provider>

  , document.getElementById('root'));


