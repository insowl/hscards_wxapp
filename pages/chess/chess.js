const util = require("../../utils/util")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    radioItems: [
      { value: 'hero', name: '英雄', checked: true },
      { value: 'minion', name: '卡牌' }
    ],
    checkboxItems: [
      { value: '1', name: '1', id: 0 },
      { value: '2', name: '2', id: 1 },
      { value: '3', name: '3', id: 2 },
      { value: '4', name: '4', id: 3 },
      { value: '5', name: '5', id: 4 },
      { value: '6', name: '6', id: 5 },
    ],
    type: 'hero',
    tier: 'all',
    searchText: ''
  },

  radioChange: function (e) {
    var items = this.data.radioItems;
    for (var i = 0; i < items.length; ++i) {
      items[i].checked = items[i].value == e.detail.value
      if(items[i].checked){
        this.setData({
          type: items[i].value
        })
      }
    }
    // console.log(items)
    this.setData({
      radioItems: items
    });
    getList(this)
  },


  checkboxChange: function (event) {
    var items = this.data.checkboxItems;
    var id = [];
    let tier = ''
    console.log(event)
    for (var i = 0; i < event.detail.value.length; i++) {
      var idNum = event.detail.value[i].split(','); 
      id = id.concat(idNum[1])
    }
    for (var y = 0; y < items.length; y++) {
      if (id.indexOf(y + "") != -1) {
        items[y].checked = true;
      } else {
        items[y].checked = false;
      }
      if(items[y].checked){
        tier = tier + items[y].value + ',' 
      }
    }
    if(tier == ''){
      tier = 'all'
    } else {
      tier = tier.substring(0, tier.length - 1)
    }
    console.log(tier)
    this.setData({
      checkboxItems: items,
      tier: tier
    });
    getList(this)
  },
  nav2Detail: function(e){
    console.log(e)
    let id = ''
    if(this.data.type == 'minion'){
      id = e.currentTarget.dataset.minionid
    } else if(this.data.type == 'hero'){
      id = e.currentTarget.dataset.heroid
    }
    wx.setStorageSync('chessType', this.data.type)
    wx.setStorageSync('img', e.currentTarget.dataset.img)
    wx.setStorageSync('goldimg', e.currentTarget.dataset.imggold)
    wx.navigateTo({
      url: '../chessDetails/chessDetails?id=' + id,
    })
  },
  bindInput: function(e){
    this.setData({
      searchText: e.detail.value
    })
  },
  doSearch: function(e){
    getList(this)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    getList(this)
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

function getList(t) {
  let that = t
  util.GET('action/hs/cards/battleround',{
    sort: 'tier',
    order: 'asc',
    type: t.data.type,  //hero minion
    tier: t.data.type == 'hero' ? 'all' : t.data.tier,  //all 1 2 3 4 5 6
    textFilter: t.data.searchText,
    pageSize: 200
  }, function(res){
    console.log(res)
    that.setData({
      list: res.data.cards
    })
  })
}