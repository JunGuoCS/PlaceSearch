package com.example.hp.placesearch.PlaceDetail;

import android.content.Context;
import android.net.Uri;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentManager;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.view.inputmethod.InputMethodManager;
import android.widget.AdapterView;
import android.widget.AutoCompleteTextView;
import android.widget.EditText;
import android.widget.Spinner;
import android.widget.Toast;

import com.example.hp.placesearch.AutoComplete.CustomAutoCompleteAdapter;
import com.example.hp.placesearch.R;
import com.google.android.gms.maps.CameraUpdateFactory;
import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.MapFragment;
import com.google.android.gms.maps.OnMapReadyCallback;
import com.google.android.gms.maps.SupportMapFragment;
import com.google.android.gms.maps.model.LatLng;
import com.google.android.gms.maps.model.LatLngBounds;
import com.google.android.gms.maps.model.Marker;
import com.google.android.gms.maps.model.MarkerOptions;
import com.google.android.gms.maps.model.Polyline;
import com.google.android.gms.maps.model.PolylineOptions;
import com.google.maps.DirectionsApi;
import com.google.maps.GeoApiContext;
import com.google.maps.android.PolyUtil;
import com.google.maps.model.DirectionsResult;
import com.google.maps.model.TravelMode;

import org.joda.time.DateTime;
import org.json.JSONObject;

import java.util.List;
import java.util.concurrent.TimeUnit;

/**
 * A simple {@link Fragment} subclass.
 * Activities that contain this fragment must implement the
 * {@link PlaceMap.OnFragmentInteractionListener} interface
 * to handle interaction events.
 * Use the {@link PlaceMap#newInstance} factory method to
 * create an instance of this fragment.
 */
public class PlaceMap extends Fragment implements OnMapReadyCallback {
    // TODO: Rename parameter arguments, choose names that match
    // the fragment initialization parameters, e.g. ARG_ITEM_NUMBER
    private static final String ARG_PARAM1 = "param1";
    private static final String ARG_PARAM2 = "param2";

    // TODO: Rename and change types of parameters
    private String mParam1;
    private String mParam2;

    private View mView;
    private Context mContext;
    private FragmentManager fm;

    private OnFragmentInteractionListener mListener;

    SupportMapFragment mapFragment;

    private GoogleMap mMap;

    private TravelMode travelmode;
    private String fromPlace;
    private Marker startpoint;

    Marker startpos;
    Marker endpos;
    Polyline route;

    private JSONObject placedetail_json;

    public PlaceMap() {
        // Required empty public constructor
    }

    /**
     * Use this factory method to create a new instance of
     * this fragment using the provided parameters.
     *
     * @param param1 Parameter 1.
     * @param param2 Parameter 2.
     * @return A new instance of fragment PlaceMap.
     */
    // TODO: Rename and change types and number of parameters
    public static PlaceMap newInstance(String param1, String param2) {
        PlaceMap fragment = new PlaceMap();
        Bundle args = new Bundle();
        args.putString(ARG_PARAM1, param1);
        args.putString(ARG_PARAM2, param2);
        fragment.setArguments(args);
        return fragment;
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        if (getArguments() != null) {
            mParam1 = getArguments().getString(ARG_PARAM1);
            mParam2 = getArguments().getString(ARG_PARAM2);
        }
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        mView=inflater.inflate(R.layout.fragment_place_map, container, false);


        /**
         * google map
         */
//        SupportMapFragment mapFragment = (SupportMapFragment) getFragmentManager().findFragmentById(R.id.map);
//        SupportMapFragment mapFragment = (SupportMapFragment) fm.findFragmentById(R.id.googlemap);
        mapFragment=(SupportMapFragment)this.getChildFragmentManager().findFragmentById(R.id.googlemap);

        mapFragment.getMapAsync(this);


        /**
         * spinner
         */
        Spinner mode_spinner=mView.findViewById(R.id.map_travel_mode);
        int mode_i=mode_spinner.getSelectedItemPosition();
        setTravelMode(mode_i);

        mode_spinner.setSelection(0,false);
        mode_spinner.setOnItemSelectedListener(new modeChangeListener());


        /**
         * autocomplete
         */
        CustomAutoCompleteAdapter adapter =  new CustomAutoCompleteAdapter(mContext);

        AutoCompleteTextView from_input=mView.findViewById(R.id.map_from_val);
        from_input.setAdapter(adapter);
        from_input.setOnItemClickListener(fromClickListener);



        return mView;
    }

    // TODO: Rename method, update argument and hook method into UI event
    public void onButtonPressed(Uri uri) {
        if (mListener != null) {
            mListener.onFragmentInteraction(uri);
        }
    }

    @Override
    public void onAttach(Context context) {
        super.onAttach(context);
        if (context instanceof OnFragmentInteractionListener) {
            mListener = (OnFragmentInteractionListener) context;
        } else {
            throw new RuntimeException(context.toString()
                    + " must implement OnFragmentInteractionListener");
        }
        mContext=context;
//        fm=((PlaceDetailActivity)getActivity()).getSupportFragmentManager();
        fm=getChildFragmentManager();
        placedetail_json=((PlaceDetailActivity)getActivity()).deliverDetailData();
    }

    @Override
    public void onDetach() {
        super.onDetach();
        mListener = null;
    }

    @Override
    public void onMapReady(GoogleMap googleMap) {
        double lat=0,lng=0;
        try{
            lat=placedetail_json.getDouble("lat");
            lng=placedetail_json.getDouble("lng");
        }
        catch (Exception e){
            Log.i("read lat lng error",e.toString());
        }

        mMap=googleMap;

//        mMap.setMinZoomPreference(10.0f);
//        mMap.setMaxZoomPreference(15.0f);

        mMap.moveCamera(CameraUpdateFactory.newLatLngZoom(new LatLng(lat, lng), 16));

        String title_str="Marker";
        try{
            title_str=placedetail_json.getString("name");
        }
        catch (Exception e){
            Log.i("Marker error",e.toString());
        }

        startpoint=mMap.addMarker(new MarkerOptions()
                .position(new LatLng(lat, lng))
                .title(title_str));

        startpoint.showInfoWindow();

//        requestDirection(""2902 S Figueroa St, Los Angeles, CA 90007, USA"",TravelMode.DRIVING);
    }

    @Override
    public void onStart(){
        super.onStart();


    }

    /**
     * This interface must be implemented by activities that contain this
     * fragment to allow an interaction in this fragment to be communicated
     * to the activity and potentially other fragments contained in that
     * activity.
     * <p>
     * See the Android Training lesson <a href=
     * "http://developer.android.com/training/basics/fragments/communicating.html"
     * >Communicating with Other Fragments</a> for more information.
     */
    public interface OnFragmentInteractionListener {
        // TODO: Update argument type and name
        void onFragmentInteraction(Uri uri);
    }



    private GeoApiContext getGeoContext() {
        GeoApiContext geoApiContext = new GeoApiContext();

//        return geoApiContext.setQueryRateLimit(3).
//                setApiKey("AIzaSyC3LPJU1Woyxde77RetB_arvSXga_judKw").
//                setConnectTimeout(1, TimeUnit.SECONDS).
//                setReadTimeout(1, TimeUnit.SECONDS).
//                setWriteTimeout(1, TimeUnit.SECONDS);

        return geoApiContext.setQueryRateLimit(3).
                setApiKey("AIzaSyC3LPJU1Woyxde77RetB_arvSXga_judKw");

    }



    void requestDirection(String origin_address,TravelMode travelway){
        try{
            Double dest_lat=placedetail_json.getDouble("lat");
            double dest_lng=placedetail_json.getDouble("lng");


            DateTime now = new DateTime();
            DirectionsResult result = DirectionsApi.newRequest(getGeoContext())
                    .mode(travelway).origin(origin_address)
                    .destination(new com.google.maps.model.LatLng( dest_lat,dest_lng)).departureTime(now).await();

            addMarkersToMap(result,mMap);
            addPolyline(result,mMap);
        }
        catch(Exception e){
            Log.i("direction error",e.toString());
        }

    }


    private void addMarkersToMap(DirectionsResult results, GoogleMap mMap) {
        startpos=mMap.addMarker(new MarkerOptions().position(new LatLng(results.routes[0].legs[0].startLocation.lat,results.routes[0].legs[0].startLocation.lng)).title(results.routes[0].legs[0].startAddress));
        endpos=mMap.addMarker(new MarkerOptions().position(new LatLng(results.routes[0].legs[0].endLocation.lat,results.routes[0].legs[0].endLocation.lng)).title(results.routes[0].legs[0].startAddress).snippet(getEndLocationTitle(results)));
    }
    private String getEndLocationTitle(DirectionsResult results){
        return  "Time :"+ results.routes[0].legs[0].duration.humanReadable + " Distance :" + results.routes[0].legs[0].distance.humanReadable;
    }
    private void addPolyline(DirectionsResult results, GoogleMap mMap) {
        List<LatLng> decodedPath = PolyUtil.decode(results.routes[0].overviewPolyline.getEncodedPath());
        PolylineOptions po=new PolylineOptions().width(20).color(mContext.getResources().getColor(R.color.routeColor));

        zoomRoute(mMap,decodedPath);
        route=mMap.addPolyline(po.addAll(decodedPath));

    }

    public void zoomRoute(GoogleMap googleMap, List<LatLng> lstLatLngRoute) {

        if (googleMap == null || lstLatLngRoute == null || lstLatLngRoute.isEmpty()) return;

        LatLngBounds.Builder boundsBuilder = new LatLngBounds.Builder();
        for (LatLng latLngPoint : lstLatLngRoute)
            boundsBuilder.include(latLngPoint);

        int routePadding = 100;
        LatLngBounds latLngBounds = boundsBuilder.build();

        googleMap.moveCamera(CameraUpdateFactory.newLatLngBounds(latLngBounds, routePadding));
    }

    /**
     * travel mode spinner
     */
    private void setTravelMode(int position){
        String []mode_arr=getResources().getStringArray(R.array.map_mode);

        if("Driving".equals(mode_arr[position])){
            travelmode=TravelMode.DRIVING;
        }
        if("Bicycling".equals(mode_arr[position])){
            travelmode=TravelMode.BICYCLING;
        }
        if("Transit".equals(mode_arr[position])){
            travelmode=TravelMode.TRANSIT;
        }
        if("Walking".equals(mode_arr[position])){
            travelmode=TravelMode.WALKING;
        }
    }

    class modeChangeListener implements AdapterView.OnItemSelectedListener{
        @Override
        public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
            Log.i("order position",String.valueOf(position));
            setTravelMode(position);

            String fromText=fromStr();
            if("".equals(fromText)){
                Toast.makeText(mContext,"From should not be empty",Toast.LENGTH_LONG).show();
            }
            else{
                startpoint.setVisible(false);
                if(route!=null){
                    route.remove();
                    startpos.remove();
                    endpos.remove();
                }


                requestDirection(fromText,travelmode);
            }
        }

        @Override
        public void onNothingSelected(AdapterView<?> parent) {

        }
    }
    String fromStr(){
        AutoCompleteTextView from_input=mView.findViewById(R.id.map_from_val);
        String text=from_input.getText().toString();

        return text;
    }


    /**
     * click autocomplete response
     */
    private AdapterView.OnItemClickListener fromClickListener =
            new AdapterView.OnItemClickListener(){
                @Override
                public void onItemClick(AdapterView<?> adapterView, View view, int i, long l) {

                    String address=((com.example.hp.placesearch.AutoComplete.Place)adapterView.getItemAtPosition(i)).getPlaceText();
                    Log.i("OnItemClick:","Click Once");
                    Log.i("Selected Places:",address);


                    startpoint.setVisible(false);
                    if(route!=null){
                        route.remove();
                        startpos.remove();
                        endpos.remove();
                    }



                    requestDirection(address,travelmode);

                }
            };
}
