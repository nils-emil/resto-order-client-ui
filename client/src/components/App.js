import React, {Component} from 'react';
import ClientCodeEntry from '../pages/ClientCodeEntry/ClientCodeEntry';
import FoodPicker from '../pages/FoodPicker/FoodPicker';
import Header from './Header'
import {BrowserRouter as Router, Route} from "react-router-dom"

class App extends Component {
  render() {
    return (
      <div>
        <Header
          appName={this.props.appName}
          currentUser={this.props.currentUser}/>
        <span>
          <Router>
            <Route path="/food" component={FoodPicker}/>
            <Route exact path="/" component={ClientCodeEntry}/>
          </Router>
        </span>
      </div>
    );
  }
}

export default App;
