var React = require('react-native');
var {
  PropTypes,
  requireNativeComponent,
} = React;

var RatingBar = {
  name: 'RatingBar',
  propTypes: {
    numStars: PropTypes.number,
    isIndicator: PropTypes.bool,
    rating: PropTypes.number,
    stepSize: PropTypes.number,
  },
};

module.exports = requireNativeComponent('RCTRatingBar', RatingBar);