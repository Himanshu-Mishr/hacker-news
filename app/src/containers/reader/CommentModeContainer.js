import React, { Component } from 'react';
import { connect } from 'react-redux';
import CommentItem from '../../components/CommentItem';
import { List, Divider, Typography, Icon } from 'material-ui';
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
    let list = [];
    if(this.props.currentlyViewingStory.kids) {
      for(let i = 0; i < this.props.currentlyViewingStory.kids.length; ++i) {
        list.push(<CommentItem key={this.props.currentlyViewingStory.kids[i]} commentId={this.props.currentlyViewingStory.kids[i]} level={1} />)
      }
    }
    return (<List>{list}</List>);
  }

  render() {

    if(Object.keys(this.props.currentlyViewingStory).length) {
      return (
        <div style={{overflowY:'auto'}}>
          <div style={{width:"100%",paddingTop:'10px'}}>
            <table style={{paddingLeft:'10px'}}>
              <tbody>
                <tr>
                  <td> <Icon color="action">title</Icon> </td>
                  <td>
                  <Typography type="body2">
                    {this.props.currentlyViewingStory.title}
                  </Typography>
                  </td>
                </tr>
              </tbody>
            </table>
            <table style={{paddingLeft:'10px'}}>
              <tbody>
                <tr>
                  <td style={{paddingLeft:'10px'}}> </td>
                  <td style={{paddingLeft:'14px'}}> </td>
                  <td> {this.props.currentlyViewingStory.text} </td>
                </tr>              
              </tbody>
            </table>
          </div>
          <Divider light />
          <div className="comment-view">
            {this.getComments()}
          </div>
        </div>
      );
    } else {
      return (<div></div>);
    }
  }

}

export default CommentModeContainer;