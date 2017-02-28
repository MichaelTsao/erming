//test.js
//获取应用实例
var app = getApp()

Page({
    data: {
        range: "",
    },

    //事件处理函数
    back: function () {
        wx.navigateBack()
    },

    ok: function () {
        var token = wx.getStorageSync('token')
        app.requestApi('user/set-range', {
            'token': token,
            'rangeId': app.globalData.rangeItems[app.globalData.rangeSelect].id
        }, "GET", this.setOk(), null)
    },

    setOk: function () {
        app.globalData.init = 1
        wx.redirectTo({
            url: '../index/index',
            success: function (res) {
                // success
            },
            fail: function () {
                // fail
            },
            complete: function () {
                // complete
            }
        })
    },

    onLoad: function (option) {
        var app = getApp()

        this.setData({
            range: getApp().showRange(app.globalData.rangeItems[option.id]),
        })
        app.globalData.rangeSelect = option.id
    },

    play: function () {
        var app = getApp()

        wx.playBackgroundAudio({
            dataUrl: app.globalData.rangeItems[app.globalData.rangeSelect].file,
            title: '耳鸣治疗',
            coverImgUrl: ''
        })
    }
})
