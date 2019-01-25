import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Data from './StreamData'
import * as actions from "../actions";
import { FaSave, FaBan, FaUpload } from "react-icons/fa";
import ReactLoading from "react-loading";
import ModeSelect from './ModeSelect'



class Upload extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activityData:"",
      characteristic:null,
      uploading:null
    }
  }

  _handleCharacteristicValueChanged = (event) => {

    let dataString = "";
    //this function reads the incoming bytes
    // console.log(event)
    let buffer = event.target.value.buffer;
    var dataView = new DataView(buffer);
    let data = "";
    for (let i = 0; i < event.target.value.byteLength; i++) {
      let byte = dataView.getInt8(i)
      let character = String.fromCharCode(byte);
      data += character;
    }
    this.setState({activityData:this.state.activityData.concat(data)})
    if(this.state.activityData[this.state.activityData.length-1] === '#'){
      this.setState({uploading:false})
    }
  }
  connectBTDevice = async () => {
    try{
    let options = {
      acceptAllDevices: true,
      optionalServices: ["6e400001-b5a3-f393-e0a9-e50e24dcca9e"]
    };
    console.log('Requesting Bluetooth Device...');
    let device = await navigator.bluetooth.requestDevice(options);
    let server = await device.gatt.connect();
    let service = await server.getPrimaryService('6e400001-b5a3-f393-e0a9-e50e24dcca9e')
    let characteristic = await service.getCharacteristic('6e400003-b5a3-f393-e0a9-e50e24dcca9e')
    if(characteristic){this.setState({uploading:true})}
    await characteristic.startNotifications()
    this.setState({characteristic});
    await characteristic.addEventListener('characteristicvaluechanged', this._handleCharacteristicValueChanged);
    console.log('Device connected, listening for events...');
  } catch {
    console.log('???')
  }
  }

  

  disconnectBTDevice = () => {
    window.location.reload()
  }

  saveAndSubmitData = () => {
    this.props.uploadData(this.state.activityData);
    this.setState({uploading:'done'})
  }

  renderUploadProgress = () => {
    if(this.state.uploading === true) {
      return (
      <ReactLoading type={'spin'} color={"#51d88a"} delay={1000} height={'6em'} width={'6em'} />
      )
    } else if(this.state.uploading === false) {
      return <button onClick={() => this.props.uploadData(this.state.activityData)}
      className="bg-green mx-2 hover:bg-green-light text-white text-xl font-bold py-2 px-6 border-b-4 border-green-dark hover:border-green rounded">
          Save Data <FaSave />
        </button>;
    } else if(this.state.uploading === 'done'){
      return <h1>Data Saved!</h1>
    } 
    
    else {
      return (
        <h2>Click the connect button to get started!</h2>
      )
    }
  }

  render() {
    // console.log(this.props)
    return <div className="min-h-screen  ">
        <div className="infoBar text-white bg-green-light h-16 flex font-lg items-center justify-between px-4">
          <h2 className="stream-info">
            Connect your BorkBit to upload your activity
          </h2>
          
            <div className= " flex flex-row">
            <p className="font-bold mr-6">Select Mode</p>
          <div>
            <ModeSelect />
          </div>
        </div>
          <div>
            <button className="bg-blue mx-2 hover:bg-blue-light text-white font-bold py-2 pl-2 pr-2 border-b-4 border-blue-dark hover:border-blue rounded" onClick={() => this.connectBTDevice()}>
              Connect & Upload <FaUpload />
            </button>
            <button className="bg-red mx-2 hover:bg-red-light text-white font-bold py-2 pl-2 pr-2 border-b-4 border-red-dark hover:border-red rounded" onClick={() => this.disconnectBTDevice()}>
              Disconnect <FaBan />
            </button>
          </div>
        </div>
        <div className="flex flex-row justify-around">
          <div className="upload-instructions h-full">
            <h1 className="font-bold">To Upload:</h1>
            <p className="text-xl">
              First, ensure your BorkBit is within range of your
              computer,and is powered on
            </p>
            <p className="text-xl">
              Then, simply press the connect & upload button, and save your
              data once the upload completes!
            </p>
          </div>
          <div className="upload-progress ">
            <h1>Upload Progress:</h1>

            {this.renderUploadProgress()}
          </div>
        </div>
      </div>;
  }
}


const mapStateToProps = ({  }) => {
  return { };
};

export default
  connect(
    null,
    actions
  )(Upload)