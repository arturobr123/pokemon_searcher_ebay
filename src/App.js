import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import gear from './gear.svg';
import './App.css';
import Items from './components/Items';
import * as dh from './data-helper';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <p className="App-h2">eBay Pricing Research</p>
        </div>
        <p className="App-intro"></p>
      </div>
    );
  }
}

export { App };
