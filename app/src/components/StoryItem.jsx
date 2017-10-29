import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListItem } from 'material-ui';
import Story from './Story';

import './StoryItem.css';

import {
  FetchStoryObjectAction
} from '../actions';



// story item placaholder when it is loading
function LoadingStoryItem() {
  return (
    <ListItem divider style={{height:64}}>
      <div style={{flex:100}}>
        <div className="animated-background"></div>
        <br />
        <div className="animated-background" style={{width:100}}></div>
      </div>
    </ListItem>    
  );  
}

// story item placaholder when error
function ErrorStoryItem() {
  return (
    <ListItem divider style={{height:64}}>
      <div style={{flex:100}}>
        <div> Error while loading story!</div>
        <br />
        <div style={{width:100}}>Please refresh page.</div>
      </div>
    </ListItem>    
  );  
}


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
    storyObject : store.storyObject
  }
})
class StoryItem extends Component {
  
  constructor() {
    super();
    this.state = {
      isFetching : true,
      error : {},
      story : {} 
    }
  }
  
  // decide when to trigger API call and when to pick up already saved content
  // assume that at this point data is already there.
  componentDidMount() {
    
    let story = this.props.storyObject[this.props.storyId];
    
    if(story) { // if story already exist
      if(story.isFetching) {
        // wait componentWillReceiveProps will update state
        // console.log('componentDidMount : wait componentWillReceiveProps will update state');
      } else {
        if(story.error) {
          // error happened previous time loading content for this story. 
          // this time try again.
          // TODO : add limit no. of time to reload 
          this.props.dispatch(FetchStoryObjectAction(this.props.storyId))
        } else {
          this.setState({isFetching : false, story : story.data});
        }
      }
    } else {
      // when story does not exists
      this.props.dispatch(FetchStoryObjectAction(this.props.storyId))
    }
  }
  
  componentWillReceiveProps(newProps) {
    
    let story = newProps.storyObject[this.props.storyId];
    
    if(Object.keys(this.state.story).length) { // check if locally present or not
      // skip loading this step as story is already loaded by componentDidMount
      // console.log('skip loading this step as story is already loaded by componentDidMount', this.state.story);
    } else {
      // console.log('skipped because story already exists locally');
      if(story) {
        if(story.isFetching) {
          // skip. wait for fetching to be over
          // console.log('skipped because story isFetching is true. So waiting for next new update..');
        } else {
          if(story.error) {
            // console.log('error');
            // TODO : add limit no. of time to reload 
            this.setState({isFetching : false, error : story.error});
          } else {
            if(story.data) {
              // console.log('success');
              this.setState({isFetching : false, story : story.data});
            } else {
              // console.warn('This happens only when story is loaded. And there is no error for it.', this.props.storyId);
            }
          }
        }
      } else {
        // story is still not define!!!
        // console.warn('This story is still not called on.', this.props.storyId);
      }
    }
  }
  
  render () {
    
    if(this.state.isFetching) {
      return (
        <LoadingStoryItem />
      );
    } else {
      if(this.state.story.error) {
        return (
          <ErrorStoryItem />
        );        
      } else {
        return (
          <Story story={this.state.story} />
        );    
      }
    }
    
    
  }
  
}

export default StoryItem;