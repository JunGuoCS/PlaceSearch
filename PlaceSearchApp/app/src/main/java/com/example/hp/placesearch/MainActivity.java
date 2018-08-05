package com.example.hp.placesearch;

import android.content.Context;
import android.graphics.Color;
import android.graphics.drawable.Drawable;
import android.net.Uri;
import android.support.design.widget.TabLayout;
import android.support.v4.view.ViewPager;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;

import com.example.hp.placesearch.InputView.FPAdapter;
import com.example.hp.placesearch.InputView.FavoriteList;
import com.example.hp.placesearch.InputView.SearchForm;
import com.githang.statusbar.StatusBarCompat;

import org.w3c.dom.Text;

//import butterknife.Bind;
//import butterknife.ButterKnife;

public class MainActivity extends AppCompatActivity
        implements SearchForm.OnFragmentInteractionListener,
                    FavoriteList.OnFragmentInteractionListener{

//    @Bind(R.id.tabLayout)
//    TabLayout tabLayout;
//    @Bind(R.id.viewpager)
//    ViewPager viewpager;
    private TabLayout curTabLayout;
    private ViewPager curViewPager;
    private FPAdapter fragmentPagerAdapter;


    private TabLayout.Tab search_tab;
    private TabLayout.Tab favorite_tab;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
//        ButterKnife.bind(this);

//        getSupportActionBar().hide();
        setContentView(R.layout.activity_main);

        StatusBarCompat.setStatusBarColor(this,Color.parseColor("#018975"));

        initView();
    }

    private void initView(){
        curViewPager= (ViewPager) findViewById(R.id.viewPager);
        fragmentPagerAdapter = new FPAdapter(getSupportFragmentManager());
        curViewPager.setAdapter(fragmentPagerAdapter);

        curTabLayout = (TabLayout) findViewById(R.id.tabLayout);
        curTabLayout.setupWithViewPager(curViewPager);

        //tab position
        search_tab = curTabLayout.getTabAt(0);
        favorite_tab = curTabLayout.getTabAt(1);

  
        //find id function need parent view to work
        LinearLayout AllTab = (LinearLayout) LayoutInflater.from(this).inflate(R.layout.all_tab_icon, null);

        LinearLayout tabOne = AllTab.findViewById(R.id.tab1);
        search_tab.setCustomView(tabOne);

        LinearLayout tabTwo = AllTab.findViewById(R.id.tab2);
        favorite_tab.setCustomView(tabTwo);

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
            TextView tab1_text=(TextView)tab_linearlyout.getChildAt(1);
//            tab1_text.setTextColor(Color.rgb(255, 255, 0));
            tab1_text.setTextColor(getResources().getColor(R.color.selectedTabColor));
        }

        @Override
        public void onTabUnselected(TabLayout.Tab tab) {
            int c = tab.getPosition();
            LinearLayout tab_linearlyout=(LinearLayout)tab.getCustomView();
            TextView tab1_text=(TextView)tab_linearlyout.getChildAt(1);
//            tab1_text.setTextColor(Color.rgb(255, 255, 0));
            tab1_text.setTextColor(getResources().getColor(R.color.tabColor));
        }

        @Override
        public void onTabReselected(TabLayout.Tab tab) {

        }
    };

    @Override
    public void onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);


    }
}
