import React, { Component } from 'react';
import qrcode from 'qrcode'

import './App.css'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rotationSpeed: 100,
      string: "http://nathancrank.com",
      rotationTiming: "1s",
      offset: 25,
      offsetPixels: "25px"
    };

    this.generateQRCode()
  }

  handleStringUpdate( value ) {
    this.setState({ string: value.target.value })
    this.generateQRCode()
  }

  handleRotationSpeedUpdate( value ) {
    this.setState({
      rotationSpeed: value.target.value,
      rotationTiming: this.state.rotationSpeed/100 + "s"
    })
    this.generateQRCode()
  }

  handleOffsetUpdate( value ) {
    this.setState({
      offset: value.target.value,
      offsetPixels: this.state.offset + "px"
    })
    this.generateQRCode()
  }

  generateQRCode() {
    qrcode.toDataURL( this.state.string, (error, url) => {
      this.imageURL = url
    } )
  }

  render() {
    return (
      <div className="App" style={{ height: "100%" }}>
        <div>
          <input
            type="text"
            value={this.state.string}
            onChange={ value => this.handleStringUpdate(value) }
          />
          <input
            type="range"
            min="0"
            max="1000"
            step="10"
            value={this.state.rotationSpeed}
            onChange={ value => this.handleRotationSpeedUpdate(value) }
            style={{width:"300px"}}
          />
          {this.state.rotationSpeed}ms
          <input
            type="range"
            min="0"
            max="500"
            step="10"
            value={this.state.offset}
            onChange={ value => this.handleOffsetUpdate(value) }
            style={{width:"300px"}}
          />
          {this.state.offset}px
        </div>
        <div
          className="qrcode"
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <img
            src={this.imageURL}
            style={{
              animationName: "spin",
              animationDuration: this.state.rotationTiming,
              animationTimingFunction: "linear",
              animationIterationCount: "infinite",
              paddingLeft: this.state.offsetPixels
            }}
          />
        </div>
      </div>
    );
  }
}

export default App;
