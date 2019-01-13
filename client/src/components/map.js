//externals
import ReactDOM from 'react-dom';
import React from 'react';

//open layers and styles
var ol = require('openlayers');
require('openlayers/css/ol.css');

class MapItem extends React.Component {

  componentDidMount() {

    // create map object with feature layer
    var map = new ol.Map({
      target: this.refs.mapContainer,

      layers: [
        //default OSM layer
        new ol.layer.Tile({
          source: new ol.source.OSM()
          
        }),
      ],

      view: new ol.View({
        center: [-11718716.28195593, 4869217.172379018], //Boulder
        zoom: 13,
      })

    });

    // map.on('click', this.handleMapClick.bind(this));

    // save map and layer references to local state
  }

  render() {
    return (
      <div ref="mapContainer"> </div>
    );
  }

}

export default MapItem;