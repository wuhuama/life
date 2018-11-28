//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
              // 获取系统信息
              this.globalData.sysinfo = wx.getSystemInfoSync()
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  },
  // 手机型号
  getModel: function () {
    return this.globalData.userInfo.sysinfo["model"]
  },
  // 获取微信版本号
  getWxVersion: function () { 
    return this.globalData.sysinfo["version"]
  },
  // 获取操作系统版本
  getSystem: function () { 
    return this.globalData.sysinfo["system"]
  },
  // 获取客户端平台
  getPlatform: function () { 
    return this.globalData.sysinfo["platform"]
  },
  // 获取客户端基础库版本
  getSDKVersion: function () { 
    return this.globalData.sysinfo["SDKVersion"]
  },

  //loading
  showLoading: function (msg) {
    wx.showLoading({
      title: msg,
      mask: true
    })
  },
  // toast消息提示框
  toastTips: function (msg, time, icon) {
    wx.showToast({
      title: msg,
      // icon: 'success',
      duration: time
    })
  },
  toastTips2: function (txt) {
    wx.showToast({
      title: txt,
      icon: "loading"
    })
  },
  // 模态框
  showModal: function (txt) {
    wx.showModal({
      title: '提示',
      content: txt,
      showCancel: false
    })
  },
  // 模态框, 确认
  showModal: function (txt) {
    wx.showModal({
      title: '提示',
      content: txt,
      showCancel: false,
      confirmText: "确定"
    })
  },
   /**
   * 用于判断空，Undefined String Array Object
   */
  isBlank: function (str) {
    if (Object.prototype.toString.call(str) === '[object Undefined]') {//空
      return true
    } else if (
      Object.prototype.toString.call(str) === '[object String]' ||
      Object.prototype.toString.call(str) === '[object Array]') { //字条串或数组
      return str.length == 0 ? true : false
    } else if (Object.prototype.toString.call(str) === '[object Object]') {
      return JSON.stringify(str) == '{}' ? true : false
    } else {
      return true
    }
  }
})