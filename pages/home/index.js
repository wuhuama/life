// 获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    day: ['今天', '明天', '后天'],
    isRefresh: false,
    currentCity:'',
    currLocation: '',
    nowTemp: '',
    condTxt: '',
    lifeType: '',
    hum: '',
    fl: '',
    windDir: '',
    windSc: '',
    dailyForecast: '',
    updateTime: ''
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
    console.log('-----路径------------'+this.route)
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
  //切换tab触发
  onTabItemTap: function (item) {
    console.log(`被点击的序号${item.index}`)
    console.log(`被点击的路径${item.pagePath}`)
    console.log(`被点击的文字${item.text}`)
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
        if (_this.data.isRefresh) {
          _this.setData({
            isRefresh: false
          });
          setTimeout(function () {
            wx.stopPullDownRefresh()
          }, 1000)
        }
      }
    })
  },
  /**
   * 获取天气, 通过和风天气接口
   */
  getWeatherInfo (latitude, longitude) {
    var that = this;
    // 在和风网站注册账号,使用自己的key
    const key = '0d66cc63bf05451caec0f76f3ea3563b'
    // 在公众平台->开发设置-> 服务器域名配置中增加域名信息
    const url = 'https://free-api.heweather.com/s6/weather'
    wx.request({
      url: url, 
      data: {
        key: key,
        location: longitude + ',' + latitude
      },
      success: function (res) {
        wx.hideLoading()
        console.log(res)
        if (res && res.statusCode === 200) {
          const result = res.data.HeWeather6[0]
          const temp = result.now.tmp // 温度
          const condTxt = result.now.cond_txt // 天气状况
          const lifeBrf = result.lifestyle[0].brf // 生活指数简介
          const lifeType = result.lifestyle[0].type // 生活指数类型
          let lifeTypeTxt = ''
          if (lifeType == "comf") {//舒适度
            lifeTypeTxt = "";
          } else if (lifeType == "cw") {
            lifeTypeTxt = "洗车"
          } else if (lifeType == "drsg") {
            lifeTypeTxt = "穿衣"
          } else if (lifeType == "flu") {
            lifeTypeTxt = "感冒"
          } else if (lifeType == "sport") {
            lifeTypeTxt = "运动"
          } else if (lifeType == "trav") {
            lifeTypeTxt = "旅游"
          } else if (lifeType == "uv") {
            lifeTypeTxt = "紫外线"
          } else if (lifeType == "air") {
            lifeTypeTxt = "空气"
          }
          var nowHum = result.now.hum;//相对湿度
          var nowfl = result.now.fl;//体感温度
          var windDir = result.now.wind_dir;//风向
          var windSc = result.now.wind_sc;//风力
          var dailyForecast = result.daily_forecast;
          var updateTime = result.update.loc; //更新时间
          var hour = updateTime.substring(11, 13); //更新时间截取小时

          // 设置数据
          that.setData({
            currentCity: result.basic.parent_city,
            currLocation: result.basic.location,
            nowTemp: temp,
            condTxt: condTxt,
            lifeType: `☆${lifeTypeTxt}${lifeBrf}`,
            num: nowHum,
            fl: nowfl,
            windDir: windDir,
            windSc: windSc,
            dailyForecast: dailyForecast,
            updateTime: hour
          })

          console.log(that.data)
        }
      },
      fail: function (error) {
        wx.hideLoading()
        console.error(error)
      }
    });

    // 隐藏加载动画
    setTimeout(() => {
      wx.hideLoading()
    }, 2000)
  }
})