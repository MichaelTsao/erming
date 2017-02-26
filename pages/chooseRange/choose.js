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
            'get',
            that.getOk,
            null
        )
    },

    getOk: function (res) {
        var that = this
        var app = getApp()
        var items = []

        for (var id in res.data) {
            items.push(getApp().showRange(res.data[id]))
        }

        this.setData({
            rangeItems: items,
        })
        app.globalData.rangeItems = res.data

        for (var i = 0; i < res.data.length; ++i) {
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
