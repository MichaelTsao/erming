//register.js
Page({
  data: {
    phone:"1"
  },
  onLoad: function () {
    
  },
  reg: function(){
    console.log(this.data.phone)
  },
  setPhone: function(e){
    this.setData(
      {
        phone: e.detail.value
      }
    )
  }
})
