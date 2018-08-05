package com.example.hp.placesearch.InputView;

import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentManager;
import android.support.v4.app.FragmentPagerAdapter;

public class FPAdapter extends FragmentPagerAdapter {
    private String[] menuTitles = new String[]{"SEARCH", "FAVORITE"};

    public FPAdapter(FragmentManager  fm){
        super(fm);
    }

    @Override
    public Fragment getItem(int position) {
        if (position == 1) {
            return new FavoriteList();
        }
        return new SearchForm();
    }

    @Override
    public int getCount(){
        return menuTitles.length;
    }

    @Override
    public CharSequence getPageTitle(int position) {
        return menuTitles[position];
    }

}
