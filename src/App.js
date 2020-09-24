import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Projects from "./pages/Projects"
import Header from "./headers/Header"
import Home from "./pages/Home"
import Blog from "./pages/Blog"
import Footer from "./headers/Footer"
function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path ="/">
          <Home />
          <Footer />
        </Route>
        <Route exact path ="/Blog">
          <Blog />
        </Route>
        {/* have to pass component into exact path to get params lol */}
        <Route exact path ="/day/:num" component = {Projects}/>
      </Switch>
    </Router>
  )
   
}
 

export default App;
