package com.example.hp.placesearch.InputView;

import android.Manifest;
import android.app.ProgressDialog;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.location.Location;
import android.location.LocationListener;
import android.location.LocationManager;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.support.v4.app.ActivityCompat;
import android.support.v4.app.Fragment;
import android.support.v4.content.ContextCompat;
import android.text.Editable;
import android.text.TextWatcher;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.AutoCompleteTextView;
import android.widget.Button;
import android.widget.EditText;
import android.widget.RadioButton;
import android.widget.RadioGroup;
import android.widget.Spinner;
import android.widget.Toast;

import com.example.hp.placesearch.AutoComplete.CustomAutoCompleteAdapter;
import com.example.hp.placesearch.Data.Data;
import com.example.hp.placesearch.HttpRequest.CustomVolley;
import com.example.hp.placesearch.PlaceList.PlaceList;
import com.example.hp.placesearch.R;

import com.google.android.gms.location.places.GeoDataClient;

import org.json.JSONObject;

/**
 * A simple {@link Fragment} subclass.
 * Activities that contain this fragment must implement the
 * {@link SearchForm.OnFragmentInteractionListener} interface
 * to handle interaction events.
 * Use the {@link SearchForm#newInstance} factory method to
 * create an instance of this fragment.
 */
public class SearchForm extends Fragment {
    // TODO: Rename parameter arguments, choose names that match
    // the fragment initialization parameters, e.g. ARG_ITEM_NUMBER
    private static final String ARG_PARAM1 = "param1";
    private static final String ARG_PARAM2 = "param2";

    // TODO: Rename and change types of parameters
    private String mParam1;
    private String mParam2;

    private Context mContext;
    private View mView;

    final int REQUEST_LOCATION=0x01;
    LocationManager locationManager;
    Data global_data;

    private OnFragmentInteractionListener mListener;

    public static final String TAG = "AutoCompleteActivity";
    private static final int AUTO_COMP_REQ_CODE = 1;

    protected GeoDataClient geoDataClient;


    public SearchForm() {
        // Required empty public constructor
    }

    /**
     * Use this factory method to create a new instance of
     * this fragment using the provided parameters.
     *
     * @param param1 Parameter 1.
     * @param param2 Parameter 2.
     * @return A new instance of fragment SearchForm.
     */
    // TODO: Rename and change types and number of parameters
    public static SearchForm newInstance(String param1, String param2) {
        SearchForm fragment = new SearchForm();
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

        global_data=(Data)mContext.getApplicationContext();

    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        View curView=inflater.inflate(R.layout.fragment_search_form, container, false);

        Button search_btn=(Button)curView.findViewById(R.id.search_btn);
        search_btn.setOnClickListener(new SearchBtn());

        checkPermission();

        mView=curView;



        //Set adapter for autocomplete text view
        AutoCompleteTextView searchPlace = curView.findViewById(R.id.othLocation);

//        CustomAutoCompleteAdapter adapter =  new CustomAutoCompleteAdapter(getActivity());
        CustomAutoCompleteAdapter adapter =  new CustomAutoCompleteAdapter(mContext);

        searchPlace.setAdapter(adapter);
        searchPlace.setOnItemClickListener(onItemClickListener);

        searchPlace.setEnabled(false);


        //clear
        Button clearBtn=curView.findViewById(R.id.clear_btn);
        clearBtn.setOnClickListener(new ClearBtn());

        //ratio group
        RadioGroup radioGroup=curView.findViewById(R.id.radio_group);
        radioGroup.setOnCheckedChangeListener(new radioGListener());


        //when type in remove tips
        final EditText keyword=mView.findViewById(R.id.keyword);
        keyword.addTextChangedListener(new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence s, int start, int count, int after) { }
            @Override
            public void onTextChanged(CharSequence s, int start, int before, int count) {
                mView.findViewById(R.id.error_keyword).setVisibility(View.GONE);
            }
            @Override
            public void afterTextChanged(Editable s) {}
        });

        searchPlace.addTextChangedListener(new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence s, int start, int count, int after) { }
            @Override
            public void onTextChanged(CharSequence s, int start, int before, int count) {
                mView.findViewById(R.id.error_othLocation).setVisibility(View.GONE);
            }
            @Override
            public void afterTextChanged(Editable s) {}
        });

        return curView;
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
    }

    @Override
    public void onDetach() {
        super.onDetach();
        mListener = null;
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


    /**
     * submit button
     */
    class SearchBtn implements View.OnClickListener{
        public void onClick(View v){

            if(!isValid()){
                Toast.makeText(mContext,"Please fix all fields with errors",Toast.LENGTH_LONG).show();
                return;
            }



            ProgressDialog pd = ProgressDialog.show(mContext, null, "Fetching results");


            EditText keyword=(EditText) mView.findViewById(R.id.keyword);
            EditText distance=(EditText)mView.findViewById(R.id.distance);
            Spinner category_spinner=mView.findViewById(R.id.category);
//            TextView category=(TextView)category_spinner.getSelectedView();
            String []category_arr=getResources().getStringArray(R.array.category_val);
            int category_i=category_spinner.getSelectedItemPosition();
            RadioButton cur_radio=mView.findViewById(R.id.radio1);
            RadioButton oth_radio=mView.findViewById(R.id.radio2);
            AutoCompleteTextView oth_location=mView.findViewById(R.id.othLocation);

            float distance_val=10;
            if(!"".equals(distance.getText().toString())){
                distance_val=Float.valueOf(distance.getText().toString());
            }


            JSONObject jsonObj = new JSONObject();
            try{
                if(cur_radio.isChecked()){
                    global_data.curToLatLng();
                    jsonObj.put("isCurLoc",true);
                }else{
                    jsonObj.put("isCurLoc",false);
                    jsonObj.put("locName",oth_location.getText().toString());
                }

                jsonObj.put("keyword",keyword.getText().toString());
                jsonObj.put("distance",distance_val);
                jsonObj.put("category",category_arr[category_i]);
                jsonObj.put("lat",global_data.getLat());
                jsonObj.put("lng",global_data.getLng());

                Log.i("Request Parameter",jsonObj.toString());

            }
            catch(Exception e){
                System.out.println(e);
            }

            //post request
            CustomVolley myVolley=new CustomVolley(getActivity(),pd);
            myVolley.setOnFinishListener(new CustomVolley.OnFinishListener() {
                @Override
                public void onFinish(JSONObject response,ProgressDialog pd) {
                    pd.dismiss();
                    Intent intent=new Intent(mContext,PlaceList.class);
                    intent.putExtra("PlaceListData",response.toString());
                    mContext.startActivity(intent);
                }
            });
            myVolley.postRequest(global_data.getHostURL()+"/api/placelist",jsonObj);


        }
    }

    void checkPermission(){

        if (ActivityCompat.checkSelfPermission(mContext, Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED && ActivityCompat.checkSelfPermission(mContext, Manifest.permission.ACCESS_COARSE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
            requestPermissions(new String[]{android.Manifest.permission.ACCESS_COARSE_LOCATION,
                            android.Manifest.permission.ACCESS_FINE_LOCATION},
                    REQUEST_LOCATION);
        }
        else{
            getCurLocation();
        }

    }


    /**
     * get current location
     * @param requestCode
     * @param permissions
     * @param grantResults
     */

    @Override
    public void onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);


//        ContextCompat.checkSelfPermission( mContext, android.Manifest.permission.ACCESS_COARSE_LOCATION) != PackageManager.PERMISSION_GRANTED
        if ( Build.VERSION.SDK_INT >= 23 &&
                ContextCompat.checkSelfPermission( mContext, android.Manifest.permission.ACCESS_FINE_LOCATION ) != PackageManager.PERMISSION_GRANTED ) {
            return  ;
        }

        getCurLocation();
    }

    public void getCurLocation(){
        String provider = LocationManager.GPS_PROVIDER;
        locationManager = (LocationManager) mContext.getSystemService(Context.LOCATION_SERVICE);
        try {
            Location location = locationManager.getLastKnownLocation(provider);

            if(location==null){
                MyLocationListener tmp=new MyLocationListener();
                locationManager.requestLocationUpdates(provider,5000,0,tmp);
            }
            else{
                global_data.setCurLatLng(location.getLatitude(),location.getLongitude());
                Log.i("Has Location",String.valueOf(global_data.getCur_lat())+":"+String.valueOf(global_data.getCur_lng()));
            }

        } catch (SecurityException e) {
            System.out.println(e);
            Toast.makeText(mContext, "Cannot Get Location", Toast.LENGTH_SHORT).show();
        }
    }


    private class MyLocationListener
            implements LocationListener {

        @Override
        public void onLocationChanged(Location location) {
//            if (mListener != null) {
//                mListener.onLocationChanged(location);
//            }
            //only call once
            locationManager.removeUpdates(this);

            global_data.setCurLatLng(location.getLatitude(),location.getLongitude());
            Log.i("My class listenr",String.valueOf(global_data.getCur_lat())+":"+String.valueOf(global_data.getCur_lng()));

        }

        @Override
        public void onStatusChanged(String provider, int status, Bundle extras) {

        }

        @Override
        public void onProviderEnabled(String provider) {

        }

        @Override
        public void onProviderDisabled(String provider) {

        }


    }


    /**
     * google map
     */
    private AdapterView.OnItemClickListener onItemClickListener =
            new AdapterView.OnItemClickListener(){
                @Override
                public void onItemClick(AdapterView<?> adapterView, View view, int i, long l) {


                    Log.i("OnItemClick:","Click Once");
                    Log.i("Selected Places:",((com.example.hp.placesearch.AutoComplete.Place)adapterView.getItemAtPosition(i)).getPlaceText());
                }
            };



    boolean isValid(){
        boolean flag=true;

        EditText keyword=mView.findViewById(R.id.keyword);
        if("".equals(keyword.getText().toString())){
            flag=false;
            mView.findViewById(R.id.error_keyword).setVisibility(View.VISIBLE);
        }

        RadioButton radio2=mView.findViewById(R.id.radio2);
        if(radio2.isChecked()){
            AutoCompleteTextView othLocation=mView.findViewById(R.id.othLocation);
            if("".equals(othLocation.getText().toString())){
                flag=false;
                mView.findViewById(R.id.error_othLocation).setVisibility(View.VISIBLE);
            }
        }

        if(flag)
            return true;
        else
            return false;

    }


    /**
     * Clear Operation
     */
    class ClearBtn implements View.OnClickListener{

        @Override
        public void onClick(View v) {
            mView.findViewById(R.id.error_keyword).setVisibility(View.GONE);
            mView.findViewById(R.id.error_othLocation).setVisibility(View.GONE);

            RadioButton radio1=mView.findViewById(R.id.radio1);
            radio1.setChecked(true);
            AutoCompleteTextView othLocation=mView.findViewById(R.id.othLocation);
            othLocation.setText("");
            othLocation.setEnabled(false);

            EditText keyword=mView.findViewById(R.id.keyword);
            keyword.setText("");

            Spinner category=mView.findViewById(R.id.category);
            category.setSelection(0);

            EditText distance=mView.findViewById(R.id.distance);
            distance.setText("");
        }
    }


    /**
     * Radio Group
     */
    class radioGListener implements RadioGroup.OnCheckedChangeListener{

        @Override
        public void onCheckedChanged(RadioGroup group, int checkedId) {
            switch (checkedId) {
                case R.id.radio1:
                    mView.findViewById(R.id.othLocation).setEnabled(false);
                    break;
                case R.id.radio2:
                    mView.findViewById(R.id.othLocation).setEnabled(true);
                    break;
                default:
                    break;
            }
        }
    }

}
