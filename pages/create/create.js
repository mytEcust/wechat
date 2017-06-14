// create.js
//获取应用实例
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    imageList: [],
    date: '',
    countIndex: 8,
    count: [1, 2, 3, 4, 5, 6, 7, 8, 9]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    });
    var nowdate=new Date();
    var year = nowdate.getFullYear();
    var month = parseInt(nowdate.getMonth()) + 1;
    if(month<10){
      month = '0' + month;
    }
    var day = nowdate.getDate();
    if (day < 10) {
      day = '0' + day;
    }
    nowdate = year + '-' + month + '-' + day;
    that.setData({
      date: nowdate
    })
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
  onShareAppMessage: function() {},
  countChange: function (e) {
    this.setData({
      countIndex: e.detail.value
    })
  },
  chooseImage: function () {
    var that = this
    wx.chooseImage({
      sourceType: ['album', 'camera'],
      sizeType: ['original', 'compressed'],
      count: this.data.count[this.data.countIndex],
      success: function (res) {
        console.log(res)
        that.setData({
          imageList: res.tempFilePaths
        })
      }
    })
  },
  previewImage: function (e) {
    var current = e.target.dataset.src

    wx.previewImage({
      current: current,
      urls: this.data.imageList
    })
  },
  /**
   * 点击选择图片
   */
  // checkimg: function(e) {
  //   console.log('点击选择图片');
  //   self = this;
  //   wx.chooseImage({
  //     count: 9, // 默认9
  //     sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
  //     sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
  //     success: function(res) {
  //       // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
  //       var tempFilePaths = res.tempFilePaths;
  //       self.setData({
  //         imageList: tempFilePaths
  //       });
  //     }
  //   });
  // },
  /**
   * 日期控件
   */
  bindDateChange: function(e) {
    this.setData({
      date: e.detail.value
    });
  },
  /**
   * 提交表单
   */
  formSubmit: function(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value);
    console.info(this);
    var self = this;
    var contentId = Date.parse(new Date());
    //图片
    var imageList = self.data.imageList;
    //内容
    var date = e.detail.value.date;
    var text = e.detail.value.text;
    var userInfo=self.data.userInfo;
    wx.showLoading({
      title: '正在提交...',
      mask: true
    });
    //添加问题
    wx.request({
      url: 'http://182.254.140.96/create',
      data: {
        date: date,
        text: text,
        author: userInfo.nickName,
        contentId:contentId,
        showdate: Date.parse(new Date(date))
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: app.globalData.header, // 设置请求的 header
      success: function(res) {
        if (imageList != '') {
          //开始插入图片
          for (var i = 0; i < imageList.length; i++) {
            console.info(imageList[i])
            //上传至服务器
            wx.uploadFile({
              url: 'http://182.254.140.96/upload', //仅为示例，非真实的接口地址
              filePath: imageList[i],
              name: 'files',
              formData: {
                author: userInfo.nickName,
                contentId: contentId,
                showdate: Date.parse(new Date(date))
              },
              header: app.globalData.header,
              success: function(res) {
                wx.showToast({
                  title:'提交成功',
                  icon: 'success',
                  mask:true,
                  complete:function(){
                    wx.redirectTo({
                      url: '../../pages/list/list'
                    }); 
                  }
                });
                
              },
              error: function(){
                wx.showToast({
                  title: '提交失败',
                  icon: 'fail',
                  mask: true
                })
              }
            });
          }
        }else{
          wx.showToast({
            title: '提交成功',
            icon: 'success',
            mask: true,
            complete: function () {
              wx.redirectTo({
                url: '../../pages/list/list'
              });
            }
          });
        }
        
      },
      fail: function(res) {
        wx.showToast({
          title: '提交失败',
          icon: 'fail',
          mask: true
        })
      }
    });
  }
});
