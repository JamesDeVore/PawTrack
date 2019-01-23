//externals
import ReactDOM from 'react-dom';
import React from 'react';
import Feature from "ol/Feature";
import LineString from "ol/geom/LineString";
import { connect } from "react-redux";
import * as actions from "../actions";

//open layers and styles
var ol = require('openlayers');
require('openlayers/css/ol.css');

class MapItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      map: null,
      featuresLayer: null,
      coords: []
    };

    console.log(this.props, "first");

  }


  /*=====================================================
  currently loading data??????
  =====================================================*/
  componentDidMount() {
    console.log(this.props, "second");
    this.props.fetchCoords()
    let tile_layer = new ol.layer.Tile({ source: new ol.source.OSM() });

    // create map object with feature layer
    var map = new ol.Map({
      target: this.refs.mapContainer,
      layers: [
        //default OSM layer
        tile_layer
      ],
      view: new ol.View({
        center: ol.proj.fromLonLat([-78.90131, 35.99622]), //DUrham        
        zoom: 14.5
      })
    });


    this.setState({
      map: map
        });
    // map.on('click', this.handleMapClick.bind(this));

    // save map and layer references to local state
  }
  componentDidUpdate(prevProps, prevState) {
    console.log("UPDATED", this.props.coords)
    let tile_layer = new ol.layer.Tile({ source: new ol.source.OSM() })
    var linestring_feature = new ol.Feature({
      geometry: new ol.geom.LineString(this.props.coords)
    });

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
      width: 2
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
    if (this.props.coords.length > 1) {
      console.log(featuresLayer)
      this.state.map.addLayer(featuresLayer)
    }

  }


  render() {
    return <div ref="mapContainer"> </div>;
  }
}

const mapStateToProps = ({ coords }) => {
  return { coords };
};

export default
  connect(
    mapStateToProps,
    actions
  )(MapItem)