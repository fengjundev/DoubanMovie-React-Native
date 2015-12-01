'use strict';

var React = require('react-native');
var {
  Image,
  PixelRatio,
  StyleSheet,
  Text,
  Platform,
  View,
  Dimensions,
} = React;

var titleBarHeight = Dimensions.get('window').height / 12;

var titleBarMarginTop = 0;
if (Platform.OS === 'ios') {
      titleBarMarginTop = 10;
}

var TitleBar = React.createClass({

  render: function() {
    return (
      <View>
      <View style={styles.container}>
        <Text style={styles.titleText} >
          {this.props.title}
        </Text>
      </View>
      <View style={styles.titleBarSplitLine} />
      </View>

    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex:1, 
    marginTop: titleBarMarginTop,
    justifyContent: 'center',
    height: titleBarHeight, 
    backgroundColor: 'white',
  },

  titleText: {
    fontSize: 18,
    marginLeft: 10,
    color: '#42bd56'
  },

  titleBarSplitLine: {
    height: 1, 
    backgroundColor: '#e5e5e5',
  },
});

module.exports = TitleBar;
