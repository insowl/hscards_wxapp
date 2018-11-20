const app = getApp()
const util = require('../../utils/util.js')

Page({
  data: {
    fromShare: 0,
    config: {},
    card: {},
    showPanel: false
  },
  onLoad: function (options) {
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

    this.setData({
      fromShare: options.fromShare
    })
    if(options.card){
      let cardStr = decodeURIComponent(options.card)
      this.setData({
        paramsStr: options.card,
        card: JSON.parse(cardStr)
      })
    } else{
      let params = {
        keywords: options.name,
        cost: options.cost,
        cardClass: options.cardclass
      }
      util.GET('action/cards/query', params, function (res) {
        console.log(res)
        that.setData({
          card: res.data.cards[0]
        })
      })
    }
  },
  back2Index: function(){
    if(this.data.fromShare != 0){
      wx.reLaunch({
        url: '/pages/index/index'
      })
    } else{
      wx.navigateBack({
        delta: 1
      })
    }
  },
  onShareAppMessage: function(res){
    let card = this.data.card
    return{
      title: card.name,
						path: `../details/details?fromShare=1&card=${this.data.paramsStr}`,
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
    let card = this.data.card
    let that = this
    wx.cloud.callFunction({
      name: 'getPageCode',
      data: {
        cardID: card.cardId,
        cardImageUrl: card.imageUrl,
        pagePath: `pages/details/details?fromShare=2&name=${card.name}&cost=${card.cost}&cardclass=${card.cardClass}`
      },
      success: function (res) {
        console.log(res)
        // that.setData({
        //   bImg: res.result.fileID
        // })
        let that1 = that
        // wx.getImageInfo({
        //   src: res.result.fileID,
        //   success: function(res){
        //     // console.log(res)
        //     const ctx = wx.createCanvasContext('shareCanvas')
        //     // ctx.scale(0.5, 0.5)
        //     ctx.drawImage(res.path, 40, 550, 160, 160)
        //     ctx.setFillStyle('#000')
        //     ctx.setFontSize(24)
        //     ctx.fillText('炉石卡牌集', 220, 600)
        //     ctx.setFillStyle('#999')
        //     ctx.setFontSize(18)
        //     ctx.fillText('长按识别小程序码', 220, 630)
        //     ctx.fillText('查看卡牌详情', 220, 655)
        //     let that2 = that1
            // wx.getImageInfo({
            //   src: that1.data.card.imageUrl,
            //   success: function (res) {
            //     console.log(res)
            //     ctx.drawImage(res.path, 20, 20, 360, 510)
            //     ctx.draw()
            //   }
            // })
        //   }
        // })
      }
    })
  },
  closePanel: function(){
    this.setData({
      showPanel: false
    })
  },
  saveImg: function(){
    wx.canvasToTempFilePath({
      canvasId: 'shareCanvas',
      fileType: 'jpg',
      quality: 1,
      success: function(res){
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: function(res){
            wx.showToast({
              title: '已保存',
            })
          }
        })
      }
    }, this)
  }
})