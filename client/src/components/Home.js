import React, { Component } from 'react'
import { Jumbotron, Button } from "reactstrap"
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom';
import Carousel from './carousel'

import { connect } from 'react-redux'

export class Home extends Component {
  static propTypes = {
    prop: PropTypes
  }

  render() {
    return <div className="container">
        <Jumbotron>
          <h1 className="display-3">Run, Myrah, Run!</h1>
          <p className="lead">
            Ready to keep track of your dog's health and welness? Why are
            humans the only ones who get to track steps?{" "}
          </p>
          <hr className="my-2" />
          <p className="lead">Reach your fitness goals together!</p>
          <p className="lead">
            <Link to="/about">
              <Button color="primary">Learn More About Us</Button>
            </Link>
          </p>
        </Jumbotron>
        <div className="row carousel">
          <div className="col-md-10 col-offset-1">
            <Carousel />
          </div>
        </div>
      </div>;
  }
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
