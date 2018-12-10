const app = getApp()
const order = ['red', 'yellow', 'blue', 'green', 'red']
Page({

  /**
   * 页面的初始数据
   */
  data: {
    msg: 'ddddd',
    toView: 'red',
    scrollTop: 100
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
  upper: function (e) {
    // 滚动到顶部/左边，会触发 scrolltoupper 事件
    console.log(`滚动到顶部或者左边：${e}`)
  },
  lower: function (e) {
    // 滚动到底部/右边，会触发 scrolltolower 事件
    console.log(`滚动到底部或者右边：${e}`)
  },
  scroll: function (e) {
    // 滚动时触发，event.detail = {scrollLeft, scrollTop, scrollHeight, scrollWidth, deltaX, deltaY}
    // console.log(`滚动中~~~${JSON.stringify(e.detail)}`)
  },
  tap: function (e) {
    for (var i = 0; i < order.length; ++i) {
      if (order[i] === this.data.toView) {
        this.setData({
          toView: order[i + 1]
        })
        break
      }
    }
  },
  tapMove : function (e) {
    this.setData({
      scrollTop: this.data.scrollTop + 10
    })
  }
})