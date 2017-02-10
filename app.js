//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  checkToken:function(){
    var that = this
    if(this.globalData.token){
      var uid = this.requestApi('user/login', {"token": this.globalData.token})
      console.log(uid)
    }
  },
  requestApi:function(url, param){
    var data = null
    wx.request({
      url: this.globalData.host+url,
      data: param,
      header: {
          'content-type': 'application/json'
      },
      success: function(res) {
        console.log(res.data)
        data = res.data
      }
    })
    return data
  },
  globalData:{
    userInfo:null,
    token:null,
    host:"http://er.cx/"
  }
})