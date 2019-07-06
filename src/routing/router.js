import React from 'react';
import { Switch, Router, Route } from 'react-router-dom';
import history from './history';
import Home from '../containers/Home/Home';

class App extends React.Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route path='/' component={Home}/>
        </Switch>
      </Router>
    )
  }
}

export default App;