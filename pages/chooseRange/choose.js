//choose.js
var pageObject = {
    data: {
        rangeItems: [],
    },

    onLoad: function () {
        var app = getApp();
        var that = this

        app.requestApi('range/list',
            {},
            'GET',
            that.getOk,
            null
        )
    },

    getOk: function (res) {
        var app = getApp()
        var items = []
        var that = this

        app.globalData.rangeItems = res.data

        for (var id in app.globalData.rangeItems) {
            items.push(app.showRange(app.globalData.rangeItems[id]))
        }

        this.setData({
            'rangeItems': items,
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
