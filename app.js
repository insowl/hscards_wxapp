//app.js
App({
    onLaunch: function(){
      wx.cloud.init({
          env: 'hscards-08625d'
      })
      // const db = wx.cloud.database()
      // db.collection('cardSet').get({
      //     success: function(res){
      //         console.log(res)
      //     }
      // })
      let that = this
      wx.cloud.callFunction({
        name: 'updateConfig',
        success: function(res){
          console.log(res.result)
          that.globalData.config = res.result
        }
      })
    },
    globalData: {
      config: null
    }
})
