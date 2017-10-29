import React, { Component } from 'react';
import {Grid, Hidden } from 'material-ui';
import './App.css';
import MainContainer from './main/MainContainer';
import ReaderContainer from './reader/ReaderContainer';



class App extends Component {
  render() {
    return (
      <div>
        <Grid container style={{height:'100vh',overflow:'hidden',padding:'0px'}}>
          <Grid item xs={12} sm={4} style={{overflowY:'auto',height:'100vh',padding:'0px'}}>
            <MainContainer />
          </Grid>
          {/* <Hidden xsDown> */}
            <Grid item sm={8} style={{height:'100vh',overflowY:'auto',padding:'0px'}}>
              <ReaderContainer />
            </Grid>
          {/* </Hidden> */}
        </Grid>
      </div>
    );
  }
}

export default App;
