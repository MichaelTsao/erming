//register.js
Page({
  data: {
    phone:"",
    hospital:["1","2"],
    hospital_index:0
  },
  onLoad: function () {
    
  },
  reg: function(){
    wx.navigateTo({
        url: '../chooseRange/choose'
    })
  },
  setPhone: function(e){
    this.setData(
      {
        phone: e.detail.value
      }
    )
  },
  bindHospitalChange: function(e) {
    this.setData({
      hospital_index: e.detail.value
    })
  },
  sendCode: function(){
    wx.request({
      url: 'test.php', //仅为示例，并非真实的接口地址
      data: {
        x: '' ,
        y: ''
      },
      header: {
          'content-type': 'application/json'
      },
      success: function(res) {
        console.log(res.data)
      }
    })
  }
})
