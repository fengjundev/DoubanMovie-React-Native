'use strict';


var React = require('react-native');

var {
    View,
    StyleSheet,
    Text,
    Image,
    Animated,
    PixelRatio,
} = React;

var splitLineHeight = 1 / PixelRatio.get();

var DrawerLayout = React.createClass({

  getInitialState: function() {
    return {
      bounceValue: new Animated.Value(0),
    };
  },

  render: function () {
    return (
      <View style={styles.container}>
        <View style={{height: 80, justifyContent: 'center'}}>
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
         <Image
           source={require('image!user_logo')}
           style={{width: 40, height: 40, marginLeft: 20}} />

          <Text style={{fontSize: 16, color: 'black', marginLeft: 10}}>
              FENGJUNDEV
          </Text>
        </View>
        </View>
        <View style={styles.rowSplitLine}></View>

        <View style={{height: 50, justifyContent: 'center', marginTop: 20}}>
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
         <Image
           source={require('image!drawer_invitation')}
           style={{width: 20, height: 20, marginLeft: 20}} />

          <Text style={{fontSize: 12, color: 'black', marginLeft: 10}}>
              设置中心
          </Text>
        </View>
        </View>
        <View style={styles.rowSplitLine}></View>

        <View style={{height: 50, justifyContent: 'center', marginTop: 5}}>
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
         <Image
           source={require('image!drawer_rule')}
           style={{width: 20, height: 20, marginLeft: 20}} />

          <Text style={{fontSize: 12, color: 'black', marginLeft: 10}}>
              工作汇总
          </Text>
        </View>
        </View>
        <View style={styles.rowSplitLine}></View>

        <View style={{height: 50, justifyContent: 'center', marginTop: 5}}>
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
         <Image
           source={require('image!drawer_suggest')}
           style={{width: 20, height: 20, marginLeft: 20}} />

          <Text style={{fontSize: 12, color: 'black', marginLeft: 10}}>
              邀请好友
          </Text>
        </View>
        </View>
        <View style={styles.rowSplitLine}></View>

        <View style={{height: 50, justifyContent: 'center', marginTop: 5}}>
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
         <Image
           source={require('image!drawer_works')}
           style={{width: 20, height: 20, marginLeft: 20}} />

          <Text style={{fontSize: 12, color: 'black', marginLeft: 10}}>
              规则说明
          </Text>
        </View>
        </View>
        <View style={styles.rowSplitLine}></View>



      </View>
      );
  },

  componentDidMount() {
    this.state.bounceValue.setValue(0.5);     // Start large
    Animated.timing(                          // Base: spring, decay, timing
      this.state.bounceValue,                 // Animate `bounceValue`
      {
        toValue: 1.2,                         // Animate to smaller size
        duration: 3000,                          // Bouncier spring
      }
    ).start();                                // Start the animation
  }

});

var styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
    },

    rowSplitLine: {
      height: 1, 
      backgroundColor: '#e5e5e5',
      marginLeft: 20,
      marginRight: 20,
    },
});

module.exports = DrawerLayout;