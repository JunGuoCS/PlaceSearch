package com.example.hp.placesearch.Data;

import android.app.Application;

public class Data extends Application {
    //current position
    private double cur_lat;
    private double cur_lng;

    //used for search position
    private double lat;
    private double lng;

//    private String hostURL="http://10.0.2.2:8081";
    private String hostURL="http://web9-env.us-east-2.elasticbeanstalk.com";


    public double getCur_lat(){
        return cur_lat;
    }
    public double getCur_lng(){
        return cur_lng;
    }

    public double getLat(){
        return lat;
    }
    public double getLng(){
        return lng;
    }

    public void setLatLng(double lat,double lng){
        this.lat=lat;
        this.lng=lng;
    }
    public void setCurLatLng(double cur_lat,double cur_lng){
        this.cur_lat=cur_lat;
        this.cur_lng=cur_lng;
    }
    public void curToLatLng(){
        lat=cur_lat;
        lng=cur_lng;
    }

    public String getHostURL() {
        return hostURL;
    }

    @Override
    public void onCreate() {
        // TODO Auto-generated method stub
        super.onCreate();

        this.lat=34.0266;
        this.lng=-118.2831;
        this.cur_lat=34.0266;
        this.cur_lng=-118.2831;
    }
}
