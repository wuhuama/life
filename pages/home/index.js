// 获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    day: ['今天', '明天', '后天'],
    isRefresh: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    _this.getLocation();
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
    var _this = this;
    _this.getLocation();
    _this.setData({
      isRefresh: true
    })
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
  /**
   * 获取当前位置的经纬度
   */
  getLocation: function () {
    var _this = this;
    app.showLoading("加载中...")
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        const latitude = res.latitude // 纬度
        const longitude = res.longitude //经度
        
        console.log(`经度: ${longitude} 纬度: ${latitude}`)
        // 调用天气接口
        _this.getWeatherInfo(latitude, longitude)
      },
      fail: function () {
        wx.hideLoading()
        app.showModal("获取当前位置失败")
      },
      complete: function() {

      }
    })
  },
  /**
   * 获取天气, 通过和风天气接口
   */
  getWeatherInfo (latitude, longitude) {
    
  }
})