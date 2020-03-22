import React, { Component } from 'react';
import store from '../store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import './App.css';
import CustomRouter from "./CustomRouter";

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <CustomRouter />
                </BrowserRouter>
            </Provider>
        );
    }
}



export default App;