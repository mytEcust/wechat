//获取应用实例
var app = getApp();
var now = new Date();
var stateDate = new Date('2016-8-12 20:00');
var tDate = now.getTime() - stateDate.getTime();
var showDate = getDate(tDate);

Page({
  data: {
    welcome: '壮壮和亭亭的小窝',
    userInfo: {}
  },
  onLoad: function () {
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    });
    that.setData({showDate : getDate(tDate)});
    setInterval(function(){
      var now = new Date();
      var stateDate = new Date('2016/8/12');
      var tDate = Date.parse(now) - Date.parse(stateDate);
      var showDate = getDate(tDate);

      that.setData({showDate : getDate(tDate)});
    },1000);
  }
})

function getDate(tDate){
  //计算出相差天数  
  var days=Math.floor(tDate/(24*3600*1000))  
  
  //计算出小时数  
  var leave1=tDate%(24*3600*1000)    //计算天数后剩余的毫秒数  
  var hours=Math.floor(leave1/(3600*1000))  
  //计算相差分钟数  
  var leave2=leave1%(3600*1000)        //计算小时数后剩余的毫秒数  
  var minutes=Math.floor(leave2/(60*1000))  
  //计算相差秒数  
  var leave3=leave2%(60*1000)      //计算分钟数后剩余的毫秒数  
  var seconds=Math.round(leave3/1000)  
  var showDate = days + "天 " + hours + "小时 " + minutes + " 分钟" + seconds + " 秒";
  return showDate;
}