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
})
