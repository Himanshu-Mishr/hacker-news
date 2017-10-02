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
  
  componentDidMount() {
    this.props.dispatch(fetchStoryListAction());
  }

  getItemList() {
    let list = [];
    for(let i = 0; i < this.props.storyIdList.list.length&&i < 10; ++i) {
      list.push(<StoryItem key={i} storyId={this.props.storyIdList.list[i]} />);
    }
    return list;
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