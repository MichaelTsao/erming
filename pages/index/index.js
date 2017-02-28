//index.js
//获取应用实例
var app = getApp()
Page({
    data: {
        range: ""
    },

    onLoad: function () {
        wx.showToast({
            title: '加载中',
            icon: 'loading',
            duration: 30000
        })

        setTimeout(this.checkInit, 100)
    },

    play: function () {
        var app = getApp()

        wx.playBackgroundAudio({
            dataUrl: app.globalData.rangeItems[app.globalData.rangeSelect].file,
            title: '耳鸣治疗',
            coverImgUrl: ''
        })
    },

    checkInit: function () {
        var app = getApp()

        if (app.globalData.init == 0) {
            setTimeout(this.checkInit, 100);
        }else{
            if (app.globalData.rangeSelect == null) {
                wx.redirectTo({
                    url: '../chooseRange/choose'
                })
            }

            this.setData({
                'range': app.showRange(app.globalData.rangeItems[app.globalData.rangeSelect])
            })

            wx.hideToast()
        }
    }
})
