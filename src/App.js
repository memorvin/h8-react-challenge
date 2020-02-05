import React from 'react';
import './css/tailwind.css';
import NavBar from './components/NavBar'
import Pictures from './containers/Pictures'
import Picture from './containers/Picture'
import Bookmark from './containers/Bookmark'
import Home from './containers/Home'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { PrivateRoute } from './components/PrivateRoute'
import { Provider } from 'react-redux'
import store from './store'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <NavBar />
        <Switch>
          <Route path='/pictures/:date'>
            <Picture />
          </Route>
          <Route path='/pictures'>
            <Pictures />
          </Route>
          <PrivateRoute path='/bookmarks' component={Bookmark} />
          <Route path='/'>
            <Home />
          </Route>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
