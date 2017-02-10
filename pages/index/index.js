//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {}
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    var app = getApp()
    if (!app.checkToken()){
      var token = ""
      wx.login({
            success: function(res) {
              if (res.code) {
                //发起网络请求
                token = app.requestApi('user/login-wx',
                  {
                    code: res.code
                  }
                )
              } else {
                console.log('获取用户登录态失败！' + res.errMsg)
              }
            }
          })
      if (token == ""){
        wx.redirectTo({
          url: '../protocol/protocol'
        })
      }
    }

    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  }
})
