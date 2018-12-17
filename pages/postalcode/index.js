var app = getApp();
var netRequest = require("../../utils/netUtil.js");
var constant = require("../../utils/data.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabActive: 0,
    activeNames: ['1'],
    showPickerView: false, // 控制省市区三级联动显隐
    showRightPopup: false, // 右侧弹框
    addressName: '点击-选择-城市',
    value: [0, 0, 0],
    provId: '',                                                     //省ID
    cityId: '',                                                     //市ID
    areaId: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this;
    var url = constant.mobApi.getAllCity();
    netRequest.getRequest(url, '加载中...', self.requestSuccess, self.requestFail)
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
  onChange(event) {
    this.setData({
        tabActive: event.detail.index
    })
    console.log(`切换到标签 ${event.detail.index + 1}`)
  },
  //请求全国邮编城市成功
  requestSuccess: function (data) {
    var that = this;
    console.log("网络请求成功: "+ data.retCode)
    if (data.retCode === '200') {
        that.setData({
            allData: data,
            provArr: data.result,
            cityArr: data.result[0].city,
            areaArr: data.result[0].city[0].district
        })
    }else {
        app.showModal1(data.msg)
    }
  },
  requestFail: function (res) {
    console.log("网络请求失败：" + res);
  },
  openPickerView: function () {
      this.setData({
          showPickerView: true
      })
  },
  //关闭省市区三级联动
  closePickerView() {
      this.setData({
          showPickerView: false
      });
  },
  // 三级联动
  bindChange: function (e) {
    let val = e.detail.value; // array 表示picker-view-column 中的值
    let allData = this.data.allData;
    console.log(`bindChange前${val}`)
    if(val[0] != this.data.value[0]){
        val = [val[0], 0, 0]
    }
    if (val[1] != this.data.value[1]) {
        val = [val[0], val[1], 0]
    }
    let thatProvince = allData.result[val[0]];
    let thatCityArray = thatProvince.city;
    let thatAreaArray = thatProvince.city[val[1]].district;
    console.log(`bindchange后${val}`);
    this.setData({
        value: val,
        cityArr: thatCityArray,
        areaArr: thatAreaArray
    })
  },
  // 确定省市区
  confirmPickerView: function () {
    let val = this.data.value;
    let allData = this.data.allData;
    let provName = allData.result[val[0]].province; // 省
    let cityName = allData.result[val[0]].city[val[1]].city; // 市
    let areaName = allData.result[val[0]].city[val[1]].district[val[2]].district; // 区
    let addressName = provName + cityName + areaName;
    let provId = allData.result[val[0]].id;
    let cityId = allData.result[val[0]].city[val[1]].id;
    let areaId = allData.result[val[0]].city[val[1]].district[val[2]].id;

    this.setData({
        addressName: addressName,
        provId: provId,
        cityId: cityId,
        areaId: areaId,
        showPickerView: false
    })
    console.log(`${provId}--${cityId}--${areaId}`)
  },
  //输入邮编。。。
  postNumInput:function(e){
    this.setData({
      postNumInputStr: e.detail.value
    })
  },
  // 查询按钮点击事件
  queryCityClick: function () {
    let self = this;
    let provId = self.data.provId;
    let cityId = self.data.cityId;
    let areaId = self.data.areaId;
    let postNumInputStr = self.data.postNumInputStr; // 邮编数字
    let tabsPosition = self.data.tabActive;
    if (tabsPosition == 0) { // 城市查询邮编
        if (app.isBlank(provId) || app.isBlank(cityId)) {
            app.showModal1('请点击选择查询的城市地址!');
            return;
        }
        //根据省市区id查询邮编
        self.setData({
            postalCodeList: '' // 赋值之前,清空数据
        })
        let url = constant.mobApi.queryCityCode(provId, cityId, areaId);
        netRequest.getRequest(url, "查询中...", self.queryCitySuccess, self.queryCityFail);

    }else if(tabsPosition == 1) {
        if (app.isBlank(postNumInputStr)){
            app.showModal1("请输入邮编！");
            return
        }
        self.setData({
            postalCodeList: ''//每次赋值 先清空数据
        });
        let url1 = constant.mobApi.codeToQuery(postNumInputStr);
        netRequest.getRequest(url1, "查询中..", self.postNumSuccess, self.postNumFail);
    }
  },
  // 根据省市区id查询邮编成功回调函数 
  queryCitySuccess : function (data) {
    var that = this;
    console.log("成功:"+ JSON.stringify(data.result))
    if (data.retCode === '200') {
        that.setData({
            postalCodeList: data.result
        })
        setTimeout(function () {
            that.toggleRightPopup();
        }, 500)
    }else {
        app.showModal1(data.msg)
    }
  },
  queryCityFail: function () {
    app.showModal1("网络请求失败,请重试！");
  },
  // 右侧弹窗
  toggleRightPopup() {
      this.setData({
        showRightPopup: !this.data.showRightPopup
      })
  },
  // 根据邮编查询城市
  postNumSuccess: function (data) {
    var that = this;
    console.log(`请求成功${data.retCode}`);
    if (data.retCode == 200) {
        var list = 'postalCodeList[0]';
        that.setData({
          [list]: data.result,
        });
  
        setTimeout(function () {
          that.toggleRightPopup();
        }, 500);
  
      } else {
        app.showModal1(data.msg);
      }
  },
  postNumFail: function (res) {
    app.showModal1("网络请求失败,请重试！");
  },
  //复制邮编
  copyPostNumClick:function(e){
    var p = e.currentTarget.dataset.post;
    wx.setClipboardData({
      data:p,
      success:function(res){
        app.toastTips("复制成功");
      }
    });
  }
})