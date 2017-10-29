import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import moment from 'moment';
import { ListItem, ListItemText, Grid, Icon } from 'material-ui';

import './StoryItem.css';

import {
  setCurrentlyViewingStoryAction,
  markStoryAsViewed
} from '../actions';


/**
 * Notes about things that this component will do
 *  1. show story item efficiently 
 *  2. tigger read mode for this story
 * 
 * @class StoryItem
 * @extends {Component}
 */


@connect((store, action) => {
  return {
    currentlyViewingStory : store.currentlyViewingStory,
    viewedStoryIdList : store.viewedStoryIdList
  }
})
class StoryItem extends Component {

  constructor() {
    super();
    this.state = {
      story : {},
      isFetching : true,
      error : {}
    }
  }

  componentDidMount() {
    // this.setState({isFetching : true});
    axios.get(`https://hacker-news.firebaseio.com/v0/item/${this.props.storyId}.json`)
    .then((response) => {
      this.setState({isFetching : false, story : response.data});
    })
    .catch((error) => {
      this.setState({isFetching : false, error : error});
    });
  }

  viewStory() {
    this.props.dispatch(setCurrentlyViewingStoryAction(this.state.story));
    this.props.dispatch(markStoryAsViewed(this.props.storyId));
  }


  getSecondaryText() {
    if(this.state.story.descendants) {
        return (<span>{this.getReadableTime()} &nbsp;&nbsp;&nbsp; {this.state.story.descendants + ' comments'}</span>)
    } else {
        return (<span>{this.getReadableTime()} &nbsp;&nbsp;&nbsp; 0 comment</span>)
    } 
  }

  getReadableTime() {
    if(this.state.story.time)
        return moment(this.state.story.time*1000).fromNow().replace('ago', '');
    else
        return '';
  }


  getClassName() {
    if(this.props.currentlyViewingStory.id === this.state.story.id) {
      return 'currently-viewing'
    } else {
      let flag = 0;
      for(let i = 0; i < this.props.viewedStoryIdList.length; ++i) {
        if(this.props.viewedStoryIdList[i] === this.state.story.id) {
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

    if(this.state.isFetching) {
      return (
        <ListItem divider style={{height:64}}>
          <div style={{flex:100}}>
            <div className="animated-background"></div>
            <br />
            <div className="animated-background" style={{width:100}}></div>
          </div>
        </ListItem>
      )
    } else {
      return (

        <ListItem divider button onClick={() => this.viewStory()} className={this.getClassName()}>
            <ListItemText style={{flex:90}} primary={this.state.story.title} secondary={this.getSecondaryText()} />
            <Grid style={{flex:10}}>
                <Grid style={{textAlign:'center'}}>
                    <Icon color="action">whatshot</Icon>
                </Grid>
                <Grid style={{textAlign:'center'}}>
                    {this.state.story.score}
                </Grid>
            </Grid>
        </ListItem>

      );
    }
  }

}

export default StoryItem;