import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import blue from 'material-ui/colors/blue';
import './index.css';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';
import store from './store';
import { BrowserRouter } from 'react-router-dom'


// to override default theme palette
const theme = createMuiTheme({
  palette: {
    primary: blue,
    // type : 'dark'
  }
});

// store.subscribe(() => {
//   let {currentlyViewingStory, viewedStoryIdList} = store.getState();
//   console.table({currentlyViewingStory, viewedStoryIdList});
// });

// mounting react app
ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();
