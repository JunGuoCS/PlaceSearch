package com.example.hp.placesearch.PlaceList;

import android.content.Context;
import android.content.SharedPreferences;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.Button;
import android.widget.ImageButton;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import com.example.hp.placesearch.Interface.FavItemListener;
import com.example.hp.placesearch.R;
import com.squareup.picasso.Picasso;

import org.json.JSONObject;

import java.util.ArrayList;
import java.util.HashMap;

public class placelistAdapter extends RecyclerView.Adapter<ItemView>{
    private LayoutInflater mLayoutInflator;
    private ArrayList<HashMap<String, Object>> mData;
    private Context mContext;

    private OnItemClickListener mOnItemClickListener = null;

    public placelistAdapter(Context context, ArrayList<HashMap<String, Object>> data){
        mLayoutInflator=LayoutInflater.from(context);
//        mData=(ArrayList<HashMap<String, Object>>)data.clone();
        mData=data;
        mContext=context;
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

        if(checkFav(mData.get(position).get("place_id").toString())){
            holder.btn.setImageDrawable(mContext.getResources().getDrawable(R.drawable.ic_fill_red_24dp));
        }
        else{
            holder.btn.setImageDrawable(mContext.getResources().getDrawable(R.drawable.ic_outline_black));
        }

        holder.btn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Log.i("Favorite Button: ",String.valueOf(position));
                addOrRemovFav(mData.get(position),holder.btn);
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

    public void setNewPage(ArrayList<HashMap<String, Object>> data){
        mData=data;
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

//    @Override
    public void addOrRemovFav(HashMap<String, Object> place,ImageButton btn){
        SharedPreferences mPreferences=mContext.getSharedPreferences("Favorite", Context.MODE_PRIVATE);
        SharedPreferences.Editor note = mPreferences.edit();
        if("none".equals(mPreferences.getString(place.get("place_id").toString(),"none"))){
            JSONObject jsonObj=new JSONObject();

            try{
                jsonObj.put("place_id",place.get("place_id"));
                jsonObj.put("name",place.get("name"));
                jsonObj.put("icon",place.get("icon"));
                jsonObj.put("vicinity",place.get("vicinity"));
                jsonObj.put("lat",place.get("lat"));
                jsonObj.put("lng",place.get("lng"));

                note.putString(place.get("place_id").toString(),jsonObj.toString());
                note.commit();

                Toast toast = Toast.makeText(mContext, place.get("name").toString()+" was added to favorites", Toast.LENGTH_LONG);
                toast.show();

                btn.setImageDrawable(mContext.getResources().getDrawable(R.drawable.ic_fill_red_24dp));
            }
            catch (Exception e){
                System.out.println(e);
            }


        }
        else{
            note.remove(place.get("place_id").toString());
            note.commit();

            Toast toast = Toast.makeText(mContext, place.get("name").toString()+" was removed from favorites", Toast.LENGTH_LONG);
            toast.show();

            btn.setImageDrawable(mContext.getResources().getDrawable(R.drawable.ic_outline_black));
        }

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