import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import logo from './logo.png';
import 'semantic-ui-css/semantic.min.css';
import './App.scss';
import FoodListsPage from './pages/FoodListsPage';
import RecipesPage from './pages/RecipesPage';

import { Provider } from 'react-redux';
import createReduxStore from './store';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Provider store={createReduxStore()}>
          <div className="App">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h2>Food Selector</h2>
            </header>
            <div className="App-contents">
              <Switch>
                <Route path='/recipes' component={RecipesPage}/>
                <Route exact path='/' component={FoodListsPage}/>
              </Switch>
            </div>
          </div>
        </Provider>
      </BrowserRouter>
    );
  }
}

export default App;
