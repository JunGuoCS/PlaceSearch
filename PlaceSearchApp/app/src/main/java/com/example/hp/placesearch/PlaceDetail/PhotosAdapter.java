package com.example.hp.placesearch.PlaceDetail;

import android.content.Context;
import android.graphics.Bitmap;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.support.v7.widget.StaggeredGridLayoutManager;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.LinearLayout;

import com.example.hp.placesearch.R;

import java.util.ArrayList;

public class PhotosAdapter extends RecyclerView.Adapter<PhotoView> {
    ArrayList<Bitmap> photoslist;
    Context mContext;

    public PhotosAdapter(ArrayList<Bitmap> photoslist, Context context){
        this.photoslist=photoslist;
        this.mContext=context;
    }

    @Override
    public PhotoView onCreateViewHolder(ViewGroup parent, int viewType) {
        View curView= LayoutInflater.from(mContext).inflate(R.layout.photo_item,parent,false);

        PhotoView pv=new PhotoView(curView);

        return pv;
    }

    @Override
    public void onBindViewHolder(PhotoView holder, int position) {
        holder.image.setImageBitmap(photoslist.get(position));

    }

    @Override
    public int getItemCount() {
        return photoslist.size();
    }
}

class PhotoView extends RecyclerView.ViewHolder{
    ImageView image;
    public PhotoView(View itemView) {
        super(itemView);

        image=itemView.findViewById(R.id.oneImageView);
    }

}
