//test.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {}
  },
  //事件处理函数
  back: function() {
    wx.navigateBack()
  },
  onLoad: function () {

  }
})
