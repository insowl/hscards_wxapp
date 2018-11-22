// 云函数入口文件
const cloud = require('wx-server-sdk')
const request = require('request')
const baseUrl = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential'
const genToken = async (appid, secret) => {
  return new Promise((resolve, reject) => {
    request(`${baseUrl}&appid=${appid}&secret=${secret}`, function (error, response, body) {
      resolve(body)
      reject(error)
    })
  })
}
cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  let res = new Object()
  const oldTokenRes = await db.collection('token').doc('W_Qlb3ahafTeBPN0').get()
  const oldToken = oldTokenRes.data.tokenvalue
  const oldExpire = oldTokenRes.data.expiretime
  const oldTS = oldTokenRes.data.timestamp
  const nowaTS = new Date().getTime()
  if(nowaTS - oldTS < (oldExpire-180)*1000){
    res.token = oldToken
    res.message = '读取数据库'
  } else {
    const etc = await db.collection('etc').doc('W_QhUEXacNtiP6l0').get()
    const appid = etc.data.appid
    const secret = etc.data.secret
    const tokenRes = await genToken(appid, secret)
    const resJson = JSON.parse(tokenRes)
    const token = resJson.access_token
    const expiresTime = resJson.expires_in
    let updateRes = new Object()
    try {
      updateRes = await db.collection('token').doc('W_Qlb3ahafTeBPN0').set({
        data: {
          tokentype: 'access_token',
          tokenvalue: token,
          expiretime: expiresTime,
          timestamp: new Date().getTime()
        }
      })
    } catch (err) {
      updateRes = err
    }
    res.token = token
    res.message = '新生成token'
  }
  return res
}