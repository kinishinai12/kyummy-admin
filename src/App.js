import 'bootstrap/dist/css/bootstrap.min.css';
import HomepageComponent from './component/HomepageComponent';
import HeaderComponent from './component/HeaderComponent';
import ListOfProductComponent from './component/ListOfProductComponent'
import ReadyComponent from './component/ReadyComponent'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import React, { Component } from 'react'
import ReceivedComponent from './component/ReceivedComponent';

class App extends Component {
  render() {
    return (
      <div>
      <Router>
        <HeaderComponent/>
          <Switch>
            <Route path="/" exact component={HomepageComponent}/>
            <Route path="/ready" exact component={ReadyComponent}/>
            <Route path="/receive" exact component={ReceivedComponent}/>
          </Switch>
      </Router>
    </div>
    )
  }
}


export default App;
