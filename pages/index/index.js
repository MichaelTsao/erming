//index.js
//获取应用实例
var app = getApp()
Page({
    data: {},

    onLoad: function () {
        var that = this
        var app = getApp()

        wx.showToast({
            title: '加载中',
            icon: 'loading',
            duration: 30000
        })

        this.init()
    },

    play: function () {
        var app = getApp()

        wx.playBackgroundAudio({
            dataUrl: app.globalData.rangeItems[app.globalData.rangeSelect].file,
            title: '耳鸣治疗',
            coverImgUrl: ''
        })
    },

    init: function () {

        wx.hideToast()
    },


})
