import React, { Component } from 'react';
import * as actions from "../actions";
import MyCarousel from './carousel';
import { connect } from 'react-redux';
import c3 from "c3";
import moment from 'moment';
import PastActivity from './PastActivityItem';
import ModeSelect from './ModeSelect'
import { FaGlobe, FaBan, FaStar } from "react-icons/fa";



export class Home extends Component {

  componentDidMount() {
    this.props.fetchAllData();
    this.props.fetchDashData();
  }
  componentDidUpdate() {
    let dataColumns = []
    let xColumn = []
    let speedData = this.props.data.map(activity => activity.averageSpeedMPH)
    let distanceData = this.props.data.map(activity => [activity.totalDistanceM, activity.date]);
    distanceData.forEach(point => dataColumns.unshift(point[0]))
    distanceData.forEach(point => xColumn.unshift(moment(point[1]).format("YYYY-MM-DD")))
    speedData.unshift('Speed')
    dataColumns.unshift("Distance");
    let totalDistance = this.props.dash.totalDistanceOverall
    let distanceAndSpeedChart = c3.generate({
      bindto: "#totalDistance",
      data: {
        type: "bar",
        types: {
          Speed: "spline"
        },
        columns: [dataColumns, speedData],
        labels: {
          format: function (v, id, i, j) {
            return Math.round(v * 100) / 100;
          }
        },
        axes: {
          Distance: "y",
          Speed: "y2"
        },
        colors: {
          Distance: "#6CB2EB",
          Speed: "#F6993F"
        }
      },
      title: {
        text: "Distances & Average Pace"
      },
      axis: {
        x: {
          label: "Activity Date",
          type: "category",
          categories: xColumn
        },
        y: {
          label: "Distance (m)"
        },
        y2: {
          show: true,
          label: "Speed (mph)"
        }
      },
      size: {
        width: 500,
        height: 300
      }
    });
    let calColumns = this.props.data.map(activity => [moment(activity.date).format("MM-D, hh a"), activity.calories])
    console.log(calColumns)
    let caloriesChart = c3.generate({
      bindto: "#calories",
      data: {
        columns: calColumns,
        type: "donut"
      },
      donut: {
        label: {
          format: function (value, ratio, id) {
            return value;
          }
        },
        title: this.props.dash.calories,
        expand: true,
        color: "#6CB2EB"
      }
    });
    let totalDistanceChart = c3.generate({
      bindto: "#totalDistanceOverall",
      data: {
        columns: [
          ['Distance', 0]
        ],
        type: 'gauge',
      },
      transition: {
        duration: 4000
      },
      gauge: {
        label: {
          format: function (value, ratio) {
            return Math.round(value * 100) / 100;
          }
        },
        show: false, // to turn off the min/max labels.
        //        },
        //    min: 0, // 0 is default, //can handle negative min e.g. vacuum / voltage / current flow / rate of change
        max: (Math.round(this.props.dash.totalDistanceOverall * 100) / 100), // 100 is default
        units: 'Miles',
        //    width: 39 // for adjusting arc thickness
      },
      color: {
        pattern: ['#FF0000', '#F97600', '#F6C600', '#60B044'], // the three color levels for the percentage values.
        threshold: {
          unit: 'value', // percentage is default
          //            max: 200, // 100 is default
          values: [totalDistance]
        }
      },
      size: {
        height: 180
      }
    });
    setTimeout(function () {
      totalDistanceChart.load({
        columns: [['Distance', parseFloat(totalDistance) / 4]]
      });
    }, 1000);
    setTimeout(function () {
      totalDistanceChart.load({
        columns: [['Distance', parseFloat(totalDistance) / 2]]
      });
    }, 2000);
    setTimeout(function () {
      totalDistanceChart.load({
        columns: [['Distance', 3 * parseFloat(totalDistance) / 4]]
      });
    }, 3000);
    setTimeout(function () {
      totalDistanceChart.load({
        columns: [['Distance', parseFloat(totalDistance)]]
      });
    }, 4000);
  }

  render() {
    if (this.props.dash.totalDistanceOverall) {
      return <div className="">
          <div className="infoBar text-white bg-green-light h-16 flex items-center justify-between">
            <h2 className="stream-info w-2/5 ">
              Connect your BorkBit to track and upload data!
            </h2>
            <ModeSelect />
            <div className="no-wrap">
              <button className="bg-blue mx-2 hover:bg-blue-light text-white font-bold py-2 pl-2 pr-2 border-b-4 border-blue-dark hover:border-blue rounded" onClick={() => this.connectBTDevice()}>
                Connect <FaGlobe />
              </button>
              <button className="bg-red mx-2 hover:bg-red-light text-white font-bold py-2 pl-2 pr-2 border-b-4 border-red-dark hover:border-red rounded" onClick={() => this.disconnectBTDevice()}>
                Disconnect <FaBan />
              </button>
            </div>
          </div>
          {/* <MyCarousel /> */}
        <h1 className=" text-6xl text-blue-dark font-bold">Welcome Back!</h1>
          <p className="font-thin text-2xl">Here is your progress so far!</p>
          <div className="flex flex-row charts items-center text-center content-center justify-between mx-8">
            <div className="home-chart cal-display shadow px-6">
              <h1>Total Calories:</h1>
              <div id="calories" />
            </div>
          <div className=" home-chart distance-display shadow px-12">
              <h1>Recent Trends:</h1>
              <div id="totalDistance" />
            </div>
          <div className="home-chart flex flex-col shadow px-12">
              <h1>Total Distance:</h1>
              <h3>
                {Math.round(this.props.dash.totalDistanceOverall * 100) /
                  100}{" "}
                miles
              </h3>
              <div id="totalDistanceOverall" />
            </div>
          </div>

          <div>
            <hr />
            <h1 className="record text-3xl text-yellow-dark font-bold">
              <FaStar />  Your fastest activity to date! <FaStar />
            </h1>
            <PastActivity allData={this.props.dash.fastestPaceActivity} />
          </div>
        </div>;
    } else {
      return <div>Loading...</div>
    }
  }
}

const mapStateToProps = ({ dash, data }) => {
  return { dash, data };
};

export default
  connect(
    mapStateToProps,
    actions
  )(Home)
