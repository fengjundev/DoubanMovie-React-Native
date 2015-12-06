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
    Platform,
    ProgressViewIOS,
    ProgressBarAndroid,
} = React;


var MovieCell = require('./MovieCell');
var TitleBar = require('./TitleBarForDetail');

var PARAM_API_KEY = "apikey";
var DOU_BAN_API_KEY = "00aefce4d06e0bb7020cf6ae714a2325";
var API_SEARCH_MOVIES_URL = "https://api.douban.com/v2/movie/search";

var deviceWidth = Dimensions.get('window').width;

var ProgressBar = ProgressBarAndroid;
if (Platform.OS === 'ios') {
      ProgressBar = ProgressViewIOS;
}

var SearchResultScreen = React.createClass({

    getInitialState: function() {
        return {
            isFirstLoading: false,
            isFromRefreshing: false,
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
          }),
        };
    },

    componentDidMount: function() {
      this.setState({
          isFirstLoading: true,
          isFromRefreshing: false,
      });
      this.requestHotMovies();
  },

  getSearchMoviesUrl: function(){
    return API_SEARCH_MOVIES_URL + '?' + PARAM_API_KEY + '=' + DOU_BAN_API_KEY
            + "&q=" + this.props.keyword; 
  },

  requestHotMovies: function() {
        fetch(this.getSearchMoviesUrl())
            .then((response) => response.json())
            .catch((error) => {
                this.setState({
                    dataSource: this.getDataSourSce([]),
                    isFirstLoading: false,
                });        
            })
            .then((responseData) => {
                this.setState({
                isFirstLoading: false,
                dataSource: this.getDataSource(responseData.subjects),
             }
            );
      }).done();
  },

  getDataSource: function(subjects: Array<any>): ListView.DataSource {
        return this.state.dataSource.cloneWithRows(subjects);
  },

  renderListView: function (){
    var title = "搜索\"" + this.props.keyword + "\"的结果"; 
    return (
      <View style={styles.outSideContainer}>
        <TitleBar title={title} />
        <ListView
              ref="listview"
              renderSeparator={this.renderSeparator}
              dataSource={this.state.dataSource}
              renderRow={this.renderMovieRow}
              onEndReached={this.onEndReached}
              automaticallyAdjustContentInsets={false}
              keyboardDismissMode="on-drag"
              keyboardShouldPersistTaps={true}
              showsVerticalScrollIndicator={false} />
      </View>
      );
  },

  renderMovieRow: function(
    movie: Object,
    sectionID: number | string,
    rowID: number | string,
    highlightRowFunc: (sectionID: ?number | string, rowID: ?number | string) => void) {
    return (
      <MovieCell
        key={movie.id}
        onSelect={() => this.selectMovie(movie)}
        onHighlight={() => highlightRowFunc(sectionID, rowID)}
        onUnhighlight={() => highlightRowFunc(null, null)}
        movie={movie} />
    );
  },

  renderSeparator: function(
    sectionID: number | string,
    rowID: number | string,
    adjacentRowHighlighted: boolean
  ) {
    var style = styles.rowSeparator;
    if (adjacentRowHighlighted) {
        style = [style, styles.rowSeparatorHide];
    }
    return (
      <View key={'SEP_' + sectionID + '_' + rowID}  style={style}/>
    );
  },

  selectMovie: function(movie){
    if(this.props.navigator){
      this.props.navigator.push({
        title: movie.title,
        name: 'detail',
        movie: movie,
      });
    }
  },

  renderLoadingView: function(){
    var title = '正在上映';
    return (
      <View style={styles.outSideContainer}>
      <View style={styles.container}>
        <ProgressBar styleAttr="Large"  />
        <Text style={styles.loadingText}>刷呀刷呀</Text>
      </View>
      </View>
      );
  },

  render: function () {
    if(this.state.isFirstLoading){
      return this.renderLoadingView();
    }
    return this.renderListView();
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

module.exports = SearchResultScreen;