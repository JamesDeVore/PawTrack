import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import MapItem from './map'
import styled from 'styled-components'
import * as actions from "../actions";
import "c3/c3.css";
import moment from 'moment'
import PastActivityItem from './PastActivityItem'
import { C3Speed, C3Altitude } from '../utils/C3'
import c3 from 'c3'
import CalorieCountup from './CalorieCountup'


export class YourData extends Component {

  componentDidMount() {
    this.props.fetchMostRecentData()
    this.props.fetchAllData();

  }

  renderRecentActivity = () => {
    if (this.props.recent.coordinates) {
      let speedDataWithLegend = this.props.recent.speed;
      speedDataWithLegend.unshift("Speed");
      let altDataWithLegend = this.props.recent.altitude;
      altDataWithLegend.unshift("Altitude");
      const Data = { speed: { columns: [speedDataWithLegend], colors: { Speed: "#FF6F6E" } }, altitude: { columns: [altDataWithLegend], colors: { Altitude: "#4252E5" } } };
      let noPoint = {r:0}
      //now to make the charts
      let speedChart = c3.generate({
        bindto:'#recentSpeed',
        data:Data.speed,
        axis:C3Speed.axis,
        size:C3Speed.size,
        point:noPoint,
        types:{
          Speed:'area'
        },
        zoom:{enabled:true},
        tooltip: {
          show: false
        }
      });
      let altitudeChart = c3.generate({
        bindto: '#recentAltitude',
        data: Data.altitude,
        axis: C3Altitude.axis,
        size: C3Speed.size,
        point: noPoint,
        zoom: { enabled: true },
        tooltip: {
          show: false
        }
      })

      return <div className=" bg-blue-lightest recentActivity flex flex-column pb-12 ">
          <h1 className="font-bold">Recent Activity:</h1>
  
          <h1 className="font-thin ">
            {moment(this.props.recent.date).format("MMMM Do, h:mm a")}
          </h1>
          <RecentStatsAndMap className="recent-stats  ">
            <div className=" recentMap mr-4 ml-4 w-1/6">
              <MapItem coordinates={this.props.recent.coordinates} />
            </div>
            <Stats className="ml-8">
              <h3 className="font-semibold ">
                Average Speed:
                <hr />
                <span className="font-thin">
                  {Math.round(this.props.recent.averageSpeedMPH * 100) /
                    100}{" "}
                  mph
                </span>
              </h3>

              <h3 className="font-semibold ">
                Total Distance:
                <hr />
                <span className="font-thin">
                  {Math.round(this.props.recent.totalDistanceM * 100) /
                    100}{" "}
                  miles
                </span>
              </h3>
            </Stats>
            <div className="charts flex-row flex justify-center flex-wrap">
            <div>
              <h3 className="font-thin no-tick ">Speed:</h3>
              <div id="recentSpeed" />
            </div>
            <div>
              <h3 className="font-thin no-tick">Altitude:</h3>
              <div id="recentAltitude" />
            </div>
            <CalorieCountup calories={this.props.recent.calories} />

          </div>
            
          </RecentStatsAndMap>
        </div>;
    } else {
      return <div>Loading Recent Activity...</div>
    }
  }
  renderPastActivityItems = () => {
    if (this.props.data.length > 1) {
      this.props.data.shift()
      let id = 0;
      return (
        this.props.data.map(pastItems => {
          id++
          return <PastActivityItem allData={pastItems} key={id} />
        })
      )
    }
  }

  render() {
    return (
      <div>
        {this.renderRecentActivity()}
        <hr />

        {this.renderPastActivityItems()}
      </div>
    )
  }
}

const RecentStatsAndMap = styled('div')`

display:flex;
flex-direction:row;
justify-content:center;

`
const Stats = styled('div')`
display:flex;
flex-direction:column;
justify-content:space-between;
`



const mapStateToProps = ({ recent, data }) => {
  return { recent, data };
};

export default
  connect(
    mapStateToProps,
    actions
  )(YourData)
