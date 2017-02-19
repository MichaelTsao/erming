//register.js
Page({
  data: {
    phone: "",
    phoneCode: "",
    password: "",
    password1: "",
    name: "",
    hospital: [],
    hospital_index: 0
  },

  onLoad: function () {
      var app = getApp();
      var that = this
      
      wx.request({
        url: app.globalData.host + 'hospital/list',
        header: {
            'content-type': 'application/json'
        },
        success: function(res) {
          that.setData({
            hospital: res.data
          })
        }
      })
  },

  reg: function(){
    wx.navigateTo({
        url: '../chooseRange/choose'
    })
  },

  setPhone: function(e){
    this.setData({
        phone: e.detail.value
      })
  },

  bindHospitalChange: function(e) {
    this.setData({
      hospital_index: e.detail.value
    })
  },

  sendCode: function(){
    if (this.data.phone.length != 11){
      wx.showToast({
        title: '请正确填入手机号',
        icon: 'loading',
        duration: 1000
      })
    }else{
      var app = getApp();
      app.requestApi('site/send-code', {
        phone: this.data.phone
        }
      )
    }
  }
})
