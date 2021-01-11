import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {App} from './App';
import Form from './Form';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(<Form />, document.getElementById('search-form'));
ReactDOM.render(<p></p>, document.getElementById('results-display'));
registerServiceWorker();
