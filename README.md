# PlaceSearch

This is a application that could search place information based on keyword. The search result contains the basic description of places, reviews of places and direction of places. In addition, users could store favorite places offline. Because the data source is google map service, you need to provide app key in the code before you execute all the function.

## Quick Start

1. Register and get the <a href="https://console.cloud.google.com/">app key</a> of google map service
2. Register and get the <a href="https://www.yelp.com/developers/v3/manage_app">app key</a> of Yelp review service
3. Finish app key in /PlaceSearchServer/app.js 
```
const client = yelp.client("xx");	//app key
```

and /PlaceSearchApp/app/src/main/AndroidManifest.xml
```
  <application
  ...>

      ...
      
      <!-- You need to provide your google map service key here -->
      <meta-data
         android:name="com.google.android.geo.API_KEY"
         android:value="xxx" />
```


4. Deploy PlaceSearchServer, which is implemented by node.js, to AWS or GAE

## Related Screenshots
![alt-text-1](https://github.com/JunGuoCS/PlaceSearch/blob/master/Images/StartPage.png "Start Page") ![alt-text-2](https://github.com/JunGuoCS/PlaceSearch/blob/master/Images/PlaceList.png "Place List")

![alt-text-1](https://github.com/JunGuoCS/PlaceSearch/raw/master/Images/PlaceInfo.png "Place Info") ![alt-text-2](https://github.com/JunGuoCS/PlaceSearch/raw/master/Images/PlacePhoto.png "Place Photo")

![alt-text-1](https://github.com/JunGuoCS/PlaceSearch/raw/master/Images/PlaceMapDirection.png "Place Map and Direction") ![alt-text-2](https://github.com/JunGuoCS/PlaceSearch/raw/master/Images/PlaceReviews.png "Place Reviews")

## License

`PlaceSearch` is a free software, dedicated using
[GPL 3.0](https://www.gnu.org/licenses/gpl-3.0.en.html). Feel free to do
whatever you want with it.
