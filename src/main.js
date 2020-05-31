import '@babel/polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import App from './App';

function mountApp() {
    ReactDOM.render(
        <AppContainer>
            <App />
        </AppContainer>,
        document.getElementById('root')
    );
}

mountApp();

if (window?.module?.hot) {
    window.module.hot.accept('./App.js', () => mountApp());
}

