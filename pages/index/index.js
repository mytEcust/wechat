//获取应用实例
var app = getApp()
Page({
  data: {
    welcome: '欢迎来到壮壮和亭亭的小窝',
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
    })
  }
})
