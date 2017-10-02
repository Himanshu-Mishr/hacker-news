import React from 'react';
import ReactDOM from 'react-dom';
// import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import blue from 'material-ui/colors/blue';
import './index.css';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';
import store from './store';

console.table(store.getState());
store.subscribe(function() {
  console.table(store.getState());
});

const theme = createMuiTheme({
  palette: {
    primary: blue,
    // type: 'dark'
  }
});


ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <App />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();
