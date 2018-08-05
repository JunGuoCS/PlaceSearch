//express_demo.js 文件
var port = process.env.PORT || 8081;

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var router = express.Router();

// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));

var request = require('request');
var urlencode = require('urlencode');

const yelp = require('yelp-fusion');

const client = yelp.client("xx");	//app key

var cors = require('cors');

// use it for local test
app.use(cors({origin: 'http://localhost:4200'}));
 


//bodyParser API
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
	res.send("index.html");
});

app.all('/api/placelist', function (req, res, next) {

	var param;
	if (req.method == "POST") {
        param = req.body;
    } else{
        param = req.query || req.params; 
    }
    
    if(typeof(param.keyword) == "undefined")
    	return;

	console.log("Enter place list");

	var lat=param.lat;
	var lng=param.lng;

	//choose other place]
	if(param.isCurLoc==false){
		//you need to set the google map service key
		request("https://maps.googleapis.com/maps/api/geocode/json?address="+urlencode(param.locName)+"&key=xxx", function (error, response, body) {

		if (!error && response.statusCode == 200) {
			let json=JSON.parse(body);

			if(json.results.length>0){
				lat=json.results[0].geometry.location.lat;
			    lng=json.results[0].geometry.location.lng;	
			    console.log("lat: "+lat);
			    console.log("lng: "+lng);
			}
			else{
				res.send({Error:"no results"});
				return;
			}


			var urlData="https://maps.googleapis.com/maps/api/place/nearbysearch/json?location="+lat+","+lng+"&radius="+param['distance']*1609+"&type="+param['category']+"&keyword="+urlencode(param['keyword'])+"&key=AIzaSyC3LPJU1Woyxde77RetB_arvSXga_judKw";

		    getPlaceList2(urlData,res,lat,lng);
		    
		  }
		})
	}
	//choose current pace
	else{
		var urlData="https://maps.googleapis.com/maps/api/place/nearbysearch/json?location="+lat+","+lng+"&radius="+param['distance']*1609+"&type="+param['category']+"&keyword="+urlencode(param['keyword'])+"&key=AIzaSyC3LPJU1Woyxde77RetB_arvSXga_judKw";
	
	    getPlaceList1(urlData,res);
	}
});


/////////////////////////////////////////////////////////////////////
//	get next page api(post)
/////////////////////////////////////////////////////////////////////
app.post('/api/nextpage', function (req, res) {
    
    
    if(typeof(req.body.page_token) == "undefined")
    	return;

    console.log("Enter next page");

    var urlData="https://maps.googleapis.com/maps/api/place/nearbysearch/json?pagetoken="+req.body.page_token+"&key=AIzaSyC3LPJU1Woyxde77RetB_arvSXga_judKw";


    getPlaceList1(urlData,res);

});


function getPlaceList1(urlData,res){
	request(urlData, function (error, response, body) {
	  if (!error && response.statusCode == 200) {
	  	let json=JSON.parse(body);

	    // console.log(jsonObj["results"][0]) // Show the HTML for the baidu homepage.
	    // console.log(json.results[0].icon);
	   	// console.log(body["result"]["status"]);

	   	var place_list_data=[];

	   	var place_arr=json.results;
	   	for(var i=0;i<place_arr.length;i++){
	   		tmp={
	   			place_id:place_arr[i].place_id,
	   			icon:place_arr[i].icon,
	   			name:place_arr[i].name,
	   			vicinity:place_arr[i].vicinity,
	   			lat:place_arr[i].geometry.location.lat,
	   			lng:place_arr[i].geometry.location.lng
	   		};
	   		place_list_data.push(tmp);
	   	}

	   	place_list_res={data:place_list_data};

	   	if(typeof(json.next_page_token)!="undefined"){
   			place_list_res.next_page_token=json.next_page_token;
   		}

	   	// console.log(place_list_res.next_page_token);
	   	res.send(place_list_res);

	  }
	})
}


function getPlaceList2(urlData,res,lat,lng){
	request(urlData, function (error, response, body) {
	  if (!error && response.statusCode == 200) {
	  	let json=JSON.parse(body);

	    // console.log(jsonObj["results"][0]) // Show the HTML for the baidu homepage.
	    // console.log(json.results[0].icon);
	   	// console.log(body["result"]["status"]);

	   	var place_list_data=[];

	   	var place_arr=json.results;
	   	for(var i=0;i<place_arr.length;i++){
	   		tmp={
	   			place_id:place_arr[i].place_id,
	   			icon:place_arr[i].icon,
	   			name:place_arr[i].name,
	   			vicinity:place_arr[i].vicinity,
	   			lat:place_arr[i].geometry.location.lat,
	   			lng:place_arr[i].geometry.location.lng
	   		};
	   		place_list_data.push(tmp);
	   	}

	   	place_list_res={data:place_list_data};

	   	if(typeof(json.next_page_token)!="undefined"){
   			place_list_res.next_page_token=json.next_page_token;
   		}

   		place_list_res.curlat=lat;
   		place_list_res.curlng=lng;


	   	// console.log(place_list_res.next_page_token);
	   	res.send(place_list_res);

	  }
	})
}

/////////////////////////////////////////////////////////////////////
//	get place detail api(post)
/////////////////////////////////////////////////////////////////////

app.post('/api/placedetail', function (req, res) {
    
    
    if(typeof(req.body.place_id) == "undefined")
    	return;

    console.log("Enter place detail");

    var urlData="https://maps.googleapis.com/maps/api/place/details/json?placeid="+req.body.place_id+"&key=AIzaSyC3LPJU1Woyxde77RetB_arvSXga_judKw";


    request(urlData, function (error, response, body) {
	  if (!error && response.statusCode == 200) {
	  	let json=JSON.parse(body);


		var place=json.result;
	   	var place_detail_data={
	   		place_id:place.place_id,
	   			address:place.formatted_address,
	   			name:place.name,
	   			phone_number:place.formatted_phone_number,
	   			price_level:place.price_level,
	   			rating:place.rating,
	   			url:place.url,
	   			website:place.website,
	   			photos:place.photos,
	   			reviews:place.reviews,
	   			lat:place.geometry.location.lat,
	   			lng:place.geometry.location.lng,
	   			address_components:place.address_components,
	   			icon:place.icon
	   	};

	 

	   	// console.log(place_list_res.next_page_token);
	   	res.send(place_detail_data);

	  }
	})

});

/////////////////////////////////////////////////////////////////////
//	get yelp review api(post)
/////////////////////////////////////////////////////////////////////
app.post('/api/yelpreview', function (req, res) {

	if(typeof(req.body.name)=="undefined"){
		return;
	}

	// matchType can be 'lookup' or 'best'
	client.businessMatch('best', {
	 	name: req.body.name,
	 	address1: req.body.address1,
	 	city: req.body.city,
	 	state: req.body.state,
	 	country: req.body.country
	}).then(response => {
		if(response.jsonBody.businesses.length<=0){
			res.send({"Error":"No Result"});
			return;
		}

		var shop_id=response.jsonBody.businesses[0].id;
	 	console.log(shop_id);


	  	client.reviews(shop_id).then(response1 => {
			console.log(response1.jsonBody.reviews[0].text);
			// res.send(response1.jsonBody.reviews);
			res.send(response1.jsonBody);
		}).catch(e => {
			console.log(e);
		});



	}).catch(e => {
	 	console.log(e);
	});
});

 
var server = app.listen(port);