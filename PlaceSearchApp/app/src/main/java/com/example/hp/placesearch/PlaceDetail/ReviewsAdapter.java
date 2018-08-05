package com.example.hp.placesearch.PlaceDetail;

import android.content.Context;
import android.support.annotation.NonNull;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.RatingBar;
import android.widget.TextView;

import com.example.hp.placesearch.R;
import com.squareup.picasso.Picasso;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.HashMap;

public class ReviewsAdapter extends RecyclerView.Adapter<ReviewItem> {
    ArrayList<HashMap<String, Object>> reviewlistItem=new ArrayList<HashMap<String, Object>>();
    ArrayList<HashMap<String, Object>> backup=new ArrayList<HashMap<String, Object>>();
    Context mContext;
    String []orderlist;
    String []reviewtype;

    private OnItemClickListener mOnItemClickListener = null;


    public ReviewsAdapter(ArrayList<HashMap<String, Object>> reviewlistItem,Context context){
        this.reviewlistItem=reviewlistItem;
        backup.addAll(reviewlistItem);
        mContext=context;
        orderlist=context.getResources().getStringArray(R.array.review_order);
        reviewtype=context.getResources().getStringArray(R.array.review_type);
    }

    @Override
    public ReviewItem onCreateViewHolder(ViewGroup parent, int viewType) {
        View curView= LayoutInflater.from(mContext).inflate(R.layout.review_item,parent,false);
        ReviewItem myItemView=new ReviewItem(curView);

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
    public void onBindViewHolder(ReviewItem holder, int position) {
        holder.author_name.setText(reviewlistItem.get(position).get("author_name").toString());
        String rating_str=reviewlistItem.get(position).get("rating").toString();
        holder.rating.setRating(Float.parseFloat(rating_str));
        holder.time.setText(reviewlistItem.get(position).get("time").toString());
        holder.text.setText(reviewlistItem.get(position).get("text").toString());
        Picasso.get().load(reviewlistItem.get(position).get("photo").toString()).error(R.drawable.ic_search_24dp).resize(170, 170).into(holder.author_photo);

        holder.itemView.setTag(position);
    }

    @Override
    public int getItemCount() {
        return reviewlistItem.size();
    }



    //interface
    public static interface OnItemClickListener {
        void onItemClick(View view , int position);
    }


    public void setOnItemClickListener(OnItemClickListener listener) {
        this.mOnItemClickListener = listener;
    }


    /**
     * change order
     */
    void changeOrder(int position){
        if(orderlist[position].equals("Highest Rating")){
           Collections.sort(reviewlistItem, new Comparator<HashMap<String, Object>>() {
               @Override
               public int compare(HashMap<String, Object> o1, HashMap<String, Object> o2) {
                   if((Integer)o1.get("rating")<(Integer)o2.get("rating"))
                       return 1;
                   else
                       return -1;
               }
           });
           this.notifyDataSetChanged();
        }
        else if(orderlist[position].equals("Lowest Rating")){
            Collections.sort(reviewlistItem, new Comparator<HashMap<String, Object>>() {
                @Override
                public int compare(HashMap<String, Object> o1, HashMap<String, Object> o2) {
                    if((Integer)o1.get("rating")>(Integer)o2.get("rating"))
                        return 1;
                    else
                        return -1;
                }
            });
            this.notifyDataSetChanged();
        }
        else if(orderlist[position].equals("Most Recent")){
            final SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            Collections.sort(reviewlistItem, new Comparator<HashMap<String, Object>>() {
                @Override
                public int compare(HashMap<String, Object> o1, HashMap<String, Object> o2) {
                    try{
                        long t1=sdf.parse((String)o1.get("time")).getTime();
                        long t2=sdf.parse((String)o2.get("time")).getTime();

                        if(t1<t2)
                            return 1;
                        else
                            return -1;
                    }catch(Exception e){
                        Log.i("Date error",e.toString());
                        return 0;
                    }

                }
            });
            this.notifyDataSetChanged();
        }
        else if(orderlist[position].equals("Least Recent")){
            final SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            Collections.sort(reviewlistItem, new Comparator<HashMap<String, Object>>() {
                @Override
                public int compare(HashMap<String, Object> o1, HashMap<String, Object> o2) {
                    try{
                        long t1=sdf.parse((String)o1.get("time")).getTime();
                        long t2=sdf.parse((String)o2.get("time")).getTime();

                        if(t1>t2)
                            return 1;
                        else
                            return -1;
                    }catch(Exception e){
                        Log.i("Date error",e.toString());
                        return 0;
                    }

                }
            });
            this.notifyDataSetChanged();
        }
        else if(orderlist[position].equals("Default order")){
            this.reviewlistItem.clear();
            this.reviewlistItem.addAll((ArrayList<HashMap<String, Object>>)backup.clone());
            this.notifyDataSetChanged();
        }
    }


    /**
     * change type
     */
    void setReviewlistItem(ArrayList<HashMap<String, Object>> reviewlistItem){
        this.reviewlistItem.clear();
        this.reviewlistItem.addAll((ArrayList<HashMap<String, Object>>)reviewlistItem.clone());
        this.backup.clear();
        this.backup.addAll((ArrayList<HashMap<String, Object>>)reviewlistItem.clone());
        this.notifyDataSetChanged();
    }
}

class ReviewItem extends RecyclerView.ViewHolder{
    public ImageView author_photo;
    public TextView author_name;
    public RatingBar rating;
    public TextView time;
    public TextView text;

    public ReviewItem(View itemView){
        super(itemView);

        author_photo=itemView.findViewById(R.id.review_photo);
        author_name=itemView.findViewById(R.id.review_name);
        rating=itemView.findViewById(R.id.review_rating);
        time=itemView.findViewById(R.id.review_time);
        text=itemView.findViewById(R.id.review_text);

    }

}
