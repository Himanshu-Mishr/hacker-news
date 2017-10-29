import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReaderHeader from './ReaderHeader';
import ReaderModeContainer from './ReaderModeContainer';
import CommentModeContainer from './CommentModeContainer';
import { Dialog, AppBar, Toolbar, IconButton, Icon, Typography, Button, Hidden } from 'material-ui';
import Slide from 'material-ui/transitions/Slide';

@connect((store, action) => {
  return {
    readerMode : store.readerMode,
    currentlyViewingStory : store.currentlyViewingStory
  }
})
class ReaderContainer extends Component {


  constructor() {
    super();
    this.state = {
      open : false
    };
  }

  getReaderModeContainer() {
    if(this.props.readerMode === 'article') {
      return (<ReaderModeContainer />);
    } else {
      return (<CommentModeContainer />)
    }
  }

  componentWillReceiveProps(newProps) {
    if(this.props.currentlyViewingStory.id !== newProps.currentlyViewingStory.id) {
      this.setState({open : true});
    }
  }

  handleRequestClose() {
    this.setState({open : false});
  }
  

  render() {
    return (
      <div>
        <Hidden xsDown>
          <ReaderHeader dialogCloseClickHandler={() => {this.handleRequestClose()}} />
          {this.getReaderModeContainer()}
        </Hidden>
        <Hidden smUp>
          <Dialog
            fullScreen
            open={this.state.open}
            onRequestClose={() => {this.handleRequestClose()}}
            transition={<Slide direction="left" />}
          >
            <ReaderHeader dialogCloseClickHandler={() => {this.handleRequestClose()}} />
            {this.getReaderModeContainer()}
          </Dialog>
        </Hidden>        
      </div>
    );
  }

}

export default ReaderContainer;