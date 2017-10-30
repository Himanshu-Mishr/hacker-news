import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReaderHeader from './ReaderHeader';
import ArticleModeContainer from './ArticleModeContainer';
import CommentModeContainer from './CommentModeContainer';
import { Dialog, Hidden } from 'material-ui';
import Slide from 'material-ui/transitions/Slide';


import {
  setCurrentlyViewingStoryAction
} from '../../actions';


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

  getArticleModeContainer() {
    if(this.props.readerMode === 'article') {
      return (<ArticleModeContainer />);
    } else {
      return (<CommentModeContainer />)
    }
  }

  componentWillReceiveProps(newProps) {
    if(this.props.currentlyViewingStory.id !== newProps.currentlyViewingStory.id) {
      this.setState({open : true});
    }
  }

  // unset currently viewing story config 
  handleRequestClose() {
    this.setState({open : false});
    // this.props.dispatch(setCurrentlyViewingStoryAction({}));
  }
  

  render() {
    return (
      <div>
        {/* for bigger screen like desktop and tablet */}
        <Hidden xsDown>
          <ReaderHeader dialogCloseClickHandler={() => {this.handleRequestClose()}} />
          {this.getArticleModeContainer()}
        </Hidden>

        {/* for smaller screen : dialog container will open */}
        <Hidden smUp>
          <Dialog
            fullScreen
            open={this.state.open}
            onRequestClose={() => {this.handleRequestClose()}}
            transition={<Slide direction="left" />}
          >
            <ReaderHeader dialogCloseClickHandler={() => {this.handleRequestClose()}} />
            {this.getArticleModeContainer()}
          </Dialog>
        </Hidden>        
      </div>
    );
  }

}

export default ReaderContainer;