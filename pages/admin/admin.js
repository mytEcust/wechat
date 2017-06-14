//获取应用实例
var app = getApp();
var dataList = [];
var itemList = [{
  type:'tit',
  content:'2017-6-7'
},{
  type:'text',
  content:'I am text'
},{
  type:'img',
  content:'../../images/aixin.png'
},{
  type:'text',
  content:'I am description'
}];
dataList.push(itemList);
dataList.push(itemList);
dataList.push(itemList);
dataList.push(itemList);
Page({
  data: {
    dataList: dataList
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  }
})