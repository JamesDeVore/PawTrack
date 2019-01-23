import React, { Component } from 'react'
import MapItem from "./map";
import moment from 'moment';
import C3Chart from "react-c3js";
import { C3Speed, C3Past, C3Altitude } from '../utils/C3';


export default class PastActivity extends Component {

  render() {
    console.log(this.props)
    let { allData: { coordinates, speed, averageSpeedMPH, totalDistanceM, date, altitude } } = this.props
    speed.unshift('Speed')
    altitude.unshift('Altitude')
    const data = {
      columns: [speed],
      colors: {
        Speed: '#FF6F6E'
      }
    }
    let tooltip = {
      show:false
    } 
    const altData = { columns: [altitude], colors: { Altitude: "#4252E5" } };
    return <div className="recentActivity ">
        <div>
          <h1 className="font-thin">
            {moment(date).format("MMMM Do, h:mm a")}
          </h1>
        </div>
        <div className="flex flex-row">
          <div className="past-map ml-10 mr-10 h-24">
            <MapItem coordinates={coordinates} />
          </div>
          <div className=" flex-col">
            <h3 className="font-thin">Total distance:</h3>
            <p className="font-semibold text-xl">
              {Math.round(totalDistanceM * 100) / 100}
            </p>
            <h3 className="font-thin"> Average Speed:</h3>
            <p className="font-semibold text-xl">
              {Math.round(averageSpeedMPH * 100) / 100}
            </p>
          </div>
          <div className="shadow ml-5 mr-5 rounded border">
            <C3Chart data={data} size={C3Past.size} axis={C3Speed.axis} point={{ r: 0 }} tooltip={tooltip} />
          </div>
          <div className="shadow ml-5 mr-5 rounded border">
            <C3Chart data={altData} size={C3Past.size} axis={C3Altitude.axis} point={{ r: 0 }} tooltip={tooltip} />
          </div>
        </div>
        <hr />
      </div>;
  }
}
