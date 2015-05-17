/*
 *	This is the main function that calls to yelp
 * 	and updates the knockout data binds
 *	as well as creating the  markers on google map.
 */
function yelpAjax(searchNear, searchFor) {
	/*
	 *	Details for Yelp OAuth2
	 *	This info would never make it to prod - it's only used right now as Proof-of-concept
	 */
	var auth = {
			    consumerKey : "igjXtMVKhuVNjjJEih0vCQ",
			    consumerSecret : "ziP5zS_dWXrPi0EDrvleDXqsbcg",
			    accessToken : "wJhBku-NNXgScAbds457yB4FuozLPWlK",
			    accessTokenSecret : "wL5q4CmB_qEcaUirQw1Uk4wIToo",
			    serviceProvider : {
			        signatureMethod : "HMAC-SHA1"
			    }
			};
	
	/*
	 *	Create a variable "accessor" to pass on to OAuth.SignatureMethod
	 */	
	var accessor = {
	    consumerSecret : auth.consumerSecret,
	    tokenSecret : auth.accessTokenSecret
	};
	
	/*
	 *	Create a array object "parameter" to pass on "message" JSON object
	 */	
	var parameters = [];
	parameters.push(['term', searchFor]);
	parameters.push(['location', searchNear]);
	parameters.push(['callback', 'cb']);
	parameters.push(['oauth_consumer_key', auth.consumerKey]);
	parameters.push(['oauth_consumer_secret', auth.consumerSecret]);
	parameters.push(['oauth_token', auth.accessToken]);
	parameters.push(['oauth_signature_method', 'HMAC-SHA1']);
	
	/*
	 *	Create a JSON object "message" to pass on to OAuth.setTimestampAndNonce
	 */	
	var message = {
	    'action' : 'http://api.yelp.com/v2/search',
	    'method' : 'GET',
	    'parameters' : parameters
	};
	
	/*
	 *	OAuth proof-of-concept using JS
	 */	
	OAuth.setTimestampAndNonce(message);
	OAuth.SignatureMethod.sign(message, accessor);

	/*
	 *	OAuth proof-of-concept using JS
	 */		
	var parameterMap = OAuth.getParameterMap(message.parameters);
	yJax(message.action, parameterMap);
}

/*
 *	Ajax OAuth method to get yelp's data
 */		
function yJax(url, ydata){
	$.ajax({
		'url' : url,
		'data' : ydata,
		'dataType' : 'jsonp',
		'global' : true,
		'jsonpCallback' : 'cb',
		'success' : function(data){
			makeYelpList(data);
		}
	});
}


    var YWSID = "[YOUR YWSID KEY]"; // common required parameter (api key)

    
    function constructYelpURL() {
        var mapBounds = map.getBounds();
        var URL = "http://api.yelp.com/" +
            "business_review_search?"+
            "callback=" + "handleResults" +
            "&term=" + document.getElementById("term").value + 
            "&num_biz_requested=10" +
            "&tl_lat=" + mapBounds.getSouthWest().lat() +
            "&tl_long=" + mapBounds.getSouthWest().lng() + 
            "&br_lat=" + mapBounds.getNorthEast().lat() + 
            "&br_long=" + mapBounds.getNorthEast().lng() +
            "&ywsid=" + YWSID;
        return encodeURI(URL);
    }




yelpAjax('test', 'test');
