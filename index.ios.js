'use strict';

var React = require('react-native');

var {
  AppRegistry,
} = React;

var DoubanMovieApp = require('./DoubanMovieApp');

var _navigator;

var DoubanMovie = React.createClass({
  render: function() {
    return (
      <DoubanMovieApp />
    );
  }
});

AppRegistry.registerComponent('DoubanMovie', () => DoubanMovie);
