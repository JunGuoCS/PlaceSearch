package com.example.hp.placesearch.InputView;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.net.Uri;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.example.hp.placesearch.PlaceDetail.PlaceDetailActivity;
import com.example.hp.placesearch.PlaceList.SpaceItemDecoration;
import com.example.hp.placesearch.R;

import org.json.JSONObject;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

/**
 * A simple {@link Fragment} subclass.
 * Activities that contain this fragment must implement the
 * {@link FavoriteList.OnFragmentInteractionListener} interface
 * to handle interaction events.
 * Use the {@link FavoriteList#newInstance} factory method to
 * create an instance of this fragment.
 */
public class FavoriteList extends Fragment {
    // TODO: Rename parameter arguments, choose names that match
    // the fragment initialization parameters, e.g. ARG_ITEM_NUMBER
    private static final String ARG_PARAM1 = "param1";
    private static final String ARG_PARAM2 = "param2";

    private RecyclerView favlist_view;
    ArrayList<HashMap<String, Object>> favlistItem=new ArrayList<HashMap<String, Object>>();
    favlistAdapter mAdapter;

    Context mContext;


    // TODO: Rename and change types of parameters
    private String mParam1;
    private String mParam2;

    private OnFragmentInteractionListener mListener;

    public FavoriteList() {
        // Required empty public constructor
    }

    /**
     * Use this factory method to create a new instance of
     * this fragment using the provided parameters.
     *
     * @param param1 Parameter 1.
     * @param param2 Parameter 2.
     * @return A new instance of fragment FavoriteList.
     */
    // TODO: Rename and change types and number of parameters
    public static FavoriteList newInstance(String param1, String param2) {
        FavoriteList fragment = new FavoriteList();
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
        View curView=inflater.inflate(R.layout.fragment_favorite_list, container, false);

        initData();
        Log.i("Fav List Data",favlistItem.toString());
        if(favlistItem.size()>0){
            curView.findViewById(R.id.favlist_emptytext).setVisibility(View.GONE);
            curView.findViewById(R.id.favlist_recyclerview).setVisibility(View.VISIBLE);
        }

        favlist_view=curView.findViewById(R.id.favlist_recyclerview);
        LinearLayoutManager linearLayoutManager=new LinearLayoutManager(mContext);
        favlist_view.setLayoutManager(linearLayoutManager);

        mAdapter=new favlistAdapter(mContext,favlistItem,curView);
        favlist_view.setAdapter(mAdapter);
        mAdapter.setOnItemClickListener(new favlistItemListener());
        favlist_view.addItemDecoration(new SpaceItemDecoration(20));

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
    public void onResume(){
        super.onResume();

        Log.i("Favorite","Resume");

        initData();
        mAdapter.setmData(favlistItem);
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

    void initData(){
        favlistItem.clear();

        SharedPreferences mPreferences=mContext.getSharedPreferences("Favorite", Context.MODE_PRIVATE);
        SharedPreferences.Editor note = mPreferences.edit();

        Map<String, ?> allPlace = mPreferences.getAll();
        for(Map.Entry<String,?> entry:allPlace.entrySet()){
            String jsonStr=entry.getValue().toString();

            try{
                JSONObject jsonObj=new JSONObject(jsonStr);
                HashMap<String,Object> place=new HashMap<String,Object>();

                place.put("place_id",jsonObj.get("place_id"));
                place.put("icon",jsonObj.get("icon"));
                place.put("name",jsonObj.get("name"));
                place.put("vicinity",jsonObj.get("vicinity"));
                place.put("lat",jsonObj.get("lat"));
                place.put("lng",jsonObj.get("lng"));

                favlistItem.add(place);

            }
            catch(Exception e){
                System.out.println(e);
            }
        }
    }



    private class favlistItemListener implements favlistAdapter.OnItemClickListener{

        @Override
        public void onItemClick(View view,int position) {
            Log.i("Click Item",String.valueOf(position));

            Intent intent=new Intent(getActivity(),PlaceDetailActivity.class);
//            intent.putExtra("name",favlistItem.get(position).get("name").toString());
//            intent.putExtra("place_id",favlistItem.get(position).get("place_id").toString());

            intent.putExtra("name",favlistItem.get(position).get("name").toString());
            intent.putExtra("place_id",favlistItem.get(position).get("place_id").toString());
            intent.putExtra("icon",favlistItem.get(position).get("icon").toString());
            intent.putExtra("vicinity",favlistItem.get(position).get("vicinity").toString());
            intent.putExtra("lat",(Double)favlistItem.get(position).get("lat"));
            intent.putExtra("lng",(Double)favlistItem.get(position).get("lng"));
            intent.putExtra("type","favlist");


            startActivity(intent);
        }
    }


}
