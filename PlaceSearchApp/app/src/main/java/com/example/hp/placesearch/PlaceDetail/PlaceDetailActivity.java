package com.example.hp.placesearch.PlaceDetail;

import android.app.ProgressDialog;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.graphics.Bitmap;
import android.graphics.Color;
import android.net.Uri;
import android.support.annotation.NonNull;
import android.support.design.widget.TabLayout;
import android.support.v4.view.ViewPager;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.Toolbar;
import android.util.DisplayMetrics;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;

import com.example.hp.placesearch.Data.Data;
import com.example.hp.placesearch.HttpRequest.CustomVolley;
import com.example.hp.placesearch.MainActivity;
import com.example.hp.placesearch.PlaceList.PlaceList;
import com.example.hp.placesearch.R;
import com.githang.statusbar.StatusBarCompat;
import com.google.android.gms.location.places.GeoDataClient;
import com.google.android.gms.location.places.PlacePhotoMetadata;
import com.google.android.gms.location.places.PlacePhotoMetadataBuffer;
import com.google.android.gms.location.places.PlacePhotoMetadataResponse;
import com.google.android.gms.location.places.PlacePhotoResponse;
import com.google.android.gms.location.places.Places;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;

import org.json.JSONArray;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.HashMap;

public class PlaceDetailActivity extends AppCompatActivity
        implements PlaceInfo.OnFragmentInteractionListener,
                    PlacePhotos.OnFragmentInteractionListener,
                    PlaceMap.OnFragmentInteractionListener,
                    PlaceReview.OnFragmentInteractionListener{

    //tablayout
    private TabLayout curTabLayout;
    private ViewPager curViewPager;
    private DetailFPAdapter fragmentPagerAdapter;

    private TabLayout.Tab info_tab;
    private TabLayout.Tab photos_tab;
    private TabLayout.Tab map_tab;
    private TabLayout.Tab review_tab;

    private JSONObject placedetail_json;
    private ArrayList<Bitmap> photoslist=new ArrayList<>();

    //google map
    private GeoDataClient mGeoDataClient;

    private Data global_data;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_place_detail);
        StatusBarCompat.setStatusBarColor(this, Color.parseColor("#018975"));

        global_data=(Data)getApplicationContext();


        //toolbar
        Toolbar toolbar = (Toolbar) findViewById(R.id.placedetail_toolbar);
        setSupportActionBar(toolbar);
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);

        //get detail data
        toolbar.setTitle(getIntent().getStringExtra("name"));

        //photos
        mGeoDataClient = Places.getGeoDataClient(this, null);

        //request detail
        setDetailData();

    }


    /**
     * tab operation
     */
    private void initView(){
        curViewPager= (ViewPager) findViewById(R.id.placedetail_viewPager);
        fragmentPagerAdapter = new DetailFPAdapter(getSupportFragmentManager());
        curViewPager.setAdapter(fragmentPagerAdapter);

        curTabLayout = (TabLayout) findViewById(R.id.placedetail_tabLayout);
        curTabLayout.setupWithViewPager(curViewPager);

        //tab position
        info_tab = curTabLayout.getTabAt(0);
        photos_tab= curTabLayout.getTabAt(1);
        map_tab= curTabLayout.getTabAt(2);
        review_tab= curTabLayout.getTabAt(3);


        //find id function need parent view to work
        LinearLayout AllTab = (LinearLayout) LayoutInflater.from(this).inflate(R.layout.detail_tab_icon, null);

        LinearLayout tabOne = AllTab.findViewById(R.id.info_tab);
        info_tab.setCustomView(tabOne);

        LinearLayout tabTwo = AllTab.findViewById(R.id.photo_tab);
        photos_tab.setCustomView(tabTwo);

        LinearLayout tabThree = AllTab.findViewById(R.id.map_tab);
        map_tab.setCustomView(tabThree);

        LinearLayout tabFour = AllTab.findViewById(R.id.review_tab);
        review_tab.setCustomView(tabFour);


        curTabLayout.addOnTabSelectedListener(OnTabSelectedListener);

    }


    @Override
    public void onFragmentInteraction(Uri uri) {

    }

    private TabLayout.OnTabSelectedListener OnTabSelectedListener = new TabLayout.OnTabSelectedListener(){
        @Override
        public void onTabSelected(TabLayout.Tab tab) {
            int c = tab.getPosition();
            LinearLayout tab_linearlyout=(LinearLayout)tab.getCustomView();
            TextView tab_text=(TextView)tab_linearlyout.getChildAt(1);
            tab_text.setTextColor(getResources().getColor(R.color.selectedTabColor));

        }

        @Override
        public void onTabUnselected(TabLayout.Tab tab) {
            LinearLayout tab_linearlyout=(LinearLayout)tab.getCustomView();
            TextView tab_text=(TextView)tab_linearlyout.getChildAt(1);
            tab_text.setTextColor(getResources().getColor(R.color.tabColor));
        }

        @Override
        public void onTabReselected(TabLayout.Tab tab) {

        }

    };



    /**
     * actioni bar
     * @param item
     * @return operation in actionbar
     */
    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        switch (item.getItemId()) {
            case android.R.id.home:
                returnHome(this);
                return true;
            case R.id.actionbar_share:
                Log.i("share","click");
                openTweet();
                return true;
            case R.id.actionbar_favorite:
                Log.i("favorite","click");
                addOrRemovFav(item);
                return true;
        }
        return super.onOptionsItemSelected(item);
    }

    public void returnHome(Context context) {
        if("placelist".equals(getIntent().getStringExtra("type"))){
            Intent intent = new Intent(context, PlaceList.class);
            intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
            intent.addFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP);
            context.startActivity(intent);
        }
        else{
            Intent intent = new Intent(context, MainActivity.class);
            intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
            intent.addFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP);
            context.startActivity(intent);
        }


        this.finish();
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.detail_toolbar, menu);

        if(checkFav(getIntent().getStringExtra("place_id"))){
//            MenuItem mi=findViewById(R.id.actionbar_favorite);
            MenuItem mi=menu.getItem(1);

            mi.setIcon(R.drawable.ic_fill_white_24dp);
        }

        return true;
    }






    /**
     * set detail data
     */
    void setDetailData(){
        String place_id=getIntent().getStringExtra("place_id");

        ProgressDialog pd = ProgressDialog.show(this, null, "Fetching details");
        CustomVolley myVolley=new CustomVolley(this,pd);
        myVolley.setOnFinishListener(new CustomVolley.OnFinishListener() {
            @Override
            public void onFinish(JSONObject response,ProgressDialog pd) {
                Log.i("Request Success",response.toString());
                placedetail_json=response;

                JSONArray photos=new JSONArray();
                try{
                    photos=placedetail_json.getJSONArray("photos");
                }catch(Exception e){System.out.println("No photos"+e.toString());}

                if(photos.length()>0){
                    getGooglePhotos(pd);
//                    findViewById(R.id.photo_emptytext).setVisibility(View.GONE);
//                    findViewById(R.id.photo_recyclerview).setVisibility(View.VISIBLE);
//                    Log.i("photos size",String.valueOf(photos.length()));
                }
                else{
                    initView();
                    pd.dismiss();
                }
//                    getGooglePhotos(pd);


                //after get data, init view
//                initView();

            }
        });

        JSONObject jsonObj=new JSONObject();
        try{
            jsonObj.put("place_id",place_id);
        }catch(Exception e){}

        myVolley.postRequest(global_data.getHostURL()+"/api/placedetail",jsonObj);
    }

    JSONObject deliverDetailData(){
        return placedetail_json;
    }

    ArrayList<Bitmap> deliverPhotosData(){
        return photoslist;
    }


    void getGooglePhotos(final ProgressDialog pd){
        googleVar.finish_num=0;

        String placeId=new String();
        try{
            placeId = placedetail_json.getString("place_id");
        }catch(Exception e){Log.e("Photos", e.toString());}


        try{
            final Task<PlacePhotoMetadataResponse> photoMetadataResponse = mGeoDataClient.getPlacePhotos(placeId);
//            if(!photoMetadataResponse.isSuccessful()){
//                initView();
//                pd.dismiss();
//                return;
//            }

            photoMetadataResponse.addOnCompleteListener(new OnCompleteListener<PlacePhotoMetadataResponse>() {
                @Override
                public void onComplete(@NonNull Task<PlacePhotoMetadataResponse> task) {
                    if(task==null){
                        pd.dismiss();
                        initView();
                        return;

                    }

                    // Get the list of photos.
                    PlacePhotoMetadataResponse photos = task.getResult();
                    if(photos==null){
                        return;
                    }
                    // Get the PlacePhotoMetadataBuffer (metadata for all of the photos).
                    PlacePhotoMetadataBuffer photoMetadataBuffer = photos.getPhotoMetadata();

                    final int photos_num=photoMetadataBuffer.getCount();

                    for(int i=0;i<photos_num;i++){
                        // Get the first photo in the list.
                        PlacePhotoMetadata photoMetadata = photoMetadataBuffer.get(i);
                        Log.i("Metadata",photoMetadata.toString());

                        // Get the attribution text.
                        CharSequence attribution = photoMetadata.getAttributions();
                        Log.i("attribute",attribution.toString());


                        // Get a full-size bitmap for the photo.
//                    Task<PlacePhotoResponse> photoResponse = mGeoDataClient.getPhoto(photoMetadata);
                        DisplayMetrics dm=getResources().getDisplayMetrics();
                        Task<PlacePhotoResponse> photoResponse = mGeoDataClient.getScaledPhoto(photoMetadata,dm.widthPixels,dm.heightPixels);

                        photoResponse.addOnCompleteListener(new OnCompleteListener<PlacePhotoResponse>() {
                            @Override
                            public void onComplete(@NonNull Task<PlacePhotoResponse> task) {
                                PlacePhotoResponse photo = task.getResult();

                                Bitmap bitmap = photo.getBitmap();
                                photoslist.add(bitmap);

                                Log.i("Photo","Enter");

                                googleVar.finish_num++;
                                if(googleVar.finish_num>=photos_num){

                                    pd.dismiss();
                                    initView();
                                }
                            }
                        });
                    }

                }
            });
        }
        catch(Exception e){
            initView();
            pd.dismiss();
        }

    }


    /**
     * favorite
     */
    boolean checkFav(String place_id){
        SharedPreferences mPreferences=getSharedPreferences("Favorite", Context.MODE_PRIVATE);
        if("none".equals(mPreferences.getString(place_id,"none"))){
            return false;
        }
        else{
            return true;
        }
    }

    public void addOrRemovFav(MenuItem mi){
        SharedPreferences mPreferences=getSharedPreferences("Favorite", Context.MODE_PRIVATE);
        SharedPreferences.Editor note = mPreferences.edit();
        try{
            if("none".equals(mPreferences.getString((String)placedetail_json.get("place_id"),"none"))){
                JSONObject jsonObj=new JSONObject();

                try{
                    jsonObj.put("place_id",getIntent().getStringExtra("place_id"));
                    jsonObj.put("name",getIntent().getStringExtra("name"));
                    jsonObj.put("icon",getIntent().getStringExtra("icon"));
                    jsonObj.put("vicinity",getIntent().getStringExtra("vicinity"));
                    jsonObj.put("lat",getIntent().getDoubleExtra("lat",0));
                    jsonObj.put("lng",getIntent().getDoubleExtra("lng",0));

                    note.putString(getIntent().getStringExtra("place_id"),jsonObj.toString());
                    note.commit();

                    Toast toast = Toast.makeText(this, getIntent().getStringExtra("name")+" was added to favorites", Toast.LENGTH_LONG);
                    toast.show();

                    mi.setIcon(R.drawable.ic_fill_white_24dp);
//                    btn.setImageDrawable(this.getResources().getDrawable(R.drawable.ic_fill_red_24dp));
                }
                catch (Exception e){
                    System.out.println(e);
                }


            }
            else{
                note.remove(getIntent().getStringExtra("place_id"));
                note.commit();

                Toast toast = Toast.makeText(this, getIntent().getStringExtra("name")+" was removed from favorites", Toast.LENGTH_LONG);
                toast.show();

                mi.setIcon(R.drawable.ic_outline_white_24dp);
//                btn.setImageDrawable(mContext.getResources().getDrawable(R.drawable.ic_outline_black));
            }
        }
        catch(Exception e){
            Log.i("Detail Favorite",e.toString());
        }

    }


    /**
     * Tweet
     */
    void openTweet(){
        String tweetUrl="https://twitter.com/intent/tweet";

        String shopUrl="",name="",address="";
        try{
            if(placedetail_json.has("website")){
                shopUrl=placedetail_json.getString("website");
            }
            else if(placedetail_json.has("url")){
                shopUrl=placedetail_json.getString("url");
            }

            if(placedetail_json.has("name")){
                name=placedetail_json.getString("name");
            }
            if(placedetail_json.has("address")){
                address=placedetail_json.getString("address");
            }

        }
        catch(Exception e){
            Log.i("Tweet Error1",e.toString());
        }

        String text="Check out "+name+" located at "+address+" Website:"+shopUrl+" %23TravelAndEntertainmentSearch";


        Intent intent = new Intent();
        intent.setData(Uri.parse(tweetUrl+"?text="+text));//Url
        intent.setAction(Intent.ACTION_VIEW);
        startActivity(intent);
    }

}


class googleVar{
    static int finish_num=0;
}