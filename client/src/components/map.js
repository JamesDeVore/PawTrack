//externals
import React from 'react';
import { connect } from "react-redux";
import * as actions from "../actions";

//open layers and styles
var ol = require('openlayers');
require('openlayers/css/ol.css');

//This component requires Coordinates to be in props
class MapItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      map: null,
      featuresLayer: null,
      coords: []
    };

  }
  /*=====================================================
  currently loading data??????
  =====================================================*/
  componentDidMount() {
    let tile_layer = new ol.layer.Tile({ source: new ol.source.OSM() });

    // create map object with feature layer
    var map = new ol.Map({
      target: this.refs.mapContainer,
      layers: [
        //default OSM layer
        tile_layer
      ]
    });

//save map on state to allow modifications or other interactions
    this.setState({
      map: map
        });
    // map.on('click', this.handleMapClick.bind(this));

    // save map and layer references to local state
  }
  componentDidUpdate(prevProps, prevState) {
    //drawing the line on the map
    //component updates when the coodinate data comes in after the fetch
    let tile_layer = new ol.layer.Tile({ source: new ol.source.OSM() })
    var linestring_feature = new ol.Feature({
      geometry: new ol.geom.LineString(this.props.coordinates)
    });
    //openlayers layer construction. needs tile layers, features, vector layers
    var featuresLayer = new ol.layer.Vector({
      source: new ol.source.Vector({
        features: [linestring_feature]
      })
    });
    var fill = new ol.style.Fill({
      color: [180, 0, 0, 0.3]
    });

    var stroke = new ol.style.Stroke({
      color: [180, 0, 0, 1],
      width: 3
    });
    var style = new ol.style.Style({
      fill: fill,
      stroke: stroke
    });
    featuresLayer.setStyle(style);
    let features = [linestring_feature];

    features.forEach(feature => {
      var current_projection = new ol.proj.Projection({ code: "EPSG:4326" });
      var new_projection = tile_layer.getSource().getProjection();

      feature.getGeometry().transform(current_projection, new_projection);
    });
    featuresLayer.setZIndex(10);

    this.state.map.addLayer(tile_layer);
    //prevent crashes?
    if (this.props.coordinates.length > 1) {
      this.state.map.addLayer(featuresLayer)
      this.state.map.setView(new ol.View({
          center: ol.proj.fromLonLat([this.props.coordinates[0][0], this.props.coordinates[0][1]]), //Durham
          zoom: 15
        }));
    }
  }


  render() {
    return <div className=" shadow border-grey rounded-lg border-2 map-item" ref="mapContainer"> </div>;
  }
}
export default
  connect(
    null,
    actions
  )(MapItem)