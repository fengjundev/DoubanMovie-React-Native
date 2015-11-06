'use strict';

var React = require('react-native');
var {
  Image,
  PixelRatio,
  Platform,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableNativeFeedback,
  View
} = React;


var MovieCell = React.createClass({

  getActors: function(movie) {
    var actors = new Array();
    for(var i in movie.casts){
      actors.push(movie.casts[i].name);
    }
    return actors.join('/');
  },

  render: function() {

    var image = this.props.movie.images.small;
    var title = this.props.movie.title;
    var rating = '评分：' + this.props.movie.rating.average;
    var actors = '演员：' + this.getActors(this.props.movie);

    var TouchableElement = TouchableNativeFeedback;
    if (Platform.OS === 'ios') {
      TouchableElement = TouchableHighlight;
    }

    return (
      <View>
        <TouchableElement
          onPress={this.props.onSelect}
          onShowUnderlay={this.props.onHighlight}
          onHideUnderlay={this.props.onUnhighlight}>
          <View style={styles.row}>
            <Image
              source={{uri: image}}
              style={styles.cellImage} />
            <View style={styles.textContainer}>
              <Text style={styles.movieTitle} numberOfLines={1}>
                {title} 
              </Text>
              <Text style={styles.movieRating} numberOfLines={1}>
                {rating}
              </Text>
              <Text style={styles.movieRating} numberOfLines={1}>
                  {actors}
              </Text>
            </View>
          </View>
        </TouchableElement>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  textContainer: {
    flex: 1,
  },
  movieTitle: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 2,
  },
  movieRating: {
    marginTop: 5,
    color: '#999999',
    fontSize: 14,
  },
  row: {
    alignItems: 'center',
    backgroundColor: 'white',
    flexDirection: 'row',
    padding: 10,
  },
  cellImage: {
    backgroundColor: '#dddddd',
    height: 80,
    marginRight: 10,
    width: 55,
  },
});

module.exports = MovieCell;
