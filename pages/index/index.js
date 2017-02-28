//index.js
//获取应用实例
var app = getApp()
Page({
    data: {
        range: "",
        url: "",
        rangeList: [],
        rangeSelect: null,
        minutes: 15
    },

    onReady: function (e) {
        this.audioCtx = wx.createAudioContext('myAudio')
    },

    onLoad: function () {
        wx.showToast({
            title: '加载中',
            icon: 'loading',
            duration: 30000
        })

        setTimeout(this.checkInit, 100)
    },

    checkInit: function () {
        var app = getApp()

        if (app.globalData.init == 0) {
            setTimeout(this.checkInit, 100);
        } else {
            if (app.globalData.rangeSelect == null) {
                wx.redirectTo({
                    url: '../chooseRange/choose'
                })
            }

            var items = []

            for (var id in app.globalData.rangeItems) {
                items.push(app.showRange(app.globalData.rangeItems[id]))
            }

            var item = app.globalData.rangeItems[app.globalData.rangeSelect]
            this.setData({
                'range': app.showRange(item),
                'url': item.file,
                'rangeList': items,
                'rangeSelect': app.globalData.rangeSelect
            })

            wx.hideToast()
        }
    },

    bind15: function () {
        this.setData({
            'minutes': 15
        })
    },

    bind30: function () {
        this.setData({
            'minutes': 30
        })
    },

    bind45: function () {
        this.setData({
            'minutes': 45
        })
    },

    bind60: function () {
        this.setData({
            'minutes': 60
        })
    },

    rangeChange: function (e) {
        this.setData({
            'rangeSelect': e.detail.value,
            'url': getApp().globalData.rangeItems[e.detail.value].file
        })
    },

    play: function () {
        setTimeout(this.close, this.data.minutes * 60 * 1000)
    },

    pause: function () {

    },

    end: function () {

    },

    error: function () {

    },

    close: function () {
        this.audioCtx.pause()
    }
})
