import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Data from './StreamData'
import * as actions from "../actions";
import { FaGlobe, FaBan } from "react-icons/fa";



class Stream extends Component {
  constructor(props){
    super(props)
    this.state = {
      device:null
    }
  }

  _handleCharacteristicValueChanged = (event) => {
    

    this.props.streamData(event);
  }
  connectBTDevice = async () => {
    try{
    let options = {
      acceptAllDevices:true,
      optionalServices: ["6e400001-b5a3-f393-e0a9-e50e24dcca9e"]
    };
    console.log('Requesting Bluetooth Device...');
    let device = await navigator.bluetooth.requestDevice(options);
    
    let server = await device.gatt.connect();
    let service = await server.getPrimaryService('6e400001-b5a3-f393-e0a9-e50e24dcca9e')
    let characteristic = await service.getCharacteristic('6e400003-b5a3-f393-e0a9-e50e24dcca9e')
    await characteristic.startNotifications()
    await characteristic.addEventListener('characteristicvaluechanged',this._handleCharacteristicValueChanged);
    console.log('Device connected, listening for events...');
  } catch {
    console.log("????")
  }
  }
  disconnectBTDevice = () => {
    window.location.reload()
  }

render() {
  // console.log(this.props)
  return (
    <div>
      <div className="infoBar text-white bg-green-light h-16 flex font-lg items-center justify-between px-4">
      <h2 className="stream-info">Connect your BorkBit and track your location live!</h2>
      <div>
        <button className="bg-blue mx-2 hover:bg-blue-light text-white font-bold py-2 pl-2 pr-2 border-b-4 border-blue-dark hover:border-blue rounded" onClick={() => this.connectBTDevice()}>Connect <FaGlobe /></button>
        <button className="bg-red mx-2 hover:bg-red-light text-white font-bold py-2 pl-2 pr-2 border-b-4 border-red-dark hover:border-red rounded" onClick={() => this.disconnectBTDevice()}>Disconnect <FaBan /></button>
       </div>
      </div>
      <Data  />
    </div>
  )
}
}


const mapStateToProps = ({ stream }) => {
  return { stream };
};

export default 
  connect(
    null,
    actions
  )(Stream)

