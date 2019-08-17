import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter
} from 'react-router-dom';
import { AppContainer } from 'react-hot-loader';
import App from './app';

const render = (App) => {
  return ReactDOM.render(   
    <BrowserRouter>
      <AppContainer>
        <App/>
      </AppContainer>
    </BrowserRouter>, 
    document.getElementById("root")
  );
}
render(App);

if(module.hot){
  module.hot.accept('./app', ()=> {
    console.log("ssss");
    render(require('./app').default)
  })
}