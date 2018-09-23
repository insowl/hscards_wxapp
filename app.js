//app.js
App({
    onLaunch: function(){
        wx.cloud.init({
            env: 'hscards-08625d'
        })
        const db = wx.cloud.database()
        db.collection('cardSet').get({
            success: function(res){
                console.log(res)
            }
        })
    }
})
