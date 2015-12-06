/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');

var {
  AppRegistry,
  StyleSheet,
  BackAndroid,
  Navigator,
  ToolBarAndroid,
  Text,
  View,
} = React;

var HomeScreen = require('./HomeScreen');
var DetailScreen = require('./DetailScreen');
var SplashScreen = require('./SplashScreen');
var SearchScreen = require('./SearchScreen');
var SearchResultScreen = require('./SearchResultScreen');

var TimerMixin = require('react-timer-mixin');


var _navigator;

BackAndroid.addEventListener('hardwareBackPress',() => {
  if(_navigator && _navigator.getCurrentRoutes().length > 1){
    _navigator.pop();
    return true;
  }
  return false;
});

var RouteMapper = function(route, navigationOperations, onComponentRef){
  _navigator = navigationOperations;
  if(route.name === 'home'){
    return <HomeScreen navigator={navigationOperations} />
  }else if(route.name === 'detail'){
    return <DetailScreen 
              navigator={navigationOperations}
              movie={route.movie} 
              title={route.title}/>
  }else if(route.name === 'search'){
     return <SearchScreen 
              navigator={navigationOperations}/>
  }else if(route.name === 'result'){
     return <SearchResultScreen 
              navigator={navigationOperations}
              keyword={route.keyword} />
  }
};

var DoubanMovieApp = React.createClass({
  
  mixins: [TimerMixin],

  getInitialState: function() {
     return {
        splashed: false,
     };
  },

  componentDidMount: function() {
    this.setTimeout(
      () => {
        this.setState({splashed: true});
      },
      4000,
    );
  },

  render: function() {
    var initialRoute = {name: 'home'};

    if(!this.state.splashed){
      return ( <SplashScreen /> );
    }else{
      return (
       <Navigator
          style = {styles.container}
          initialRoute = {initialRoute}
          configureScreen = {(route) => Navigator.SceneConfigs.FloatFromRight}
          renderScene={RouteMapper} />
      );
    }
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#b094a5s',
  },
});

module.exports = DoubanMovieApp;
