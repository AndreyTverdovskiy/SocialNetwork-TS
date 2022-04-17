import reportWebVitals from './reportWebVitals';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import {Provider} from "react-redux";
import {reduxStore} from "./redux/redux-store";
import SamuraiJSApp from "./App";

ReactDOM.render(
    <React.StrictMode>
            {/*<Provider store={reduxStore}>*/}
            {/*    <App/>*/}
            {/*</Provider>*/}
        <SamuraiJSApp/>
    </React.StrictMode>, document.getElementById('root'));

reportWebVitals();
