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

  checkToken:function(success, fail){
    var token = wx.getStorageSync('token')

    if(token){
      this.requestApi('user/login', {"token": token}, 'get', success, fail)
    }else{
      fail()
    }
  },

  requestApi:function(url, param=null, method='get', successFunc=null, failFunc=null){
    wx.request({
      url: this.globalData.host+url,
      data: param,
      method: method,
      header: {
          'content-type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        console.log("api result")
        console.log(res)
        if (typeof successFunc == "function"){
          successFunc(res)
        }
      },
      fail: function(res) {
        wx.showToast({
          title: '网络异常',
          icon: 'loading',
          duration: 1000
        })

        if(typeof failFunc == "function"){
          failFunc(res)
        }
      }
    })
  },

  globalData:{
    uid: null,
    host:"http://er.cx/",
    hospitals:[]
  }
})