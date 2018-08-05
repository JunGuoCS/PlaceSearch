package com.example.hp.placesearch.Interface;

import android.widget.ImageButton;

import java.util.HashMap;

public interface FavItemListener {
    void addOrRemovFav(HashMap<String, Object> place, ImageButton btn);
}
