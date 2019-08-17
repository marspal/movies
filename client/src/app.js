import React from 'react';
import {
  Route,
  Switch
} from 'react-router-dom';
import routes from './routes'
import "./assets/common.sass"

export default ()=> (
  <Switch>
    {
      routes.map(({name,path,exact=false,component}) => (
        <Route path={path} exact={exact} component={component} key={name}/>
      ))
    }
  </Switch>
);