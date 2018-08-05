package com.example.hp.placesearch.PlaceDetail;

import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentManager;
import android.support.v4.app.FragmentPagerAdapter;


public class DetailFPAdapter extends FragmentPagerAdapter {
    private String[] menuTitles = new String[]{"INFO", "PHOTOS","MAP","REVIEWS"};

    public DetailFPAdapter(FragmentManager fm){
        super(fm);
    }

    @Override
    public Fragment getItem(int position) {
        if (position == 1) {
            return new PlacePhotos();
        }
        else if (position == 2) {
            return new PlaceMap();
        }
        else if(position==3){
            return new PlaceReview();
        }

        return new PlaceInfo();
    }

    @Override
    public int getCount() {
        return menuTitles.length;
    }

    @Override
    public CharSequence getPageTitle(int position) {
        return menuTitles[position];
    }
}
