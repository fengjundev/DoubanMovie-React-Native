'use strict';


var React = require('react-native');

var {
    View,
    StyleSheet,
    Text,
    Image,
    Animated,
} = React;



var SplashScreen = React.createClass({

  getInitialState: function() {
    return {
      bounceValue: new Animated.Value(0),
    };
  },

  render: function () {
    return (
      <View style={styles.container}>
      <Animated.Text                         // Base: Image, Text, View
        style={{
          fontSize: 26,
          fontWeight: 'bold',
          color: 'white',
          textAlign: 'center',
          transform: [                        // `transform` is an ordered array
            {scale: this.state.bounceValue},  // Map `bounceValue` to `scale`
          ]
        }}
      >Douban Movie</Animated.Text>  
      </View>
      );
  },

  componentDidMount() {
    this.state.bounceValue.setValue(0.5);     // Start large
    Animated.timing(                          // Base: spring, decay, timing
      this.state.bounceValue,                 // Animate `bounceValue`
      {
        toValue: 1.2,                         // Animate to smaller size
        duration: 1000,                          // Bouncier spring
      }
    ).start();                                // Start the animation
  }

});

var styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#3e9ce9',
    },

    welcome: {
      fontSize: 26,
      fontWeight: 'bold',
      color: 'white',
      textAlign: 'center',
    },
});

module.exports = SplashScreen;