import React from 'react';
import { FaPaw } from 'react-icons/fa';


export default class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return <nav className="flex items-center justify-between flex-wrap bg-blue-light p-4">
        <div className="flex items-center flex-no-shrink text-white mr-6">
        <span classNameName='font-bold text-xl tracking-light' ><FaPaw /> &nbsp;</span>
          <a href="/" className="font-semibold text-xl text-white tracking-tight ">
            Run, Myrah, Run!
          </a>
        </div>
        <div className="block lg:hidden">
          <button className="flex items-center px-3 py-2 border rounded text-teal-lighter border-teal-light hover:text-white hover:border-white">
            <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <div className="text-md lg:flex-grow">

          </div>
          <div>
            <a href="/stream" className="inline-block font-semibold text-md px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-black hover:bg-green-light mt-2 mr-1  ml-1 lg:mt-0">
              Stream Activity Live!
            </a>
          <a href="/upload" className="inline-block font-semibold text-md px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-black hover:bg-green-light mt-2 mr-1  ml-1 lg:mt-0">
            Upload Activity
            </a>
          <a href="/data" className="inline-block font-semibold text-md px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-black hover:bg-green-light mt-2 mr-1  ml-1 lg:mt-0">
            Your Past Activities
            </a>
          </div>
        </div>
      </nav>;
  }
}