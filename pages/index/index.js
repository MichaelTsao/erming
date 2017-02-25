//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
  },
  
  onLoad: function () {
    var that = this
    var app = getApp()

    wx.showToast({
      title: '登录中',
      icon: 'loading',
      duration: 30000
    })

    app.checkToken(this.tokenOk, this.tokenFail)
  },

  init: function(uid) {
    // init view
    wx.hideToast()
  },

  tokenOk: function(res) {
    if (res.data != "0"){
      this.init(res.data)
    }else{
      this.tokenFail()
    }
  },

  tokenFail: function() {
    var that = this

    wx.login({
      success: function(res) {
        if (res.code) {
          //发起网络请求
          app.requestApi('user/login-wx',
            {
              code: res.code
            },
            'get',
            that.loginOk,
            that.loginFail
          )
        } else {
          that.loginFail()
        }
      }
    })
  },

  loginOk: function(res) {
    console.log(res.statusCode)
    if(res.statusCode == 200){
      wx.setStorage({
        key: "token",
        data: res.data[1]
      })
      
      this.init(res.data[0])
    }else{
      wx.redirectTo({
        url: '../protocol/protocol'
      })
    }
  },

  loginFail: function(res) {
  }
})
