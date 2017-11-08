import React, { Component } from 'react';
import { connect } from 'react-redux';
import CommentItem from '../../components/CommentItem';
import { List } from 'material-ui';
import './CommentModeContainer.css';

@connect((store, action) => {
  return {
    currentlyViewingStory : store.currentlyViewingStory
  }
})
class CommentModeContainer extends Component {


  // componentWillReceiveProps(newProps) {
  //   this.loadContent(newProps.currentlyViewingStory.kids);
  // }

  // componentDidMount() {
  //   if(this.props.currentlyViewingStory) {
  //     this.loadContent(this.props.currentlyViewingStory.kids);
  //   }
  // }

  getComments() {
    console.log('here...', this.props.currentlyViewingStory);
    let list = [];
    if(this.props.currentlyViewingStory.kids) {
      console.log('inside...');
      for(let i = 0; i < this.props.currentlyViewingStory.kids.length; ++i) {
        list.push(<CommentItem key={this.props.currentlyViewingStory.kids[i]} commentId={this.props.currentlyViewingStory.kids[i]} level={1} />)
      }
    }
    return (<List>{list}</List>);
  }

  render() {

    return (
      <div className="comment-view">
        {this.getComments()}
      </div>
    );
  }

}

export default CommentModeContainer;