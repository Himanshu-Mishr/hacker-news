import React, { Component } from 'react';
import { connect } from 'react-redux';
import StoryItem from '../../components/StoryItem';
import {List, ListItem, ListItemText, Avatar, Icon, LinearProgress} from 'material-ui';
import './StoryListContainer.css';
import { withStyles } from 'material-ui/styles';

import {
  fetchStoryListAction
} from '../../actions';


const styles = theme => ({
  root: {
    width: '100%',
    background: theme.palette.background.paper,
  },
});


@connect((store, action) => {
  return {
    storyIdList : store.storyIdList
  }
})
class StoryListContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      list : [],
      skip : 0,
      limit : 20,
      storiesVisible : []
    }
    const { classes } = props;
    this.classes = classes;
    // Notes : Don't know why we need this. So I have removed it. 
    // this.propTypes = {
    //   classes: PropTypes.object.isRequired,
    // };
  }

  // init
  componentDidMount() {
    this.props.dispatch(fetchStoryListAction());
  }


  // iterate and make list of story components
  getStoryList() {
    let list = [];
    for(var i = 0; i < this.state.storiesVisible.length; ++i) {
      list.push(<StoryItem key={this.state.storiesVisible[i]} storyId={this.state.storiesVisible[i]} />);
    }
    return list;
  }


  // update component when id list is fetched
  componentWillReceiveProps(newProps) {
    // when fetching is stopped and there is error during fetching
    if(!newProps.storyIdList.isFetching && !newProps.storyIdList.error) {
      // load inital default no. of story items
      const storiesVisible = newProps.storyIdList.list.slice(this.state.skip, this.state.limit+this.state.skip);
      this.setState({list : newProps.storyIdList.list, storiesVisible});
    }
  }

  handleLoadNext() {
    const newSkip = this.state.skip + 20;
    const storiesVisible = this.state.storiesVisible.concat(this.props.storyIdList.list.slice(newSkip, this.state.limit+newSkip));
    this.setState({skip : newSkip, storiesVisible});
  }


  render() {

    if(this.state.list.length === 0) {
      return (
        <LinearProgress />
      );
    } else {
      return (
        <List className={this.classes.root}>
          {this.getStoryList()}
          <ListItem button divider onClick={() => this.handleLoadNext()}>
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

export default withStyles(styles)(StoryListContainer);