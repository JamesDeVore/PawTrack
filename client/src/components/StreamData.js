import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as actions from "../actions";



class Data extends Component {



  render() {
    let {lat, lng} = this.props.stream;
    return (
      <div>
        <h1>lat:{lat}</h1>
        <h1>lng:{lng}</h1> 
      </div>
    )
  }
}

const mapStateToProps = ({ stream }) => {
  return { stream };
};

export default
  connect(
    mapStateToProps,
    actions
  )(Data)
