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
    var that = this

    wx.request({
      url: app.globalData.host + 'user/register',
      data: {
        "phone": this.data.phone,
        "code": this.data.phoneCode,
        "password": this.data.password,
        "name": this.data.name,
        "hospital": ids[this.data.hospital_id]
      },
      header: {
          'content-type': 'application/json'
      },
      success: function(res) {
        wx.navigateTo({
            url: '../chooseRange/choose'
        })
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
