// create.js
//获取应用实例
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var self = this;
    wx.request({
      url: 'http://182.254.140.96/list',
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: app.globalData.header, // 设置请求的 header
      success: function (res) {
        console.info(res);
        self.setData({
          list: res.data.content
        })
        wx.hideLoading();
      },
      fail: function (res) {
        console.info('fail');
        self.onLoad();
      }
    });
  },

  previewImage: function (e) {
    console.log(e);
    var that = this,
      index = e.currentTarget.dataset.index,
      selectIndex = e.currentTarget.dataset.selectIndex,
      pictures = this.data.list[selectIndex].content;
    console.info(pictures);
    if (index>1){
      var showList=[];
      for (var i = 2; i < pictures.length;i++){
        showList.push('http://182.254.140.96/images/' +pictures[i].content);
      }
      console.info(showList);
      wx.previewImage({
        current: showList[index-2],
        urls: showList
      })
    }
    
  },
  /**
   * delete content
   */
  deleteContent: function (event) {
    console.info("delete");
    var that =this;
    var contentId = event.target.dataset.contentid;
    wx.showLoading({
      title: '正在提交...',
      mask: true
    });
    wx.request({
      url: 'http://182.254.140.96/' + contentId,
      method: 'DELETE', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      success: function (res) {
        console.info(res);
        that.onLoad();
        wx.hideLoading();
      },
      fail: function (res) {
        console.info('fail');
        wx.hideLoading();
        wx.showToast({
          title: 'delete失败',
          icon: 'fail',
          mask: true
        })
      }
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {}
});
