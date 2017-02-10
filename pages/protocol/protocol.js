//protocol.js
Page({
  data: {
    logs: []
  },
  onLoad: function () {
    
  },
  yes: function(){
    wx.navigateTo({
        url: '../register/register'
    })
  }
})
