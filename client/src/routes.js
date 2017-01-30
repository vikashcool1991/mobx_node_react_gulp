import React from 'react';
import {ReactDOM, render} from 'react-dom';
import { Router, Route, IndexRoute, hashHistory,  } from 'react-router';

import App from './App';
import Home from 'modules/Pages/Home';

function createElement(Component, props){
	return <Component {...props} />
}

export default function getRoutes(App) {
  render((
  	<Router history={hashHistory}>
  		<Router createElement={createElement} />
	    <Route name="root" path="/" component={App}>
	      <IndexRoute component={Home} />
	      
	    </Route>
    </Router>
  ), document.getElementById('root'));
}
