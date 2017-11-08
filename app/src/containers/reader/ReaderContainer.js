import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReaderHeader from './ReaderHeader';
import ArticleModeContainer from './ArticleModeContainer';
import CommentModeContainer from './CommentModeContainer';
import { Dialog, Hidden } from 'material-ui';
import Slide from 'material-ui/transitions/Slide';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

import {
  unsetCurrentlyViewingStoryAction,
  LoadStoryObjectAction
} from '../../actions';


@connect((store, action) => {
  return {
    readerMode : store.readerMode,
    currentlyViewingStory : store.currentlyViewingStory
  }
})
class ReaderContainer extends Component {

  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  }

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


  componentDidMount() {
    const { location } = this.props;
    const pathname = location.pathname || '';
    const list = pathname.split('/story/');

    if(list.length > 1) {
      const storyId = list[1];
      if(storyId.length > 0) {
        this.props.dispatch(LoadStoryObjectAction(storyId))
      }
    }
  }

  componentWillReceiveProps(newProps) {

    // allow only when new props is not empty 
    if(Object.keys(newProps.currentlyViewingStory).length) {
      if(this.props.currentlyViewingStory.id !== newProps.currentlyViewingStory.id) {
        this.setState({open : true});
      } else {}
    }
  }

  // unset currently viewing story config 
  handleRequestClose() {
    this.setState({open : false});
    this.props.dispatch(unsetCurrentlyViewingStoryAction());
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

export default withRouter(ReaderContainer);