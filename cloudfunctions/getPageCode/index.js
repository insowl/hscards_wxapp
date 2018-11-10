// 云函数入口文件
const cloud = require('wx-server-sdk')
const request = require('request')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  let path = event.pagePath
  // return await cloud.callFunction({
  //   name: 'getAppToken',
  //   success: function(res){
  //     return new Promise((resolve, reject) => {
  //       request('https://api.weixin.qq.com/wxa/getwxacode?path=' + path + '&access_token=' + res.result.access_token, function (error, response, body) {
  //         resolve(body)
  //       })
  //     })
  //   }
  // })
  let token = await cloud.callFunction({
    name: 'getAppToken'
  })
  return new Promise((resolve, reject) => {
    request({
      url: 'https://api.weixin.qq.com/wxa/getwxacode?access_token=' + token.result.access_token,
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: {
        path: path,
      //   access_token: token.result.access_token
      }
    },
    function (error, response, body) {
      resolve(body)
    })
  })
}
