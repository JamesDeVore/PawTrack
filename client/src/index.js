import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reducers from "./reducers/rootReducer";
import logger from 'redux-logger';
import App from './App'
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";


const createStoreWithMiddleware = applyMiddleware(logger)(createStore);


ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
      <div>
        <App />
      </div>
  </Provider>

  , document.getElementById('root'));


