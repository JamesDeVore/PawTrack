import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-responsive-modal';
import {FaExclamationTriangle} from 'react-icons/fa'

export default class ErrorModal extends React.Component {
  state = {
    open: true,
  };

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
    this.props.hide()
  };



  render() {
    let className = {modal:'bg-red-lighter h-1/3 w-72 border-4 border-black'}
    const { open } = this.state;
    return <div>
        <Modal open={open} onClose={this.onCloseModal} center classNames={className}>
          <h2 className="font-thin">
          <FaExclamationTriangle /> Oops! {" "}
          </h2>
          <hr />
          <h4 className="error font-bold text-grey-darker">
            It looks like something went wrong connecting to your BorkBit
          </h4>
          <p className="font-semibold text-grey-darker">
            Please try refreshing the page, resetting the BorkBit, and try
            again
          </p>
          <p className="text-xs font-semibold text-grey-darker">
            Something about a stack trace error...
          </p>
        </Modal>
      </div>;
  }
}
