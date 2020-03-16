var FacebookPreview = require( "../src/js/facebookPreview.js" );
var TwitterPreview  = require( "../src/js/twitterPreview.js" );

var facebookPreview = new FacebookPreview(
	{
		targetElement: document.getElementById(  'facebook-container' )
	}
);

facebookPreview.init();

var twitterPreview = new TwitterPreview(
	{
		targetElement: document.getElementById(  'twitter-container' )
	}
);

twitterPreview.init();
