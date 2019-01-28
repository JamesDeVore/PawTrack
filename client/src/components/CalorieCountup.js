import React, { Component } from 'react'
import styled from 'styled-components'

export default class CalorieCountUp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      calorieCount:1
    }
  }
  componentDidMount() {
    // this.setState({calorieCount:this.props.calories})

  }

  calorieDisplay =  () => {
    let {calorieCount} = this.state
    let {calories} = this.props

    let colors = {
      red: (10/calorieCount) * 255,
      green: (calorieCount/calories) * 200,
      blue: 10,
      test:"green"
    }
    console.log(colors)
    if(calorieCount < calories) {
      setTimeout(() => {this.setState({calorieCount:calorieCount + 1})},Math.round(calorieCount/( calories) * 400));

      return (
        <div className="content-center justify-center w-full">
          <h3 className="font-thin">Total Calories Burned:</h3>
          <Counter className=" font-semibold text-4xl " colors={colors}>{calorieCount}</Counter>
        </div>
      )
    } else {
      return (
        <div className="content-center justify-center w-full">
          <h3 className="font-thin">Total Calories Burned:</h3>
          <Counter className=" font-semibold text-4xl " colors={colors}>{calorieCount}</Counter>
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
color:rgb(${props => props.colors.red},${props => props.colors.green },30);
`;
