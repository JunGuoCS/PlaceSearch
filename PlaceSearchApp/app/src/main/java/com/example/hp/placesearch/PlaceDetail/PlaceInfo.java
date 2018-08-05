package com.example.hp.placesearch.PlaceDetail;

import android.content.Context;
import android.net.Uri;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.LinearLayout;
import android.widget.RatingBar;
import android.widget.TableRow;
import android.widget.TextView;

import com.example.hp.placesearch.R;

import org.json.JSONObject;

/**
 * A simple {@link Fragment} subclass.
 * Activities that contain this fragment must implement the
 * {@link PlaceInfo.OnFragmentInteractionListener} interface
 * to handle interaction events.
 * Use the {@link PlaceInfo#newInstance} factory method to
 * create an instance of this fragment.
 */
public class PlaceInfo extends Fragment {
    // TODO: Rename parameter arguments, choose names that match
    // the fragment initialization parameters, e.g. ARG_ITEM_NUMBER
    private static final String ARG_PARAM1 = "param1";
    private static final String ARG_PARAM2 = "param2";

    // TODO: Rename and change types of parameters
    private String mParam1;
    private String mParam2;

    private OnFragmentInteractionListener mListener;

//    String placedetail_str;
    JSONObject placedetail_json;

    View mView;

    public PlaceInfo() {
        // Required empty public constructor
    }

    /**
     * Use this factory method to create a new instance of
     * this fragment using the provided parameters.
     *
     * @param param1 Parameter 1.
     * @param param2 Parameter 2.
     * @return A new instance of fragment PlaceInfo.
     */
    // TODO: Rename and change types and number of parameters
    public static PlaceInfo newInstance(String param1, String param2) {
        PlaceInfo fragment = new PlaceInfo();
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
        mView=inflater.inflate(R.layout.fragment_place_info, container, false);

        setTableContent();



        // Inflate the layout for this fragment
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
        placedetail_json=((PlaceDetailActivity)getActivity()).deliverDetailData();
//        Log.i("Get Params:",placedetail_str);
    }

    @Override
    public void onDetach() {
        super.onDetach();
        mListener = null;
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


    void setTableContent(){
        if(placedetail_json.has("address")){
            TableRow address_r=mView.findViewById(R.id.info_address);
            TextView address=(TextView) address_r.getChildAt(1);
            try{
                address.setText(placedetail_json.getString("address"));
                address_r.setVisibility(View.VISIBLE);
            }catch(Exception e){Log.e("address",e.toString());}
        }

        if(placedetail_json.has("phone_number")){
            TableRow phone_r=mView.findViewById(R.id.info_phonenumber);
            TextView phone=(TextView) phone_r.getChildAt(1);
            try{
                phone.setText(placedetail_json.getString("phone_number"));
                phone_r.setVisibility(View.VISIBLE);
            }catch(Exception e){Log.e("phone_number",e.toString());}
        }

        if(placedetail_json.has("price_level")){
            TableRow price_r=mView.findViewById(R.id.info_pricelevel);
            TextView price=(TextView) price_r.getChildAt(1);
            try{
                int price_level=placedetail_json.getInt("price_level");
                String price_level_str="";
                for(int i=0;i<price_level;i++){
                    price_level_str+="$";
                }
                if(price_level==0)
                    price_level_str="0";

                price.setText(price_level_str);
                price_r.setVisibility(View.VISIBLE);
            }catch(Exception e){Log.e("address",e.toString());}
        }

        if(placedetail_json.has("rating")){
            TableRow rating_r=mView.findViewById(R.id.info_rating);
            LinearLayout rating_ly=(LinearLayout) rating_r.getChildAt(1);
            RatingBar rating=(RatingBar)rating_ly.findViewById(R.id.info_rating2);
            try{
                String rating_str=placedetail_json.getString("rating");
                rating.setRating(Float.parseFloat(rating_str));
                Log.i("rating string: ",rating_str);
//                rating.setRating(2.3f);
                rating_r.setVisibility(View.VISIBLE);
            }catch(Exception e){Log.e("address",e.toString());}
        }

        if(placedetail_json.has("url")){
            TableRow url_r=mView.findViewById(R.id.info_url);
            TextView url=(TextView) url_r.getChildAt(1);
            try{
                url.setText(placedetail_json.getString("url"));
                url_r.setVisibility(View.VISIBLE);
            }catch(Exception e){Log.e("address",e.toString());}
        }

        if(placedetail_json.has("website")){
            TableRow website_r=mView.findViewById(R.id.info_website);
            TextView website=(TextView) website_r.getChildAt(1);
            try{
                website.setText(placedetail_json.getString("website"));
                website_r.setVisibility(View.VISIBLE);
            }catch(Exception e){Log.e("address",e.toString());}
        }

    }
}
