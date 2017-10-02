import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import {Button, Icon} from 'material-ui';
import './ReaderModeContainer.css';
import { LinearProgress } from 'material-ui/Progress';

@connect((store, action) => {
  return {
    currentlyViewingStory : store.currentlyViewingStory
  }
})
class ReaderModeContainer extends Component {
  
  constructor() {
    super();
    this.state = {
      isFetching: true,
      content : ''
    }
  }
  
  loadContent(storyUrl) {

    if(!storyUrl) return;
    
    this.setState({isFetching : true});
      axios.post('/extract-content', {
        url : storyUrl
      })
      .then((response) => {
        let content = response.data.content || 'Could not fetch content.';
        this.setState({
          content : <div style={{opacity:'1',padding:'16px'}} dangerouslySetInnerHTML={{__html : content}} />,
          isFetching : false
        });
      })
      .catch((response) => {
        this.setState({
          content : (<div style={{opacity:'1',
          padding:'16px',textAlign:'center',position:'absolute',top:'50%',left:'23%'}}>
          <a style={{color:'#616161',textDecoration:'none'}} target="_blank" href={"https://news.ycombinator.com/item?id=" + this.props.currentlyViewingStory.id}>
          <Button raised color="primary">
          <Icon>open_in_new</Icon> Open in new tab
          </Button>
          </a>
          </div>),
          isFetching : false
        });
      });
  }

  componentWillReceiveProps(newProps) {
    this.loadContent(newProps.currentlyViewingStory.url);
  }

  componentDidMount() {
    if(this.props.currentlyViewingStory) {
      this.loadContent(this.props.currentlyViewingStory.url);
    }
  }

  render() {

    if(this.state.isFetching&&this.props.currentlyViewingStory.id) {
      return (
        <div>
          <LinearProgress />
        </div>
      );
    }

    return (
      <div className="article-view">
      {this.state.content}
      </div>
    );
  }
  
}

export default ReaderModeContainer;