'use strict';


var React = require('react-native');

var {
    View,
    StyleSheet,
    Text,
    Image,
    Animated,
    Dimensions,
    ToastAndroid,
    TextInput,
    TouchableHighlight,
    TouchableNativeFeedback,
    Platform,
} = React;

var SearchResultScreen = require('./SearchResultScreen');
var deviceWidth = Dimensions.get('window').width;

var titleBarHeight = Dimensions.get('window').height / 12;
var textInputHeight = titleBarHeight - 20;

var TouchableElement = TouchableHighlight;
if (Platform.OS === 'android') {
    TouchableElement = TouchableNativeFeedback;
}

var titleBarMarginTop = 0;
if (Platform.OS === 'ios') {
    titleBarMarginTop = 10;
}

var SearchScreen = React.createClass({

  getInitialState: function() {
    return {
        isFirstIn: true,
    };
  },

  onBackPress: function() {
    if (this.props.navigator) {
      this.props.navigator.pop();
    }
  },

  onSearchPress: function() {
    if(!this.state.text || this.state.text === ""){
      ToastAndroid.show("请输入关键字", ToastAndroid.SHORT);
    }else{
      if(this.props.navigator){
        this.props.navigator.push({
            keyword: this.state.text,
            name: 'result',
        });
      }
    }
  },

  render: function () {
    return (
        <View style={styles.container}>
            <View style={styles.titleBarContainer}>
              <TouchableElement onPress={this.onBackPress}>
                <View style={styles.actionItem}>
                    <Image
                        style={styles.searchButton}
                        source={require('./images/ic_back.png')}
                        resizeMode='contain' />
                </View>
              </TouchableElement>
              <TextInput
                    style={styles.textInput}
                    placeholder="输入您想看的电影..."
                    placeholderTextColor="#888888"
                    underlineColorAndroid="transparent"
                    onChangeText={(text) => this.setState({text})}
                    value={this.state.text}
                    autoFocus={true}
                    multiline={false} />
              <TouchableElement onPress={this.onSearchPress}>
                  <View style={styles.actionItem}>
                      <Image
                          style={styles.searchButton}
                          source={require('./images/ic_search_white_48dp.png')}
                          resizeMode='contain' />
                  </View>
              </TouchableElement>
            </View>

            <View style={styles.midContainer}>
              <Text style={styles.welcome}>
                 电影搜索
              </Text>
            </View>
        </View>
      );

  },

  renderResultView: function() {
    return (
      <View style={styles.container}>
          <SearchResultScreen 
                style={{flex: 1, width: deviceWidth}} 
                navigator={this.props.navigator} 
                keyword="张艺谋" />
      </View>
      );
  },

});

var styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
    },

    titleBarContainer: {
      flexDirection: "row",
      marginTop: titleBarMarginTop,
      alignItems: 'center',
      height: titleBarHeight, 
      backgroundColor: '3e9ce9',
    },

    midContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
    },

    welcome: {
      fontSize: 26,
      fontWeight: '400',
      color: '#888888',
      textAlign: 'center',
    },

    titleText: {
      fontSize: 18,
      marginLeft: 10,
      color: 'white'
    },

    titleBarSplitLine: {
      height: 0, 
      backgroundColor: '#e5e5e5',
    },

    searchButton: {
      width: 32,
      height: 32,
      marginLeft: 8,
      marginRight: 8,
    },

    actionItem: {
      height: 56,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingLeft: 8,
      paddingRight: 8,
    },

    textInput: {
      flex: 1, 
      color: '#888888',
      backgroundColor: 'white',
      height: textInputHeight, 
    }
});

module.exports = SearchScreen;