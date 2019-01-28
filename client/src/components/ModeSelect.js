import React, { Component } from 'react'
import Select from "react-select";
import { FaPaperPlane } from "react-icons/fa";
import ErrorModal from "./ErrorModal";

/*=====================================================
handles all browser -> borkbit communication.
the characteristic here (6e400002-b5a3-f393-e0a9-e50e24dcca9e)
is the characteristic the unit has for recieving information
=====================================================*/

const options = [
  { value: 1 , label: 'Upload Data' },
  { value: 2 , label: 'Live Stream'},
  { value: 3 , label: 'Record Data'},
  { value: 4 , label: 'Clear SD'}
]

export default class ModeSelect extends Component {
  constructor(props){
    super(props)
    this.state = {
      selectedOption:{value:0},
      characteristic:null,
      currentMode:null,
      errorModal:false,
    }
  }
  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  }
  renderAccept = () => {
    if(this.state.selectedOption.value === 5){
      //currently unused, no way for arduino to boadcast its mode without interfereing with upload and stream
      return <div>
          <button className="flex-shrink bg-blue mx-2 hover:bg-orange-light text-white font-bold py-2 pl-2 pr-2 border-b-4 border-orange-dark hover:border-orange rounded" 
          onClick={() => this.checkMode()}>
            Check Mode <FaPaperPlane />
          </button>
          <p> Current Mode: {this.state.currentMode}</p>
        </div>;
    }
     else if(this.state.selectedOption.value > 0){
      return (
        <button className="select-mode text-sm flex-shrink h-10 bg-orange mx-2 hover:bg-orange-light text-white font-bold py-2 border-b-4 border-orange-dark hover:border-orange rounded" 
        onClick={() => this.changeBTDevice()}>
          Change Mode <FaPaperPlane />
        </button>
      )
    }
  }

  _handleCharacteristicValueChanged = (event) => {
    //this function reads the incoming bytes
    let buffer = event.target.value.buffer;
    var dataView = new DataView(buffer);
    let data = "";
    for (let i = 0; i < event.target.value.byteLength; i++) {
      let byte = dataView.getInt8(i)
      let character = String.fromCharCode(byte);
      data += character;
    }
    console.log(data)
    let currentMode = options.find(option => option.value == data);
    this.setState({currentMode:currentMode.label})
  }

  changeBTDevice = async () => {
 try{
      let options = {
        acceptAllDevices: true,
        optionalServices: ["6e400001-b5a3-f393-e0a9-e50e24dcca9e"]
      };
      console.log('Requesting Bluetooth Device...');
      let device = await navigator.bluetooth.requestDevice(options);
      let server = await device.gatt.connect();
      let service = await server.getPrimaryService('6e400001-b5a3-f393-e0a9-e50e24dcca9e')
      let characteristic = await service.getCharacteristic('6e400002-b5a3-f393-e0a9-e50e24dcca9e')
      await characteristic.writeValue(Uint8Array.of(parseInt(this.state.selectedOption.value)))
      // window.location.reload()
    } catch {
   this.setState({ errorModal: true })
    }
  }
//unused function to keep track of mode
  checkMode = async () => {
    try {
      let options = {
        acceptAllDevices: true,
        optionalServices: ["6e400001-b5a3-f393-e0a9-e50e24dcca9e"]
      };
      console.log('Requesting Bluetooth Device...');
      let device = await navigator.bluetooth.requestDevice(options);
      let server = await device.gatt.connect();
      let service = await server.getPrimaryService('6e400001-b5a3-f393-e0a9-e50e24dcca9e')
      let characteristic = await service.getCharacteristic('6e400003-b5a3-f393-e0a9-e50e24dcca9e')
      let sendChar = await service.getCharacteristic("6e400002-b5a3-f393-e0a9-e50e24dcca9e");
      await sendChar.writeValue(Uint8Array.of(parseInt(this.state.selectedOption.value)));
      await characteristic.startNotifications()
      this.setState({ characteristic });
      await characteristic.addEventListener('characteristicvaluechanged', this._handleCharacteristicValueChanged);
      console.log('Device connected, listening for events...');
      // window.location.reload()
    } catch {
      this.setState({ errorModal: true })
    }
  }
//error modal handling
  hideModal = () => {
    this.setState({ modal: false })
  }
  renderModal = () => {
    if (this.state.errorModal) {
      return <ErrorModal hide={this.hideModal} />
    } else {
      return
    }
  }

  render() {
    console.log(this.props)
    return <div className= " mode-select flex flex-row flex-shrink content-center ">
      {this.renderModal()}
        <p className="mode-p font-bold mr-6">Select Mode</p>
        <Select className="dropdown flex-shrink max-w-6" options={options} value={this.state.selectedOption} onChange={this.handleChange} />
        {this.renderAccept()}
      </div>;
  }
}


