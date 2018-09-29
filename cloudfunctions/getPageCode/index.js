// 云函数入口文件
const cloud = require('wx-server-sdk')
const request = require('request')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  let path = event.pagePath

}

request('https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wxb35aa69465f737d4&secret=a0c4edd2afac9db03a8a90ac243a80d3', function (error, response, body) {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  console.log('body:', body); // Print the HTML for the Google homepage.
})