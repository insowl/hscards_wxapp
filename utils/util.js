var baseURL = "https://hs.blizzard.cn/"
var GET_METHOD = "GET"
var POST_METHOD = "POST"
var GET_HEADER = {            
        }
var POST_HEADER = {            
        }

function request(api, method, header, params, success){
    // wx.showLoading({
    //     title: "正在搜索卡牌"
    // })
    wx.request({
        url: baseURL + api,
        method: method,
        header: header,
        data: params,
        success: function(res) {
            // wx.hideLoading()
            success(res)
        },
        fail: function(){
            wx.showLoading({
                icon: "loading",
                title: "旅店失去联接",
                duration: 5000
            })
        }
    })
}

function get(api, params, success){
    request(api, GET_METHOD, GET_HEADER, params, success)
}

function post(api, params, success){
    request(api, POST_METHOD, POST_HEADER, params, success)
}

module.exports = {
    GET: get,
    POST: post
}
