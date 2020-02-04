import React from 'react';
import './css/tailwind.css';
import NavBar from './components/NavBar'
import Pictures from './pages/Pictures'
import Picture from './pages/Picture'
import Bookmark from './pages/Bookmark'
import Home from './pages/Home'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {
  return (
    <Router>
      <NavBar />
      <Switch>
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
      </Switch>
    </Router>
  );
}

export default App;
