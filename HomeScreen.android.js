'use strict';


var React = require('react-native');

var {
	View,
	StyleSheet,
	Text,
	Dimensions,
  ToolbarAndroid,
  ToastAndroid,
  ListView,
	Image,
  ToastAndroid,
  DrawerLayoutAndroid,
} = React;

var Drawer = require('react-native-drawer');
var TitleBar = require('./TitleBarForHome');
var ProgressBar = require('ProgressBarAndroid');
var MovieCell = require('./MovieCell');
var SwipeRefreshLayoutAndroid = require('./SwipeRefreshLayout');
var HotMovieList = require('./HotMovieList');
var DrawerLayout = require('./DrawerLayout');

var PARAM_API_KEY = "apikey";
var DOU_BAN_API_KEY = "00aefce4d06e0bb7020cf6ae714a2325";
var API_HOT_MOVIES_URL = "https://api.douban.com/v2/movie/in_theaters";
var API_COMING_MOVIES_URL = "https://api.douban.com/v2/movie/coming_soon";
var API_US_MOVIES_URL = "https://api.douban.com/v2/movie/top250";

var DRAWER_REF = 'drawer';
var DRAWER_WIDTH_LEFT = 56;

var deviceWidth = Dimensions.get('window').width;


var HomeScreen = React.createClass({

  getInitialState: function() {
    return {
      isDrawerOpened: false,
    };
  },

  onMenuClicked: function() {
     if(this.state.isDrawerOpened){
          this.refs[DRAWER_REF].closeDrawer();
          this.setState({
            isDrawerOpened: false,
          });  
     }else{
          this.refs[DRAWER_REF].openDrawer();
          this.setState({
            isDrawerOpened: true,
          }); 
     }
  },

  onDrawerOpen: function() {
      this.setState({
            isDrawerOpened: true,
          }); 
  },

  onDrawerClose: function() {
      this.setState({
            isDrawerOpened: false,
          }); 
  },

  render: function () {
    var title = 'Douban';
    return (
      <View style={styles.outSideContainer}>
        <TitleBar title={"豆瓣电影"} 
                  onMenuClicked={this.onMenuClicked}
                  navigator={this.props.navigator} />
        <DrawerLayoutAndroid
           ref={DRAWER_REF}
           drawerWidth={Dimensions.get('window').width - DRAWER_WIDTH_LEFT}
           keyboardDismissMode="on-drag"
           onDrawerClose={this.onDrawerClose}
           onDrawerOpen={this.onDrawerOpen}
           drawerPosition={DrawerLayoutAndroid.positions.Left}
           renderNavigationView={this.renderDrawer}>
           <HotMovieList style={{flex: 1, width: deviceWidth}} navigator={this.props.navigator} url={API_HOT_MOVIES_URL} tabLabel="正在热映" />
         </DrawerLayoutAndroid>
      </View>
      );
  },

  renderDrawer: function () {
    return (
       <DrawerLayout />
      );
  },

});

var styles = StyleSheet.create({
  outSideContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FAFAFA',
  },
	container: {
	  flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
		backgroundColor: 'white',
	},
  titleBarSplitLine: {
    height: 1, 
    backgroundColor: '#e5e5e5',
  },
  loadingText: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 10,
  },
  rowSeparator: {
    backgroundColor: '#f5f5f5',
    height: 1,
    marginLeft: 10,
    marginRight: 10,
  },
  rowSeparatorHide: {
    opacity: 0.0,
  },
  toolbar: {
    backgroundColor: 'white',
    height: 50,
  },
  ratingbar: {
    height: 50,
    width: 200,
  },
});

module.exports = HomeScreen;