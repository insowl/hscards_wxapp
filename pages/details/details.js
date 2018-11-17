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
				let card = this.data.card
    return{
      title: card.name,
						path: `../details/details?fromShare=0&card=${this.data.paramsStr}`,
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
    wx.cloud.callFunction({
      name: 'getPageCode',
						data: {
							pagePath: `../details/details?fromShare=0&name=${card.name}&cost=${card.cost}&cardclass=${card.cardclass}`
						},
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