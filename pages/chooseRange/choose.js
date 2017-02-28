//choose.js
var pageObject = {
    data: {
        rangeItems: [],
    },

    onLoad: function () {
        var app = getApp();
        var that = this

        var items = []

        for (var id in app.globalData.rangeItems) {
            items.push(app.showRange(app.globalData.rangeItems[id]))
        }

        this.setData({
            rangeItems: items,
        })

        for (var i = 0; i < app.globalData.rangeItems.length; ++i) {
            (function (i) {
                that['bind' + i] = function (e) {
                    wx.navigateTo({
                        url: '../test/test?id=' + i
                    })
                }
            })(i)
        }
    }
}

Page(pageObject)
