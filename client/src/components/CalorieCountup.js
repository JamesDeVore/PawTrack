import React, { Component } from 'react'
import styled from 'styled-components'

/*=====================================================
handles the animated count up of calories
requires calories as a pro
=====================================================*/

export default class CalorieCountUp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      calorieCount:1
    }
  }

  //renders the actual numbers
  calorieDisplay =  () => {
    let {calorieCount} = this.state
    let {calories} = this.props
    //handles the porportions of color values to change the text color in styled component
    let colors = {
      red: (10/calorieCount) * 255,
      green: (calorieCount/calories) * 200,
      blue: 10,
      calPercent:(calorieCount/calories) * 100
    }
    if(calorieCount < calories) {
      //sets the time to increment slower the closer the two counts are
      setTimeout(() => {this.setState({calorieCount:calorieCount + 1})},Math.round(calorieCount/( calories) * 400));

      return (<div className="cal-counter align-center items-center content-center justify-center w-full">
        <h2 className="font-semibold">Total Calories:</h2>
        <hr />
        <div className=" cal-bar flex justify-center">
          <Counter className=" font-bold text-4xl " colors={colors}>{calorieCount}</Counter></div>
      </div>)
    } else {
      return (
        <div className="cal-counter align-center items-center content-center justify-center w-full">
          <h2 className="font-semibold">Total Calories:</h2>
          <hr />
          <div className=" cal-bar flex  justify-center">
            <Counter className=" font-bold text-4xl " colors={colors}>{calorieCount}</Counter></div>
        </div>)
  }
}

  render() {
    return (
      <div>
        {this.calorieDisplay()}
      </div>
    )
  }
}



const Counter = styled("h2")`
  color: rgb(${props => props.colors.red}, ${props => props.colors.green}, 30);
  width: ${props => props.colors.calPercent}%;
  border-top: 14px solid
    rgb(${props => props.colors.red}, ${props => props.colors.green}, 30);
  border-radius:5px;
    
`;
