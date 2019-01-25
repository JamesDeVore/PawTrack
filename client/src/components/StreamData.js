import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as actions from "../actions";
import MapItem from "./map";
import c3 from "c3";
import { C3Speed, } from "../utils/C3";

var ol = require("openlayers");
require("openlayers/css/ol.css");

class Data extends Component {
  constructor(props){
    super(props)
    this.state = { map: null, features: null, prevLat:null, prevLng: null, speedChart:null };
    console.log(this.props.stream.speed);

  }

  componentDidMount() {
    let speedChart = c3.generate({
      bindto: "#liveSpeed",
      data: {
        columns:[this.props.stream.speed]},
      axis: C3Speed.liveAxis,
      size: C3Speed.size,
      // point: noPoint,
      types: {
        Speed: "area"
      },
      zoom: { enabled: true },
      tooltip: {
        show: false
      }
    });
    // create feature layer and vector source


    // create map object with feature layer
    var map = new ol.Map({
      target: this.refs.streamMap,
      layers: [
        //default OSM layer
        new ol.layer.Tile({
          source: new ol.source.OSM()
        })
      ]
    });
     map.setView(new ol.View({
         center: ol.proj.fromLonLat([-78.899621, 35.999999]), //Durham
         zoom: 16
       }));
     
    // save map and layer references to local state
    this.setState({
      map: map,
      speedChart
    });


  }

  shouldComponentUpdate(nextProps, nextState) {
    if(this.props.stream.lat !== nextProps.stream.lat) {
      let layers = this.state.map.getLayers()
      console.log(layers.a)

      for (let i = 1; i < layers.a.length; i++) {
        console.log(layers.a[i])
        let source = layers.a[i].getSource()
        source.clear()
      }
      let view = this.state.map.getView();
      view.setCenter(ol.proj.fromLonLat([parseFloat(this.props.stream.lng),parseFloat(this.props.stream.lat)]));
      this.addPointToMap()
      this.state.speedChart.flow({
        columns:[this.props.stream.speed],
        duration:1000
      })
      return true;
    } else {
      return false
    }
  }


addPointToMap = () => {
  if (this.state.map) {
    let tile_layer = new ol.layer.Tile({ source: new ol.source.OSM() });
    let point_feature = new ol.Feature({});
    let point_geom = new ol.geom.Point([parseFloat(this.props.stream.lng), parseFloat(this.props.stream.lat)]);
    point_feature.setGeometry(point_geom);
    var vector_layer = new ol.layer.Vector({
      source: new ol.source.Vector({
      })
    })
    let featuresArray = vector_layer.getSource().getFeatures()
    featuresArray.forEach(feature => {
      vector_layer.getSource().removeFeature(feature)
    })
    vector_layer.getSource().addFeature(point_feature);

    var features = [
      point_feature
    ];

    features.forEach(element => {
      var current_projection = new ol.proj.Projection({ code: "EPSG:4326" });
      var new_projection = tile_layer.getSource().getProjection();

      element.getGeometry().transform(current_projection, new_projection);
    })
    var fill = new ol.style.Fill({
      color: [255, 0, 0, 1]
    });

    var stroke = new ol.style.Stroke({
      color: [255, 0, 0, 1],
      width: 0.5
    });
    var style = new ol.style.Style({
      image: new ol.style.Circle({
        fill: fill,
        stroke: stroke,
        radius: 3
      }),
      fill: fill,
      stroke: stroke
    });
    vector_layer.setStyle(style);
    this.state.map.addLayer(vector_layer);
  }
}

  renderLiveChart = () => {
    
  }



  render() {
    let {lat, lng} = this.props.stream;
    return <div className="flex flex-shrink mt-12 ml-12 w-full flex-row min-h-screen pb-16 px-auto">
        <div className=" w-1/2 min-h-24 shadow border-grey rounded-lg border-2 map-item" ref="streamMap" />
        <div className="mb-8 px-8 mt-8 ">
          <h2 className="font-xl px-4 shadow font-bold rounded-lg leading-loose">
            Latitude: &nbsp;{lat} &#176;
          </h2>
          <br />
          <h2 className="font-xl px-4 shadow font-bold leading-loose rounded-lg">
            Longitude: &nbsp;{lng} &#176;
           
          </h2>
        <br />
          <div className=" px-6  " id="liveSpeed" />
        </div>
      </div>;
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
