const app = getApp()

Page({
  data: {
    fromShare: 0,
    paramsStr: '',
    config: {},
    card: {},
    showPanel: false
  },
  onLoad: function (option) {
    var that = this
    if(app.globalData.config){
      this.setData({
        config: app.globalData.config
      })
    }else{
      wx.cloud.callFunction({
        name: 'updateConfig',
        success: function (res) {
          that.setData({
            config: res.result
          })
        }
      })
    }
    var cardStr = decodeURIComponent(option.card)
    this.setData({
      fromShare: option.fromShare,
      paramsStr: option.card,
      card: JSON.parse(cardStr)
    })
    // console.log(this.data.card)
  },
  back2Index: function(){
    if(this.data.fromShare == 1){
      wx.reLaunch({
        url: '/pages/index/index'
      })
    } else if(this.data.fromShare == 0){
      wx.navigateBack({
        delta: 1
      })
    }
  },
  onShareAppMessage: function(res){
    return{
      title: this.data.card.name,
      path: '/pages/details/details?fromShare=1&card=' + this.data.paramsStr,
      imageUrl: this.data.card.imageUrl,
      success: function(res) {
        
      },
      fail: function(res) {
        
      }
    }
  },
  share2Moment: function(){
    this.setData({
      showPanel: true
    })
    wx.cloud.callFunction({
      name: 'getPageCode',
      success: function (res) {
        console.log(res)
      }
    })
    // wx.getImageInfo({
    //   src: this.data.card.imageUrl,
    //   success: function(res){
    //     const ctx = wx.createCanvasContext('shareCanvas')
    //     ctx.drawImage(res.path, 0, 0, 300, 425)
    //     ctx.draw()
    //   }
    // })
    const ctx = wx.createCanvasContext('shareCanvas')
    ctx.setTextAlign('center')    // 文字居中
    ctx.setFillStyle('#000000')  // 文字颜色：黑色
    ctx.setFontSize(22)         // 文字字号：22px
    ctx.fillText(this.data.card.name, 150, 30)
    ctx.stroke()
    ctx.draw()
  },
  closePanel: function(){
    this.setData({
      showPanel: false
    })
  }
})