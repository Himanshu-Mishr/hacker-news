import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Paper } from 'material-ui';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
import newspaper from '../../newspaper.svg';

import {
  setReaderModeAction
} from '../../actions';

@connect((store, action) => {
  return {
    readerMode : store.readerMode,
    currentlyViewingStory : store.currentlyViewingStory
  }
})
class ReaderHeader extends Component {

  setReaderMode(mode) {
    this.props.dispatch(setReaderModeAction(mode));
  }

  getModeChangeButton() {
    if(this.props.readerMode === 'article') {
      return (<Button onClick={() => this.setReaderMode('comment')}><Icon color="action">chat</Icon> {this.props.currentlyViewingStory.descendants}</Button>);
    } else {
      return (<Button onClick={() => this.setReaderMode('article')}>
        <img src={newspaper} alt="article view" />
      </Button>)
    }
  }

  render() {

    if(!this.props.currentlyViewingStory.id) {
      return (
        <Paper style={{ height:'48px',width:"100%",flex:1,flexGrow:1,zIndex:1,position:'sticky',top:'0px'}}>
        </Paper>
      );
    }


    return (
      <Paper style={{ height:'48px',width:"100%",flex:1,flexGrow:1,zIndex:1,position:'sticky',top:'0px'}}>
        <div style={{paddingTop:'10px'}} >
          <span style={{fontSize:'120%',paddingLeft:'16px'}}>
            {this.props.currentlyViewingStory.title} &nbsp;
          </span>
          <span style={{fontSize:'90%'}}>
            by {this.props.currentlyViewingStory.by}
          </span>
          <span style={{float:'right',marginTop:'-10px'}}>
            <IconButton aria-label="open in new window" href={this.props.currentlyViewingStory.url} target='_blank'>
              <Icon color="action">open_in_new</Icon>
            </IconButton>          
            {this.getModeChangeButton()}
          </span>
        </div>
      </Paper>
    );
  }

}

export default ReaderHeader;