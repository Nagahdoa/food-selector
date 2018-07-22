import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import logo from './logo.png';
import 'semantic-ui-css/semantic.min.css';
import './App.scss';
import FoodListsPage from './pages/FoodListsPage';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>Food Selector</h2>
          </header>
          <div className="App-contents">
            <Switch>
              <Route exact path='/' component={FoodListsPage}/>
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
