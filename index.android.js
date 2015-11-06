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
  }
};

var DoubanMovie = React.createClass({
  render: function() {
    var initialRoute = {name: 'home'};
    return (
      <Navigator
        style = {styles.container}
        initialRoute = {initialRoute}
        configureScreen = {() => Navigator.SceneConfigs.FloatFromRight}
        renderScene={RouteMapper} />
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#b094a5s',
  },
});

AppRegistry.registerComponent('DoubanMovie', () => DoubanMovie);
