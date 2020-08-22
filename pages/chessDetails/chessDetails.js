const util = require("../../utils/util")

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    this.setData({
      id: options.id,
      type: wx.getStorageSync('chessType')
    })
    console.log(this.data.id)
    util.GET('action/hs/cards/battleround', {
      ids: options.id,
      tier: 'all',
      pageSize: 200,
      locale: 'zh_cn'
    }, function(res){
      console.log(res)
      if(that.data.type == 'hero'){
        that.setData({
          img1: wx.getStorageSync('img'),
          img2: res.data.cards[0].battlegrounds.image
        })
      } else if(that.data.type == 'minion'){
        that.setData({
          img1: wx.getStorageSync('img'),
          img2: (res.data.cards && res.data.cards.length>0) ?res.data.cards[0].battlegrounds.imageGold:wx.getStorageSync('goldimg'),
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})