App({
  onLaunch: function(){
    wx.cloud.init({
        env: 'hscards-08625d'
    })
  },
  globalData: {
    config: null,
    version: 'v1.0.8'
  }
})