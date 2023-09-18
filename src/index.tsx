import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './style/index.scss'
import { Provider } from 'react-redux';
import 'swiper/css';
import store from './redux/store';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(

   <Provider store={store}>
   <App />
   </Provider>
 
);