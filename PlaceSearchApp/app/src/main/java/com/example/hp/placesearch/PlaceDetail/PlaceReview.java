package com.example.hp.placesearch.PlaceDetail;

import android.app.ProgressDialog;
import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.Spinner;

import com.example.hp.placesearch.Data.Data;
import com.example.hp.placesearch.HttpRequest.CustomVolley;
import com.example.hp.placesearch.PlaceList.SpaceItemDecoration;
import com.example.hp.placesearch.R;

import org.json.JSONArray;
import org.json.JSONObject;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;

/**
 * A simple {@link Fragment} subclass.
 * Activities that contain this fragment must implement the
 * {@link PlaceReview.OnFragmentInteractionListener} interface
 * to handle interaction events.
 * Use the {@link PlaceReview#newInstance} factory method to
 * create an instance of this fragment.
 */
public class PlaceReview extends Fragment {
    // TODO: Rename parameter arguments, choose names that match
    // the fragment initialization parameters, e.g. ARG_ITEM_NUMBER
    private static final String ARG_PARAM1 = "param1";
    private static final String ARG_PARAM2 = "param2";

    // TODO: Rename and change types of parameters
    private String mParam1;
    private String mParam2;

    private OnFragmentInteractionListener mListener;

    private Context mContext;
    private View mView;
    private JSONObject placedetail_json;
    private JSONObject placedetailyelp_json;
    private RecyclerView reviewlist_view;

    ArrayList<HashMap<String, Object>> reviewlistItem=new ArrayList<HashMap<String, Object>>();

    private ReviewsAdapter mAdapter;

    Data global_data;

    public PlaceReview() {
        // Required empty public constructor
    }

    /**
     * Use this factory method to create a new instance of
     * this fragment using the provided parameters.
     *
     * @param param1 Parameter 1.
     * @param param2 Parameter 2.
     * @return A new instance of fragment PlaceReview.
     */
    // TODO: Rename and change types and number of parameters
    public static PlaceReview newInstance(String param1, String param2) {
        PlaceReview fragment = new PlaceReview();
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
        mView=inflater.inflate(R.layout.fragment_place_review, container, false);


        initGoogleData();
        if(reviewlistItem.size()>0){
            mView.findViewById(R.id.review_emptytext).setVisibility(View.GONE);
            mView.findViewById(R.id.review_recyclerview).setVisibility(View.VISIBLE);
        }
        else{
            return mView;
        }

        reviewlist_view=mView.findViewById(R.id.review_recyclerview);
        LinearLayoutManager linearLayoutManager=new LinearLayoutManager(mContext);
        reviewlist_view.setLayoutManager(linearLayoutManager);

        mAdapter=new ReviewsAdapter(reviewlistItem,mContext);
        reviewlist_view.setAdapter(mAdapter);
        mAdapter.setOnItemClickListener(new reviewlistItemListener());
        reviewlist_view.addItemDecoration(new SpaceItemDecoration(40));

        //review order
        Spinner review_order=(Spinner)mView.findViewById(R.id.review_order);
        review_order.setSelection(0,false);
        review_order.setOnItemSelectedListener(new reviewOrderListener());


        //review type
        Spinner review_type=(Spinner)mView.findViewById(R.id.review_type);
        review_type.setSelection(0,false);
        review_type.setOnItemSelectedListener(new reviewTypeListener());


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
        mContext=context;
        placedetail_json=((PlaceDetailActivity)getActivity()).deliverDetailData();
        global_data=(Data)context.getApplicationContext();
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


    void initGoogleData(){
        reviewlistItem.clear();

        try{
            JSONArray dataArr=placedetail_json.getJSONArray("reviews");
            for(int i=0;i<dataArr.length();i++){
                JSONObject itemObj=(JSONObject) dataArr.get(i);
                HashMap<String,Object> item=new HashMap<String,Object>();

                item.put("author_name",itemObj.get("author_name"));
                item.put("rating",itemObj.get("rating"));
                String googleTime=convertGoogleTime((Integer)itemObj.get("time"));
                Log.i("google time",googleTime);
                item.put("time",googleTime);
                item.put("text",itemObj.get("text"));
                item.put("author_url",itemObj.get("author_url"));
                item.put("photo",itemObj.get("profile_photo_url"));

                reviewlistItem.add(item);
            }

        }
        catch (Exception e){
            System.out.println("parse json"+e);
        }


    }


    void initYelpData(){
        reviewlistItem.clear();

        try{
            Log.i("Yelp data",placedetailyelp_json.toString());
            JSONArray dataArr=placedetailyelp_json.getJSONArray("reviews");
            for(int i=0;i<dataArr.length();i++){
                JSONObject itemObj=(JSONObject) dataArr.get(i);
                HashMap<String,Object> item=new HashMap<String,Object>();

                JSONObject user=itemObj.getJSONObject("user");
                item.put("author_name",user.get("name"));
                item.put("photo",user.get("image_url"));

                item.put("rating",itemObj.get("rating"));
//                String googleTime=convertGoogleTime((Integer)itemObj.get("time"));
                Log.i("yelp time",itemObj.get("time_created").toString());
                item.put("time",itemObj.get("time_created"));
                item.put("text",itemObj.get("text"));
                item.put("author_url",itemObj.get("url"));

                reviewlistItem.add(item);
            }
        }
        catch(Exception e){
            Log.i("init yelp error",e.toString());
        }
    }




    private class reviewlistItemListener implements ReviewsAdapter.OnItemClickListener{

        @Override
        public void onItemClick(View view,int position) {
            Log.i("Click Item",String.valueOf(position));

            Intent intent = new Intent();
            intent.setData(Uri.parse((String)reviewlistItem.get(position).get("author_url")));//Url
            intent.setAction(Intent.ACTION_VIEW);
            mContext.startActivity(intent);


        }
    }


    String convertGoogleTime(long time){
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

//        return sdf.format(new Date(Long.valueOf(time+"000")));
        return sdf.format(new Date(time*1000));


    }


    /**
     * Change order
     */
    class reviewOrderListener implements AdapterView.OnItemSelectedListener{


        @Override
        public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
            Log.i("order position",String.valueOf(position));
            mAdapter.changeOrder(position);
        }

        @Override
        public void onNothingSelected(AdapterView<?> parent) {

        }
    }



    class reviewTypeListener implements AdapterView.OnItemSelectedListener{


        @Override
        public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
            Log.i("type position",String.valueOf(position));
//            mAdapter.changeType(position);
            //Google
            if(position==0){
                mView.findViewById(R.id.review_emptytext).setVisibility(View.VISIBLE);

                initGoogleData();
//                Log.i("review length1",String.valueOf(reviewlistItem.size()));
                mAdapter.setReviewlistItem((ArrayList<HashMap<String, Object>>)reviewlistItem.clone());
                Spinner revieworder=mView.findViewById(R.id.review_order);
                mAdapter.changeOrder(revieworder.getSelectedItemPosition());

                if(reviewlistItem.size()>0){
                    mView.findViewById(R.id.review_emptytext).setVisibility(View.GONE);
                }
            }
            else if(position==1){
                mView.findViewById(R.id.review_emptytext).setVisibility(View.VISIBLE);

                if(placedetailyelp_json==null){
                    Log.i("yelp11","null value");
                    reviewlistItem.clear();
                    requestYelp();
                }
                else{
                    Log.i("yelp11",placedetailyelp_json.toString());

                    initYelpData();
                    mAdapter.setReviewlistItem((ArrayList<HashMap<String, Object>>)reviewlistItem.clone());
                    Spinner revieworder=mView.findViewById(R.id.review_order);
                    mAdapter.changeOrder(revieworder.getSelectedItemPosition());
                }


                if(reviewlistItem.size()>0){
                    mView.findViewById(R.id.review_emptytext).setVisibility(View.GONE);
                }
            }
        }

        @Override
        public void onNothingSelected(AdapterView<?> parent) {

        }
    }



    void requestYelp(){

        //request parameter
        JSONObject res=new JSONObject();
        try{
            res.put("name",placedetail_json.get("name"));
            JSONArray address_components=placedetail_json.getJSONArray("address_components");
            for(int i=0;i<address_components.length();i++){
                JSONObject component=address_components.getJSONObject(i);
                JSONArray types=component.getJSONArray("types");
                for(int j=0;j<types.length();j++){
                    if("country".equals(types.getString(j))){
                        res.put("country",component.get("short_name"));
                    }
                    else if("administrative_area_level_1".equals(types.getString(j))){
                        res.put("state",component.get("short_name"));
                    }
                    else if("locality".equals(types.getString(j))){
                        res.put("city",component.get("short_name"));
                    }
                    else if("route".equals(types.getString(j))){
                        res.put("address1",component.get("short_name"));
                    }
                }

            }


        }catch(Exception e){Log.i("request yelp",e.toString());}

        ProgressDialog pd = ProgressDialog.show(mContext, null, "Fetching reviews");

        if(!res.has("country")||!res.has("state")||!res.has("city")){
            pd.dismiss();
            mView.findViewById(R.id.review_emptytext).setVisibility(View.VISIBLE);
            return;
        }

        Log.i("Yelp param",res.toString());




        CustomVolley myVolley=new CustomVolley(mContext,pd);
        myVolley.setOnFinishListener(new CustomVolley.OnFinishListener() {
            @Override
            public void onFinish(JSONObject response,ProgressDialog pd) {
                pd.dismiss();

                if(response.has("Error")){
                    Log.i("Yelp","no results");
                    mView.findViewById(R.id.review_emptytext).setVisibility(View.VISIBLE);
                    return;
                }


                placedetailyelp_json=response;

                initYelpData();
                if(reviewlistItem.size()>0){
                    mView.findViewById(R.id.review_emptytext).setVisibility(View.GONE);
                }

                mAdapter.setReviewlistItem((ArrayList<HashMap<String, Object>>)reviewlistItem.clone());
                Spinner revieworder=mView.findViewById(R.id.review_order);
                mAdapter.changeOrder(revieworder.getSelectedItemPosition());
            }
        });
        myVolley.postRequest(global_data.getHostURL()+"/api/yelpreview",res);
    }






}
