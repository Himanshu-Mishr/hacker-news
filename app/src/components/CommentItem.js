import React, {Component} from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import moment from 'moment';
import { ListItem, ListItemText, IconButton } from 'material-ui';
import './CommentItem.css';
import Collapse from 'material-ui/transitions/Collapse';
import Icon from 'material-ui/Icon';
import ReactGA from 'react-ga';

@connect((store, action) => {
  return {
    currentlyViewingStory : store.currentlyViewingStory
  }
})
class CommentItem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      story : {},
      isFetching : true,
      open : true,
    }
  }


  componentDidMount() {
    // this.setState({isFetching : true});
    axios.get(`https://hacker-news.firebaseio.com/v0/item/${this.props.commentId}.json`)
    .then((response) => {
      this.setState({isFetching : false, story : response.data});
    })
    .catch((error) => {
      this.setState({isFetching : false, error : error});
    });
  }


  getReadableTime() {
    if(this.state.story.time)
        return moment(this.state.story.time*1000).fromNow().replace('ago', '');
    else
        return '';
  }


  getCommentorName() {
    let { by } = this.props.currentlyViewingStory || {};
    if(by === this.state.story.by) {
      return (<span style={{background:'#0288D1',color:'white',padding:'4px',borderRadius:'5px' }}>{this.state.story.by}</span>);
    } else {
      return (<span>{this.state.story.by}</span>);
    }
  }


  getPrimaryContent() {
    return (
      <div style={{color:'#757575',marginTop:'-20px'}}>
        by {this.getCommentorName()} {this.getReadableTime()}

        <IconButton onClick={() => this.handleCollapse()}>
        {this.state.open ? (<Icon color="action">expand_less</Icon>) : (<Icon color="action">expand_more</Icon>)}
        </IconButton>

      </div>
    );
  }

  ComponentWillReceiveProps(newProps) {
    console.log(newProps.currentlyViewingStory.by, this.state.story.by, newProps.currentlyViewingStory.by === this.state.story.by);
  }


  getSecondaryContent() {
    if(this.state.open)
      return (<span style={{color:'black'}} dangerouslySetInnerHTML={{__html : this.state.story.text}}></span>)
  }


  getComments() {
    let list = [];
    if(this.state.story.kids) {
      for(let i = 0; i < this.state.story.kids.length; ++i) {
        list.push(<CommentItem key={this.state.story.kids[i]} commentId={this.state.story.kids[i]} level={this.props.level+1} />)
      }
    }
    return (<Collapse in={this.state.open} transitionDuration="auto" unmountOnExit>{list}</Collapse>);
  }


  getPadding() {
    return {marginLeft:((this.props.level-1)*20).toString() + 'px', borderLeft: '1px solid #EEEEEE'}
  }


  handleCollapse() {

    // true -> open
    // false -> collpase
    if(!this.state.open) {
      // register event : (expand comment, level)
      ReactGA.event({
        category: 'Navigation',
        action: 'Expand comment',
        value: this.props.level,
        label: 'CommentItem'
      });
    } else {
      // register event : (collapse comment, level)
      ReactGA.event({
        category: 'Navigation',
        action: 'Collapse comment',
        value: this.props.level,
        label: 'CommentItem'
      });
      
    }



    this.setState({ open: !this.state.open });
  }


  render() {

    if(this.state.isFetching) {
      return (<div>Loading...</div>)
    } else {
      return (
        <div>
          <ListItem divider className="comment" style={this.getPadding()}>
            <ListItemText primary={this.getPrimaryContent()} secondary={this.getSecondaryContent()} />
          </ListItem>
          {this.getComments()}
        </div>
      );
    }
  }
}

export default CommentItem;