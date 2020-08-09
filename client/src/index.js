import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from '@chakra-ui/core';
import './index.css';
import { ThemeProvider, CSSReset } from '@chakra-ui/core';
import App from './App';

// In order for Chakra-UI to work, we must wrap the app in the ThemeProvider and CSSReset.
ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
      <CSSReset />
      <Router>
        <App />
      </Router>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
