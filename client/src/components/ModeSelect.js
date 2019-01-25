import React, { Component } from 'react'
import Select from "react-select";
import { FaSave, FaBan, FaPaperPlane } from "react-icons/fa";


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
      selectedOption:null
    }
  }
  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  }
  renderAccept = () => {
    if(this.state.selectedOption){
      return (
        <button className="bg-blue mx-2 hover:bg-blue-light text-white font-bold py-2 pl-2 pr-2 border-b-4 border-blue-dark hover:border-blue rounded" 
        onClick={() => this.changeBTDevice()}>
          Change Mode <FaPaperPlane />
        </button>
      )
    }
  }

  changeBTDevice = async () => {
    try {
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
      window.location.reload()

    } catch {
      console.log('???')
    }
  }

  render() {
    console.log(this.props)
    return <div className= "flex flex-row min-w-24">
        <Select className="dropdown min-w-16" options={options} value={this.state.selectedOption} onChange={this.handleChange} />
        {this.renderAccept()}
      </div>;
  }
}


