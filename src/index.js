import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import InBucket from './InBucket';
import DisplayRoom from './DisplayRoom'
import * as serviceWorker from './serviceWorker';
import {
    BrowserRouter as Router,
    Route,
    withRouter,
  } from 'react-router-dom'



class MainApp extends Component{
    constructor(props) {
      super(props);
      this.state = {
        authenticated: true,
      };
    }
  
  render () {

    return (
      <div>
          <Router>
            <div>
              <Route exact path="/" component={App} />
              <Route exact path="/inbucket" component={InBucket} />
                <Route exact path="/displayroom" component={DisplayRoom} />
            </div>
          </Router>
      </div>
    )
  }
  
  }



ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
