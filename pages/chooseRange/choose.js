//choose.js
var items = []
var ids = []
var pageObject = {
    data: {
        rangeItems: [],
        rangeId: [],
        rangeSelect: null
    },

    selectRange: function (e) {
        this.setData({
            rangeItems: e
        })
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
        var ids = []
        var names = []
        for (var id in res.data) {
            ids.push(id)
            names.push(res.data[id])
        }
        items = names
        this.setData({
            rangeItems: names,
            rangeId: ids
        })
    }
}

for (var i = 0; i < items.length; ++i) {
    (function (i) {
        pageObject['bind' + strval(i)] = function (e) {
            console.log('click' + ids[i], e)
            wx.navigateTo({
                url: '../test/test?id=' + ids[i]
            })
        }
    })(i)
}

Page(pageObject)
