package com.computer.network.vo;

import lombok.Data;

@Data
public class ResponseVO {

    private Boolean success;    //调用是否成功

    private String message;     //返回的提示信息

    private Object content;     //内容

    public static ResponseVO buildSuccess(){
        ResponseVO response=new ResponseVO();
        response.setSuccess(true);
        return response;
    }

    public static ResponseVO buildSuccess(Object content){
        ResponseVO response=new ResponseVO();
        response.setContent(content);
        response.setSuccess(true);
        return response;
    }

    public static ResponseVO buildFailure(String message){
        ResponseVO response=new ResponseVO();
        response.setSuccess(false);
        response.setMessage(message);
        System.out.println(message);
        return response;
    }
}
