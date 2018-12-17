const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
    //判断小程序的api, 回调， 参数， 组件是否在当前版本中可用
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const _this = this;
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    }else if (this.data.canIUse) {
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    }else {
      // 获取数据
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },
  toAuthorize: function (e) {
    var _this = this;
    if (e.detail.userInfo) {
      app.globalData.userInfo = e.detail.userInfo
      _this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
    } else {
      // 拒绝授权
      _this.setData({
        hasUserInfo: false
      })
    }
  },
  moreSettingClick: function () {
    app.showModal('正在开发中。。')
  },
  aboutClick: function () {
    wx.navigateTo({
      url:"/pages/index/index"
    })
  },
  getLogs: function () {
    wx.navigateTo({
      url:"/pages/logs/logs"
    })
  },
  OrderClick: function () {
    wx.navigateTo({
      url: '/pages/ordermanage/index'
    })
  },
  CodeClick: function () {
    wx.navigateTo({
      url: "/pages/postalcode/index"
    })
  }
})
