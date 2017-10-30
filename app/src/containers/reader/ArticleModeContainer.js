import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import {Button, Icon, Typography, Divider} from 'material-ui';
import './ArticleModeContainer.css';
import { LinearProgress } from 'material-ui/Progress';

@connect((store, action) => {
  return {
    currentlyViewingStory : store.currentlyViewingStory
  }
})
class ArticleModeContainer extends Component {
  
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
          padding:'16px',textAlign:'center',top:'50%',left:'23%'}}>
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

  // NOTE : Don't know why this was here.
  // componentWillReceiveProps(newProps) {
  //   this.loadContent(newProps.currentlyViewingStory.url);
  // }

  componentDidMount() {
    if(this.props.currentlyViewingStory) {
      this.loadContent(this.props.currentlyViewingStory.url);
    }
  }

  getStoryInfo() {
    if(this.state.content) {
      return (
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
                <td> <Icon color="action">person</Icon> </td>
                <td> {this.props.currentlyViewingStory.by} </td>
                <td style={{paddingLeft:'14px'}}> <Icon color="action">whatshot</Icon> </td>
                <td> {this.props.currentlyViewingStory.score} </td>
                <td style={{paddingLeft:'14px'}}> <Icon color="action">chat</Icon> </td>
                <td> {this.props.currentlyViewingStory.descendants} </td>
              </tr>              
            </tbody>
          </table>
        </div>
      );
    } else {
      return (<div></div>);
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
        {this.getStoryInfo()}
        <Divider light />
        <div>
        {this.state.content}
        </div>
      </div>

    );
  }
  
}

export default ArticleModeContainer;