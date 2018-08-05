package com.example.hp.placesearch.PlaceList;

import android.app.Activity;
import android.app.ProgressDialog;
import android.content.Context;
import android.content.Intent;
import android.graphics.Color;
import android.support.annotation.NonNull;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.support.v7.widget.Toolbar;
import android.util.Log;
import android.view.MenuItem;
import android.view.View;
import android.widget.AdapterView;
import android.widget.Button;
import android.widget.ListView;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.JsonRequest;
import com.android.volley.toolbox.Volley;
import com.example.hp.placesearch.Data.Data;
import com.example.hp.placesearch.MainActivity;
import com.example.hp.placesearch.PlaceDetail.PlaceDetailActivity;
import com.example.hp.placesearch.R;
import com.githang.statusbar.StatusBarCompat;
import com.google.android.gms.common.ConnectionResult;
import com.google.android.gms.common.api.GoogleApiClient;
import com.google.android.gms.common.api.ResultCallback;
import com.google.android.gms.location.LocationServices;
import com.google.android.gms.location.places.Place;
import com.google.android.gms.location.places.PlaceBuffer;
import com.google.android.gms.location.places.Places;

import org.json.JSONArray;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

public class PlaceList extends AppCompatActivity {
    placelistAdapter mAdapter;

    private RecyclerView placelist_view;
    ArrayList<HashMap<String, Object>> placelistItem=new ArrayList<HashMap<String, Object>>();
    ArrayList<HashMap<String, Object>> backuplist=new ArrayList<HashMap<String, Object>>();

    ArrayList<String> pages=new ArrayList<String>();//store next page token
    int page_no=0;

    String inputParams;

    Data global_data;

    private GoogleApiClient mGoogleApiClient;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_place_list);
        StatusBarCompat.setStatusBarColor(this, Color.parseColor("#018975"));

        global_data=(Data)getApplicationContext();



        //toolbar
        Toolbar toolbar = (Toolbar) findViewById(R.id.placelist_toolbar);
        setSupportActionBar(toolbar);
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);

//        String jsonStr;
        if(getIntent().getStringExtra("PlaceListData")!=null){
            inputParams=getIntent().getStringExtra("PlaceListData");
        }
//        inputParams=new String(jsonStr);

        //listview
        initData(inputParams);
        dataToback();

        placelist_view=(RecyclerView)findViewById(R.id.placelist_recyclerview);
        LinearLayoutManager linearLayoutManager=new LinearLayoutManager(this);
        placelist_view.setLayoutManager(linearLayoutManager);

        mAdapter=new placelistAdapter(this,placelistItem);
        placelist_view.setAdapter(mAdapter);
        mAdapter.setOnItemClickListener(new placelistItemListener());
        placelist_view.addItemDecoration(new SpaceItemDecoration(20));

        //pages
        Button prev_btn=(Button)findViewById(R.id.prev_page);
        Button next_btn=(Button)findViewById(R.id.next_page);
        prev_btn.setEnabled(false);

        prev_btn.setOnClickListener(new PrevPageListener());
        next_btn.setOnClickListener(new NextPageListener());

    }


    /**
     * come back button
     * @param item
     * @return whether come back
     */
    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        switch (item.getItemId()) {
            case android.R.id.home:
                returnHome(this);
                return true;
        }
        return super.onOptionsItemSelected(item);
    }

    public static void returnHome(Context context) {
        Intent intent = new Intent(context, MainActivity.class);
        intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
        intent.addFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP);
        context.startActivity(intent);
    }


    /**
     * display place list
     */
    private class placelistItemListener implements placelistAdapter.OnItemClickListener{

        @Override
        public void onItemClick(View view,int position) {
            Log.i("Click Item",String.valueOf(position));

            Intent intent=new Intent(PlaceList.this,PlaceDetailActivity.class);

            intent.putExtra("name",placelistItem.get(position).get("name").toString());
            intent.putExtra("place_id",placelistItem.get(position).get("place_id").toString());
            intent.putExtra("icon",placelistItem.get(position).get("icon").toString());
            intent.putExtra("vicinity",placelistItem.get(position).get("vicinity").toString());
            intent.putExtra("lat",(Double)placelistItem.get(position).get("lat"));
            intent.putExtra("lng",(Double)placelistItem.get(position).get("lng"));
            intent.putExtra("type","placelist");

            startActivity(intent);
        }
    }


    void initData(String jsonStr){
//        String jsonStr=getIntent().getStringExtra("PlaceListData");
        placelistItem.clear();

//        Log.i("Acceped Param:",getIntent().getExtras().toString());
        try{
            JSONObject jsonObj=new JSONObject(jsonStr);

            JSONArray dataArr=jsonObj.getJSONArray("data");
            for(int i=0;i<dataArr.length();i++){
                JSONObject itemObj=(JSONObject) dataArr.get(i);
                HashMap<String,Object> item=new HashMap<String,Object>();

                item.put("place_id",itemObj.get("place_id"));
                item.put("name",itemObj.get("name"));
                item.put("icon",itemObj.get("icon"));
                item.put("vicinity",itemObj.get("vicinity"));
                item.put("lat",itemObj.getDouble("lat"));
                item.put("lng",itemObj.getDouble("lng"));

                placelistItem.add(item);
            }

            if(jsonObj.has("next_page_token")){
                if(page_no==pages.size())
                    pages.add(jsonObj.getString("next_page_token"));
            }
            else{
                Button next_btn=findViewById(R.id.next_page);
                next_btn.setEnabled(false);
            }
        }
        catch (Exception e){
            System.out.println(e);
        }

        if(placelistItem.size()>0){
            findViewById(R.id.placelise_emptytext).setVisibility(View.GONE);
        }

    }




    class PrevPageListener implements View.OnClickListener{
        String next_page_token;

        @Override
        public void onClick(View v) {
            Button next_btn=findViewById(R.id.next_page);
            next_btn.setEnabled(true);

            ProgressDialog pd = ProgressDialog.show(PlaceList.this, null, "Fetching previous page");

            page_no--;
            if(page_no==0){
                Button prev_btn=findViewById(R.id.prev_page);
                prev_btn.setEnabled(false);
                //get backup page
                backTodata();
                pd.dismiss();
                mAdapter.setNewPage(placelistItem);
                mAdapter.notifyDataSetChanged();
            }
            else{
                next_page_token=pages.get(page_no-1);
                JSONObject jsonObj=new JSONObject();
                try{
                    jsonObj.put("page_token",next_page_token);

                    NextPageRequest npr=new NextPageRequest(pd);
                    npr.requestNextPage(jsonObj);

                }
                catch (Exception e){System.out.println(e);}
            }
        }
    }

    class NextPageListener implements View.OnClickListener{
        String next_page_token;

        @Override
        public void onClick(View v) {

            Button prev_btn=findViewById(R.id.prev_page);
            prev_btn.setEnabled(true);

            ProgressDialog pd = ProgressDialog.show(PlaceList.this, null, "Fetching next page");

            page_no++;
            if(page_no<=pages.size()){
                next_page_token=pages.get(page_no-1);
                //request next page
                JSONObject jsonObj=new JSONObject();
                try{
                    jsonObj.put("page_token",next_page_token);

                    NextPageRequest npr=new NextPageRequest(pd);
                    npr.requestNextPage(jsonObj);

                }
                catch (Exception e){System.out.println(e);}
            }

        }
    }


    class NextPageRequest{
        private ProgressDialog mPd;
        public NextPageRequest(ProgressDialog pd){
            mPd=pd;
        }

        void requestNextPage(JSONObject jsonObj){
            RequestQueue requestQueue = Volley.newRequestQueue(getApplicationContext());
            Log.i("Page Token",jsonObj.toString());

            JsonRequest<JSONObject> jsonRequest = new JsonObjectRequest(Request.Method.POST,global_data.getHostURL()+"/api/nextpage", jsonObj,
                    new Response.Listener<JSONObject>() {
                        @Override
                        public void onResponse(JSONObject response) {
                            mPd.dismiss();
                            try{
//                                Log.d("Next Page Token", "response -> " + response.getString("next_page_token"));

                                initData(response.toString());
                                mAdapter.setNewPage(placelistItem);
                                mAdapter.notifyDataSetChanged();
//                                Intent intent=new Intent(mContext,PlaceList.class);
//                                intent.putExtra("PlaceListData",response.toString());
//                                mContext.startActivity(intent);
                            }
                            catch(Exception e){
                                System.out.println(e);
                            }


                        }
                    }, new Response.ErrorListener() {
                @Override
                public void onErrorResponse(VolleyError error) {
                    Log.e("Post Error Response", error.getMessage(), error);
                    mPd.dismiss();
                }
            })
            {

                @Override
                public Map<String, String> getHeaders() {
                    HashMap<String, String> headers = new HashMap<String, String>();
                    headers.put("Accept", "application/json");
                    headers.put("Content-Type", "application/json; charset=UTF-8");

                    return headers;
                }
            };
            requestQueue.add(jsonRequest);
        }
    }


    void dataToback(){
        backuplist.clear();
        backuplist.addAll(placelistItem);
    }
    void backTodata(){
        placelistItem.clear();
        placelistItem.addAll(backuplist);
    }

    @Override
    protected void onSaveInstanceState(Bundle pastState){
        Log.i("Saved Enter",inputParams);

        pastState.putString("PlaceListData",inputParams);
        super.onSaveInstanceState(pastState);

    }

    @Override
    protected void onRestoreInstanceState(Bundle savedInstanceState) {
        // Always call the superclass so it can restore the view hierarchy
        Log.i("Restore Enter",savedInstanceState.toString());

        // Restore state members from saved instance
        inputParams= savedInstanceState.getString("PlaceListData");

        super.onRestoreInstanceState(savedInstanceState);

    }


    @Override
    public void onResume(){
        super.onResume();

//        mAdapter.setmData(placelistItem);
        mAdapter.notifyDataSetChanged();
    }

}


