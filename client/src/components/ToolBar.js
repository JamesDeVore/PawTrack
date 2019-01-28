import React, { Component } from 'react'

export default class ToolBar extends Component {
  render() {
    return (
      <div>
        <div className="infoBar text-white bg-green-light h-16 flex font-lg items-center justify-between px-4">
          <h2 className="stream-info">Connect your BorkBit and track your location live!</h2>
          <ModeSelect />
          <div className="flex-row flex h-12">
            <button className="flex-shrink text-sm bg-blue mx-2 hover:bg-blue-light text-white font-bold py-2 pl-2 pr-2 border-b-4 border-blue-dark hover:border-blue rounded" onClick={() => this.connectBTDevice()}>Connect <FaGlobe /></button>
            <button className="flex-shrink text-sm bg-red mx-2 hover:bg-red-light text-white font-bold py-2 pl-2 pr-2 border-b-4 border-red-dark hover:border-red rounded" onClick={() => this.disconnectBTDevice()}>Disconnect <FaBan /></button>
          </div>
        </div>
      </div>
    )
  }
}
