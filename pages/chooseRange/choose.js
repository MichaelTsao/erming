//choose.js
var items = ['item1', 'item2', 'item3', 'item4']
var pageObject = {
  data: {
    rangeItems: items,
    rangeSelect: null
  },
  selectRange: function(e) {
    this.setData({
      rangeItems: e
    })
  }
}

for (var i = 0; i < items.length; ++i) {
  (function(itemIndex) {
    pageObject['bind' + itemIndex] = function(e) {
      console.log('click' + items[itemIndex], e)
      wx.navigateTo({
        url: '../test/test'
      })
    }
  })(i)
}

Page(pageObject)
