package com.example.hp.placesearch.HttpRequest;

import android.app.ProgressDialog;
import android.content.Context;
import android.util.Log;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.JsonRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONObject;

import java.util.Map;
import java.util.HashMap;

public class CustomVolley {
    private Context mContext;
    private ProgressDialog mPd;

    private OnFinishListener mOnFinishListener = null;

    public CustomVolley(Context context,ProgressDialog pd){
        mContext=context;
        mPd=pd;
    }



    public interface OnFinishListener {
        void onFinish(JSONObject response,ProgressDialog pd);
    }

    public void setOnFinishListener(OnFinishListener listener) {
        this.mOnFinishListener = listener;
    }


        public void postRequest(String url, final JSONObject jsonObj  ){
            RequestQueue requestQueue = Volley.newRequestQueue(mContext.getApplicationContext());


            JsonRequest<JSONObject> jsonRequest = new JsonObjectRequest(Request.Method.POST,url, jsonObj,
                    new Response.Listener<JSONObject>() {
                        @Override
                        public void onResponse(JSONObject response) {
//                            mPd.dismiss();
                            try{
                                mOnFinishListener.onFinish(response,mPd);

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
