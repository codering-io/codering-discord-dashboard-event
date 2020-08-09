import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { ThemeProvider, CSSReset } from '@chakra-ui/core';
import App from './App';

// In order for chalkra-ui to work, we must wrap the app in the themeProvider and CSS Reset
ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
      <CSSReset />
      <App/>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
