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
      show: false
    }
    const altData = { columns: [altitude], colors: { Altitude: "#4252E5" } };
    return <div className="recentActivity ">
      <div>
        <h1 className="font-thin items-center mb-6 mr-8">
          {moment(date).format("MMMM Do, h:mm a")}
        </h1>
        
      </div>
      <div className="flex flex-row justify-between">
        <div className="past-map ml-10 mr-10">
          <MapItem coordinates={coordinates} />
        </div>
        <div className=" flex-col">
          <h3 className="font-thin">Total distance:</h3>
          <h3 className="font-semibold text-2xl">
            {Math.round(totalDistanceM * 100) / 100}
          </h3>
          <h3 className="font-thin"> Average Speed:</h3>
          <h3 className="font-semibold text-2xl">
            {Math.round(averageSpeedMPH * 100) / 100}
          </h3>
        </div>
        <div className="shadow flex flex-row mr-6 rounded border">
          <div className="ml-2 mr-2">
            <C3Chart className="no-tick" data={data} size={C3Past.size} axis={C3Speed.axis} point={{ r: 0 }} tooltip={tooltip} />
          </div>
          <div className="ml-2 mr-2">
            <C3Chart className="no-tick" data={altData} size={C3Past.size} axis={C3Altitude.axis} point={{ r: 0 }} tooltip={tooltip} />
          </div>
        </div>

      </div>
      <hr />
    </div>;
  }
}
