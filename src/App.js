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
import { Provider } from 'react-redux'
import store from './store'
import { spring, AnimatedSwitch } from 'react-router-transition';

function bounce(val) {
  return spring(val, {
    stiffness: 300,
    damping: 22,
  });
}

const bounceTransition = {
  atEnter: {
    opacity: 0,
    scale: 1.6,
  },
  atLeave: {
    opacity: bounce(0),
    scale: bounce(1.8),
  },
  atActive: {
    opacity: bounce(1),
    scale: bounce(1),
  },
};

function App() {
  return (
    <Provider store={store}>
      <Router>
        <NavBar />
        <Switch>
        <AnimatedSwitch
          atEnter={bounceTransition.atEnter}
          atLeave={bounceTransition.atLeave}
          atActive={bounceTransition.atActive}
          runOnMount={true}
        >
          <Route path='/pictures/:date'>
            <Picture />
          </Route>
          <Route path='/pictures'>
            <Pictures />
          </Route>
          <Route path='/bookmarks'>
            <Bookmark />
          </Route>
          <Route path='/'>
            <Home />
          </Route>
        </AnimatedSwitch>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
