import React, { Component } from 'react';
import { Grid } from 'material-ui';
import './App.css';
import MainContainer from './main/MainContainer';
import ReaderContainer from './reader/ReaderContainer';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';


const styles = theme => ({
  root: {
    background: theme.palette.background.paper,
  },
});


class App extends Component {

  constructor(props) {
    super(props);
    const { classes } = props;
    this.classes = classes;
  }


  render() {
    return (
      <div className={this.classes.root}>
        <Grid container style={{height:'100vh',overflow:'hidden',padding:'0px'}}>
          <Grid item xs={12} sm={4} style={{overflowY:'auto',height:'100vh',padding:'0px'}}>
            <MainContainer />
          </Grid>
            <Grid item sm={8} style={{height:'100vh',overflowY:'auto',padding:'0px'}}>
              <ReaderContainer />
            </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(App);