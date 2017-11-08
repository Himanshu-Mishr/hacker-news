import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { ListItem, ListItemText, Grid, Icon, Typography } from 'material-ui';
import './Story.css';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

import {
  setCurrentlyViewingStoryAction,
  markStoryAsViewed,
  setReaderModeAction
} from '../actions';


@connect((store, action) => {
  return {
    currentlyViewingStory : store.currentlyViewingStory,
    viewedStoryIdList : store.viewedStoryIdList
  }
})
class Story extends Component {

  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  }



  viewStory() {

    this.props.dispatch(setCurrentlyViewingStoryAction(this.props.story));
    this.props.dispatch(markStoryAsViewed(this.props.story.id));

    // this.props.story
    // The type of item. One of "job", "story", "comment", "poll", or "pollopt".
    if(this.props.story.type !== 'story') {
      this.props.dispatch(setReaderModeAction('comment'));
    } else {
      let title = (this.props.story.title || '').toLowerCase();
      if(title.indexOf('ask hn') > -1) {
        this.props.dispatch(setReaderModeAction('comment'));
      }
    }

    // set url
    this.props.history.push('story/' + this.props.story.id)

  }


  getSecondaryText() {
    if(this.props.story.descendants) {
        return (<span>{this.getReadableTime()} &nbsp;&nbsp;&nbsp; {this.props.story.descendants + ' comments'}</span>)
    } else {
        return (<span>{this.getReadableTime()} &nbsp;&nbsp;&nbsp; 0 comment</span>)
    } 
  }

  getReadableTime() {
    if(this.props.story.time)
        return moment(this.props.story.time*1000).fromNow().replace('ago', '');
    else
        return '';
  }


  getClassName() {
    if(this.props.currentlyViewingStory.id === this.props.story.id) {
      return 'currently-viewing'
    } else {
      let flag = 0;
      for(let i = 0; i < this.props.viewedStoryIdList.length; ++i) {
        if(this.props.viewedStoryIdList[i] === this.props.story.id) {
          flag = 1;
          break;
        }
      }
      
      if(flag === 1) {
        return 'already-viewed';
      } else {
        return '';
      }
    }
  }


  render() {

    return (
      <ListItem divider button onClick={() => this.viewStory()} className={this.getClassName()}>
          <ListItemText style={{flex:90}} primary={this.props.story.title} secondary={this.getSecondaryText()} />
          <Grid style={{flex:10}}>
              <Grid style={{textAlign:'center'}}>
                  <Icon color="action">whatshot</Icon>
              </Grid>
              <Grid style={{textAlign:'center'}}>
                <Typography type="body2">
                  {this.props.story.score}
                </Typography>
              </Grid>
          </Grid>
      </ListItem>
    );
  }

}

export default withRouter(Story);