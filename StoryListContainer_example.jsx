import React, { Component } from 'react';
import { connect } from 'react-redux';
import StoryItem from '../../components/StoryItem';
import {List, ListItem, ListItemText, Avatar, Icon} from 'material-ui';

import {
  fetchStoryListAction
} from '../../actions';

@connect((store, action) => {
  return {
    storyIdList : store.storyIdList
  }
})
class StoryListContainer extends Component {

  constructor() {
    super();
    this.state = {
      skip : 0,
      limit : 10,
      storiesVisible : []
    }
  }

  componentDidMount() {
    this.props.dispatch(fetchStoryListAction());
  }


  getItemList() {

    // skip when error
    if(!this.props.storyIdList.error) {
      if(this.state.storiesVisible.length === 0 &&  this.props.storyIdList.list.length > 0) {
        this.handleLoadNext(0);
      }      
    } else {
      // Todo : error while connecting to internet.  
    }

    let list = [];
    for(let i = 0; i < this.state.storiesVisible.length; ++i) {
      list.push(<StoryItem key={i} storyId={this.state.storiesVisible[i]} />);
    }
    return list;
  }

  handleLoadNext(skip) {
    const newSkip = skip+this.state.skip;
    const storiesVisible = this.state.storiesVisible.concat(this.props.storyIdList.list.slice(newSkip, this.state.limit+newSkip));
    this.setState({skip : skip+this.state.skip, storiesVisible});
  }


  render() {

    if(this.props.storyIdList.isFetching) {
      return (
        <div>
          Loading...
        </div>
      );
    } else {
      return (

        <List>
          {this.getItemList()}
          <ListItem button divider onClick={() => this.handleLoadNext(10)}>
              <div style={{flex:1}} />
              <Avatar>
                  <Icon color="action">arrow_downward</Icon>
              </Avatar>
              <ListItemText primary="Load more" />
          </ListItem>
        </List>
      );      
    }


  }
}

export default StoryListContainer;