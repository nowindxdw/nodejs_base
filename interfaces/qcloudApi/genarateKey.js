/**
 * Created by dawei on 2017/7/18.
 */
'use strict';
const _ = require('lodash');
const Logger = require('logger-ro');
const logger = new Logger(__logConfig);
const tencentyun = require('tencentyun');
const APPID = "123456789";
const SECRETID = "qqqqqqq";
const SECRETKEY = "sssssssss";
const BUCKET = "dadadad";
module.exports = {
    /**
     * 签名
     拼接多次有效签名串：expiredTime>currentTime拼接单次有效签名串：e=0;
     a=[appid]&b=[bucket]&k=[SecretID]&e=[expiredTime]&t=[currentTime]&r=[rand]&u=[userid]&f=[fileid]
     *
     */
    genKey:function(appid,bucket,SecretID,SecretKey,expiredTime){
      tencentyun.conf.setAppInfo(appid, SecretID, SecretKey);
      let sign = tencentyun.auth.getAppSignV2(bucket,'',expiredTime,0);
      return sign;
    },

};



