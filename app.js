//app.js
App({
    onLaunch: function () {
        this.checkToken(this.tokenOk, this.tokenFail)
    },

    init: function (id, range) {
        var that = this

        this.globalData.uid = id
        this.globalData.rangeSelect = range

        this.requestApi('range/list',
            {},
            'get',
            that.getOk,
            null
        )
    },

    getOk: function (res) {
        this.globalData.rangeItems = res.data
        this.globalData.init = 1
    },

    tokenOk: function (res) {
        if (res.data == "0") {
            this.tokenFail()
        } else {
            this.init(res.data.id, res.data.range)
        }
    },

    tokenFail: function () {
        var that = this

        wx.login({
            success: function (res) {
                if (res.code) {
                    //发起网络请求
                    that.requestApi('user/login-wx',
                        {
                            code: res.code
                        },
                        'get',
                        that.loginOk,
                        that.loginFail
                    )
                } else {
                    that.loginFail()
                }
            }
        })
    },

    loginOk: function (res) {
        if (res.statusCode == 200) {
            wx.setStorage({
                key: "token",
                data: res.data[1]
            })
            this.init(res.data[0].id, res.data[0].range)
        } else {
            wx.redirectTo({
                url: '../protocol/protocol'
            })
        }
    },

    loginFail: function (res) {
    },

    getUserInfo: function (cb) {
        var that = this
        if (this.globalData.userInfo) {
            typeof cb == "function" && cb(this.globalData.userInfo)
        } else {
            //调用登录接口
            wx.login({
                success: function () {
                    wx.getUserInfo({
                        success: function (res) {
                            that.globalData.userInfo = res.userInfo
                            typeof cb == "function" && cb(that.globalData.userInfo)
                        }
                    })
                }
            })
        }
    },

    checkToken: function (success, fail) {
        var token = wx.getStorageSync('token')

        if (token) {
            this.requestApi('user/login', {"token": token}, 'get', success, fail)
        } else {
            fail()
        }
    },

    requestApi: function (url, param, method, successFunc, failFunc) {
        wx.request({
            url: this.globalData.host + url,
            data: param,
            method: method,
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
                console.log("api result")
                console.log(res)
                if (typeof successFunc == "function") {
                    successFunc(res)
                }
            },
            fail: function (res) {
                wx.showToast({
                    title: '网络异常',
                    icon: 'loading',
                    duration: 1000
                })

                if (typeof failFunc == "function") {
                    failFunc(res)
                }
            }
        })
    },

    showRange: function (rangeData) {
        return rangeData.min + 'Hz------' + rangeData.max + 'Hz'
    },

    globalData: {
        uid: null,
        host: "http://er.test.dakashuo.com/",
        // host: "http://er.cx/",
        hospitals: [],
        rangeItems: [],
        rangeSelect: null,
        init: 0
    }
})