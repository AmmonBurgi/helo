import React from 'react';
import {withRouter} from 'react-router-dom'
import './App.css';
import routes from './routes'
import Nav from './Components/Nav/Nav'


function App(props) {
  // console.log(props)
  return (
    <div className="App">
      {props.location.pathname === '/'
      ? (<>
        {routes}
      </>) : (
        <>
        <Nav /> 
        {routes}
        </>
      )}
    </div>
  );
}

export default withRouter(App);
