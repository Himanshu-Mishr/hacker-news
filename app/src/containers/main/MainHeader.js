import React, {Component} from 'react';
import {Paper, Tabs, Tab} from 'material-ui';
import { connect } from 'react-redux';
import logo from '../../logo.png';
import { Hidden, IconButton, Menu, MenuItem, Icon} from 'material-ui';

import {
  setStoryModeAction,
  setReaderModeAction,
  setCurrentlyViewingStoryAction
} from '../../actions';

@connect((store, action) => {
  return {
    storyMode : store.storyMode
  }
})
class MainHeader extends Component {
  
  constructor() {
    super();
    this.state = {
      value : 1,
      anchorEl: null,
      open : false
    }
  }
  
  // tab on click event
  handleChange = (event, value) => {
    
    switch(value) {
      case 1 : {
        this.setStoryMode('topstories');
        this.setReaderMode('article');
        break;
      }
      case 2 : {
        this.setStoryMode('newstories');
        this.setReaderMode('article');
        break;
      }
      case 3 : {
        this.setStoryMode('beststories');
        this.setReaderMode('article');
        break;
      }
      case 4 : {
        this.setStoryMode('showstories');
        this.setReaderMode('article');
        break;
      }
      case 5 : {
        this.setStoryMode('askstories');
        this.setReaderMode('comment');
        break;
      }
      case 6 : {
        this.setStoryMode('jobstories');
        this.setReaderMode('comment');
        break;
      }
      default : {
        this.setStoryMode('topstories');
        this.setReaderMode('article');
        break;
      }
    }

    this.resetStoryContent();
    this.setState({ value });
  };
  
  
  // setting correct tab value once component is loaded
  componentDidMount() {
    
    let value = 1
    switch(this.props.storyMode) {
      case 'topstories' : {
        value = 1;
        break;
      }
      case 'newstories' : {
        value = 2;
        break;
      }
      case 'beststories' : {
        value = 3;
        break;
      }
      case 'showstories' : {
        value = 4;
        break;
      }
      case 'askstories' : {
        value = 5;
        break;
      }
      case 'jobstories' : {
        value = 6;
        break;
      }
      default : {
        value = 1;
        break;
      }    
    }

    this.setState({value});
  }
  
  setStoryMode(mode) {
    this.props.dispatch(setStoryModeAction(mode));
  }

  setReaderMode(mode) {
    this.props.dispatch(setReaderModeAction(mode));
  }


  resetStoryContent() {
    this.props.dispatch(setCurrentlyViewingStoryAction({}));
  }


  getLogo() {
    return (<img src={logo} className="App-logo" alt="logo" />);
  }
  

  handleClick = event => {
    this.setState({ open: true, anchorEl: event.currentTarget });
  };

  handleRequestClose = (ev, value) => {
    this.setState({ open: false, value });
    if(value !== this.state.value){
      this.handleChange(ev, value)
    }
    
  };



  getStoryModeName() {
    switch(this.props.storyMode) {
      case 'topstories':
        return 'Top Stories';
      case 'newstories':
        return 'New Stories';
      case 'beststories':
        return 'Best Stories';
      case 'showstories':
        return 'Show Stories';
      case 'askstories':
        return 'Ask Stories';
      case 'jobsstories':
        return 'Jobs Stories';
      default :
        return '';
    }
  }


  render() {
    return (
      
      // style={{ width:"100%",flex:1,flexGrow:1,zIndex:1,position:'fixed' }}
      <Paper style={{ height:'48px',width:"100%",flex:1,flexGrow:1,zIndex:1,position:'sticky',top:'0px'}}>
        
        <Hidden xsDown>
          <div  style={{padding:'8px'}}>
            <span>
              {this.getLogo()}
            </span>

            <span style={{top:'0',position:'absolute',padding:'16px'}}>
            {this.getStoryModeName()}
            </span>

            
            <span style={{float:'right',margin:'-8px'}}>
              <IconButton
                aria-owns={this.state.open ? 'simple-menu' : null}
                aria-haspopup="true"
                onClick={this.handleClick}
              >
                <Icon>menu</Icon>
              </IconButton>
              <Menu
                id="simple-menu"
                anchorEl={this.state.anchorEl}
                open={this.state.open}
                onRequestClose={() => this.handleRequestClose('event', this.state.value)}
              >
                <MenuItem onClick={() => this.handleRequestClose('event', 1)}>Top Stories</MenuItem>
                <MenuItem onClick={() => this.handleRequestClose('event', 2)}>New Stories</MenuItem>
                <MenuItem onClick={() => this.handleRequestClose('event', 3)}>Best Stories</MenuItem>
                <MenuItem onClick={() => this.handleRequestClose('event', 4)}>Show Stories</MenuItem>
                <MenuItem onClick={() => this.handleRequestClose('event', 5)}>Ask Stories</MenuItem>
                <MenuItem onClick={() => this.handleRequestClose('event', 6)}>Job Stories</MenuItem>
              </Menu>
            </span>
          </div>
        </Hidden>
        <Hidden smUp>
          <Tabs
          value={this.state.value}
          onChange={this.handleChange}
          fullWidth
          indicatorColor="primary"
          textColor="primary"
          scrollable
          scrollButtons="auto"
          >
            <Tab icon={this.getLogo()} disabled/>
            <Tab label="Top" />
            <Tab label="New" />
            <Tab label="Best" />
            <Tab label="Show" />
            <Tab label="Ask" />
            <Tab label="Jobs" />
          </Tabs>
        </Hidden>
      </Paper>
    );
  }
}

export default MainHeader;