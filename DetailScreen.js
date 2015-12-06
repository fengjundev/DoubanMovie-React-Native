'use strict';


var React = require('react-native');

var {
	View,
	StyleSheet,
	Text,
	Image,
	ScrollView,
	Dimensions,
} = React;

var REQUEST_MOVIE_DETAIL_URL = 'https://api.douban.com/v2/movie/subject/';
var API_KEY = "00aefce4d06e0bb7020cf6ae714a2325";

var ProgressBar = require('ProgressBarAndroid');
var toolbarActions = [];
var coverWidth = Dimensions.get('window').width / 2.2;
var coverHeight = Dimensions.get('window').height / 2.5;
var TitleBar = require('./TitleBarForDetail');

var DetailScreen = React.createClass({

	getInitialState: function() {
  		return {
      		isLoading: false,
    	};
	},

	componentDidMount: function() {
      	this.setState({
          	isLoading: true,
      	});
      	this.requstMovieDetail();
  	},

	render: function () {
		if(this.state.isLoading){
			return this.renderLoadingView();
		}
		return this.renderDetailView();
	},

	getUrl: function(movie){
		return REQUEST_MOVIE_DETAIL_URL + movie.id + '?apikey=' + API_KEY;
	},

	requstMovieDetail: function() {
    	fetch(this.getUrl(this.props.movie))
      		.then((response) => response.json())
      		.catch((error) => {
        		this.setState({
          			isLoading: false,
        		});        
      		})
      		.then((responseData) => {
      			this.detail = responseData;
      			console.log('summary : ' + this.detail.summary);
       			this.setState({
          			isLoading: false,
        		});
        		
      }).done();
  	},

	renderLoadingView: function(){
    	var title = this.props.movie.title;
    	return (
     	 <View style={styles.outSideContainer}>
      	 <TitleBar title={this.props.movie.title} />
      	 <View style={styles.titleBarSplitLine}/>
      		<View style={styles.container}>
        	<ProgressBar styleAttr="Large"/>
        	<Text style={styles.loadingText}>正在加载详情</Text>
      	 	</View>
         </View>
      );
  	},

  	renderDetailView: function(){
  		var summary = 'NO SUMMARY';
  		if(this.detail){
  			summary = this.detail.summary;
  		}
  		return(
  			<View style={styles.outSideContainer}>
  			<TitleBar title={this.props.movie.title} navigator={this.props.navigator}/>
  			<ScrollView style={styles.detailContainer}
          showsVerticalScrollIndicator={false} >
  				<View style={styles.detailContainerAbove}>
  					<Image style={styles.bigCover}
  						source={{uri: this.props.movie.images.large}}/>
  				</View>
  				<Text style={styles.detailTitle}>
  					{this.props.movie.title}
  				</Text>
  				<View style={styles.detailRatingContainer}>
  					<Text style={styles.detailRatingText}>
  						{this.props.movie.rating.average}分
  					</Text>
  					<Text style={styles.detailStarsCountText}>
  						{this.props.movie.rating.stars}人评分
  					</Text>
  				</View>
  				<Text style={styles.detailActorsText}>
  					{this.getActors(this.props.movie)}
  				</Text>
  				<View style={styles.detailSplitLine}>
  				</View>
  				<Text style={styles.detailSummaryTitle}>
  					剧情简介
  				</Text>
  				<Text style={styles.detailSummaryText}>
  					{summary}
  				</Text>
  			</ScrollView>
  			</View>
  		);
  	},

  	getActors: function(movie) {
    	var actors = new Array();

    	if(movie.directors[0]){
    		actors.push(movie.directors[0].name);
    	}

    	for(var i in movie.casts){
      		actors.push(movie.casts[i].name);
    	}

    	if(movie.genres[0]){
    		actors.push(movie.genres[0]);
    	}
    	return actors.join('/');
  	},
});

var styles = StyleSheet.create({
	detailSplitLine:{
		height: 0.5, 
		backgroundColor: '#ececec',
		marginLeft: 20,
		marginTop: 10,
	},
	detailRatingContainer: {
		flex: 1,
    	flexDirection: 'row',
    	marginTop: 5,
	},
	detailTitle: {
		fontSize: 18,
    	fontWeight: '500',
    	marginTop: 15,
    	marginLeft: 20,
	},
	detailRatingText: {
		color: '#b8b8b8',
		fontSize: 11,
		marginLeft: 21,
	},
	detailStarsCountText: {
		color: '#b8b8b8',
		fontSize: 11,
		marginLeft: 10,
	},
	detailActorsText: {
		color: '#a5a5a5',
		fontSize: 12,
		marginTop: 10,
		marginLeft: 21,
		marginRight: 100,
	},
	detailSummaryTitle: {
		color: '#9b9b9b',
		fontSize: 14,
		marginTop: 10,
		marginLeft: 21,
	},
	detailSummaryText: {
		color: '#4f4f4f',
		fontSize: 14,
		marginTop: 10,
		marginLeft: 21,
		marginRight: 21,
		marginBottom: 20,
	},
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
	detailContainer: {
	  	flex: 1,
    	flexDirection: 'column',
		backgroundColor: 'white',
	},
	bigCover: {
		height: coverHeight,
		width: coverWidth,
		marginTop: 15,
		marginBottom: 15,
	},
	detailContainerAbove: {
	  	flex: 1,
    	justifyContent: 'center',
    	alignItems: 'center',
		backgroundColor: '#9a7972',
	},
	toolbar: {
    	backgroundColor: 'white',
    	height: 50,
  	},
  	titleBarSplitLine: {
    	height: 1, 
    	backgroundColor: '#e5e5e5',
 	},
});

module.exports = DetailScreen;