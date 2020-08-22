App({
  onLaunch: function(){
    wx.cloud.init({
        env: 'hscards-08625d'
    })
  },
  globalData: {
    config: null,
    version: 'v2.0' //酒馆战棋
  }
})