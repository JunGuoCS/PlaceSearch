package com.example.hp.placesearch.InputView;

import android.content.Context;
import android.content.SharedPreferences;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageButton;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;


import com.example.hp.placesearch.R;
import com.squareup.picasso.Picasso;


import java.util.ArrayList;
import java.util.HashMap;

public class favlistAdapter extends RecyclerView.Adapter<ItemView>{
    private View mView;
    private ArrayList<HashMap<String, Object>> mData=new ArrayList<HashMap<String, Object>>();
    private Context mContext;

    private OnItemClickListener mOnItemClickListener = null;

    int page_no=0;

    public favlistAdapter(Context context, ArrayList<HashMap<String, Object>> data,View view){
        mData.addAll(data);
        mContext=context;
        mView=view;
    }

    @Override
    public ItemView onCreateViewHolder(ViewGroup parent, int viewType) {
        View curView=LayoutInflater.from(mContext).inflate(R.layout.place_list_item,parent,false);
        ItemView myItemView=new ItemView(curView);

        curView.setOnClickListener(new View.OnClickListener(){
            @Override
            public void onClick(View v) {
                if (mOnItemClickListener != null) {
                    mOnItemClickListener.onItemClick(v,(int)v.getTag());
                }
            }
        });

        return myItemView;
    }

    @Override
    public void onBindViewHolder(final ItemView holder, final int position) {
        holder.title.setText(mData.get(position).get("name").toString());
        holder.text.setText(mData.get(position).get("vicinity").toString());
//        holder.icon.setImageDrawable(mContext.getResources().getDrawable(R.drawable.ic_fill_red_24dp));
        Picasso.get().load(mData.get(position).get("icon").toString()).resize(100, 100).into(holder.icon);

        holder.btn.setImageDrawable(mContext.getResources().getDrawable(R.drawable.ic_fill_red_24dp));


        holder.btn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Log.i("Favorite Button: ",String.valueOf(position));
                removFav(position);
            }
        });

        holder.itemView.setTag(position);
    }

    @Override
    public int getItemCount() {
        return mData.size();
    }

    public static interface OnItemClickListener {
        void onItemClick(View view , int position);
    }




    public void setOnItemClickListener(OnItemClickListener listener) {
        this.mOnItemClickListener = listener;
    }


    boolean checkFav(String place_id){
        SharedPreferences mPreferences=mContext.getSharedPreferences("Favorite", Context.MODE_PRIVATE);
        if("none".equals(mPreferences.getString(place_id,"none"))){
            return false;
        }
        else{
            return true;
        }
    }

    public void removFav(int pos){
        HashMap<String, Object> place =mData.get(pos);

        SharedPreferences mPreferences=mContext.getSharedPreferences("Favorite", Context.MODE_PRIVATE);
        SharedPreferences.Editor note = mPreferences.edit();

        note.remove(place.get("place_id").toString());
        note.commit();

        Toast toast = Toast.makeText(mContext, place.get("name").toString()+" was removed from favorites", Toast.LENGTH_LONG);
        toast.show();

        mData.remove(pos);
        if(mData.size()==0){
            mView.findViewById(R.id.favlist_emptytext).setVisibility(View.VISIBLE);
            mView.findViewById(R.id.favlist_recyclerview).setVisibility(View.GONE);
        }

        this.notifyDataSetChanged();
    }


    void setmData(ArrayList<HashMap<String, Object>> data){
        mData.clear();
        mData.addAll((ArrayList<HashMap<String, Object>>)data.clone());
        this.notifyDataSetChanged();
    }
}




class ItemView extends RecyclerView.ViewHolder{
    public TextView title;
    public TextView text;
    public ImageButton btn;
    public ImageView icon;

    public ItemView(View itemView) {
        super(itemView);

        title=(TextView)itemView.findViewById(R.id.itemTitle);
        text=(TextView)itemView.findViewById(R.id.itemText);
        icon=(ImageView)itemView.findViewById(R.id.itemIcon);
        btn=(ImageButton)itemView.findViewById(R.id.itemBtn);
    }
}