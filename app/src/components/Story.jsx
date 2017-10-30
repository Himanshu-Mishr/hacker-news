import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { ListItem, ListItemText, Grid, Icon, Typography } from 'material-ui';

import './Story.css';

import {
  setCurrentlyViewingStoryAction,
  markStoryAsViewed
} from '../actions';


@connect((store, action) => {
  return {
    currentlyViewingStory : store.currentlyViewingStory,
    viewedStoryIdList : store.viewedStoryIdList
  }
})
class Story extends Component {


  viewStory() {
    this.props.dispatch(setCurrentlyViewingStoryAction(this.props.story));
    this.props.dispatch(markStoryAsViewed(this.props.story.id));
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

export default Story;