//register.js
Page({
  data: {
    phone: "",
    phoneCode: "",
    password: "",
    password1: "",
    name: "",
    hospital: [],
    hospital_id: [],
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
          var ids = []
          var names = []
          for (var id in res.data){
            ids.push(id)
            names.push(res.data[id])
          }
          console.log(names)
          that.setData({
            hospital: names,
            hospital_id: ids
          })
        }
      })
  },

  reg: function(){
    var app = getApp()
    var that = this

    // 判断手机号合法
    if(this.data.phone.length != 11){
      wx.showToast({
        title: '请正确填入手机号',
        icon: 'loading',
        duration: 1000
      })
      return false
    }

    // 判断验证码合法
    if(this.data.phoneCode.length == ""){
      wx.showToast({
        title: '请输入验证码',
        icon: 'loading',
        duration: 1000
      })
      return false
    }

    // 判断密码合法
    if(this.data.password.length == ""){
      wx.showToast({
        title: '请输入密码',
        icon: 'loading',
        duration: 1000
      })
      return false
    }

    if(this.data.password != this.data.password1){
      wx.showToast({
        title: '两次密码不一致',
        icon: 'loading',
        duration: 1000
      })
      return false      
    }
    
    if(this.data.name.length == ""){
      wx.showToast({
        title: '请输入名字',
        icon: 'loading',
        duration: 1000
      })
      return false
    }

    // 发送请求
    wx.request({
      method: "post",
      url: app.globalData.host + 'user/register',
      data: {
        "phone": this.data.phone,
        "code": that.data.phoneCode,
        "password": that.data.password,
        "name": that.data.name,
        "hospital": that.data.hospital_id[that.data.hospital_index]
      },
      header: {
          'content-type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        if(res.data[0] == "0"){
          var token = res.data[1]
          wx.setStorage({
            key: "token",
            data: token
          })
          wx.navigateTo({
              url: '../chooseRange/choose'
          })
        }else{
          if(res.data[0] == 1){
            wx.showToast({
              title: '验证码错误',
              icon: 'loading',
              duration: 1000
            })
          }else{
            wx.showToast({
              title: res.data[1],
              icon: 'loading',
              duration: 1000
            })
          }
        }
      },
      fail: function(res) {
        wx.showToast({
          title: '注册失败',
          icon: 'loading',
          duration: 1000
        })
      }
    })
  },

  setPhone: function(e){
    this.setData({
        phone: e.detail.value
      })
  },

  setPhoneCode: function(e){
    this.setData({
        phoneCode: e.detail.value
      })
  },

  setPassword: function(e){
    this.setData({
        password: e.detail.value
      })
  },

  setPassword1: function(e){
    this.setData({
        password1: e.detail.value
      })
  },

  setName: function(e){
    this.setData({
        name: e.detail.value
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
