//choose.js
var items = []
var ids = []
var pageObject = {
  data: {
    rangeItems: [],
    rangeId: [],
    rangeSelect: null
  },
  selectRange: function(e) {
    this.setData({
      rangeItems: e
    })
  },
  onLoad: function () {
      var app = getApp();
      var that = this
      
      wx.request({
        url: app.globalData.host + 'range/list',
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
          items = names
          that.setData({
            rangeItems: names,
            rangeId: ids
          })
        }
      })
  }
}

for (var i = 0; i < items.length; ++i) {
  (function(itemIndex) {
    pageObject['bind' + itemIndex] = function(e) {
      console.log('click' + ids[itemIndex], e)
      wx.navigateTo({
        url: '../test/test?id='+ids[itemIndex]
      })
    }
  })(i)
}

Page(pageObject)
