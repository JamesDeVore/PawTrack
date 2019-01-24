import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as actions from "../actions";
import MapItem from "./map";
var ol = require("openlayers");
require("openlayers/css/ol.css");

class Data extends Component {
  constructor(props){
    super(props)
    this.state = { map: null, features: null, prevLat:null, prevLng: null };
  }

   componentDidMount() {

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
         center: ol.proj.fromLonLat([-78.898621, 35.994034]), //Durham
         zoom: 10
       }));
     
    // save map and layer references to local state
    this.setState({
      map: map
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
      this.addPointToMap()
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





  render() {
    let {lat, lng} = this.props.stream;
    return <div className="flex w-full flex-row min-h-full px-auto">
        <div className="min-h-full w-1/2" ref="streamMap" />
        <div className="mb-8 px-8 mt-8 ">
          <h1 className="font-xl font-bold">Latitude:{lat}</h1>
          <br />
          <br />
          <h1 className="font-xl font-bold leading-loose">Longitude:{lng}</h1>
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
