// 云函数入口文件
const cloud = require('wx-server-sdk')
const request = require('request')
// const fs = require('fs')
// const stream = require('stream')
const cloudBasePath = 'cloud://hscards-08625d.6873-hscards-08625d/'
const cloudWXACodePath = 'cardsWXACode/'
const cloudImagePath = 'cardsImage/'
const genWXACode = async function(token, path){
  return new Promise((resolve, reject) => {
    request({
      url: 'https://api.weixin.qq.com/wxa/getwxacode?access_token=' + token.result.token,
      method: 'POST',
      encoding: null,  //TMD！！！一定要加这个！！！！！！
      headers: {
        'content-type': 'application/json;'
      },
      body: JSON.stringify({
        path: path,
							 is_hyaline: true,
							 line_color: {
									'r': '14',
									'g': '134',
									'b': '202'
								}
      })
    },function (error, response, body) {
      resolve(body)
      reject(error)
    })
  })
}
const downloadImg = async function(imageUrl){
  return new Promise((resolve, reject) => {
    request({
      url: imageUrl,
      method: "GET",
      encoding: null,  //这里也要加！！！！！
      headers: {
        'Accept-Encoding': 'gzip, deflate'  //这个也很关键！！！！！！
      }
    }, function(error, response, body){
      resolve(body)
      reject(error)
    })
  })
}
cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  let res = new Object()
  const path = event.pagePath
  const cardID = event.cardID
  const cardImageUrl = event.cardImageUrl
  const token = await cloud.callFunction({
    name: 'getAppToken'
  })
  const wxacodePath = `${cloudBasePath}${cloudWXACodePath}${cardID}.jpg`
  const imagePath = `${cloudBasePath}${cloudImagePath}${cardID}.jpg`
  let wxacodeDlRes = new Object()
  let imageDlRes = new Object()
  try{
    wxacodeDlRes = await cloud.downloadFile({
      fileID: wxacodePath
    })
  } catch(err){
    wxacodeDlRes = err
  }
  try{
    imageDlRes = await cloud.downloadFile({
      fileID: imagePath
    })
  } catch(err){
    imageDlRes = err
  }
  //判断云存储是否已经保存了图片
  if (wxacodeDlRes.errMsg == 'downloadFile:ok' && imageDlRes.errMsg == 'downloadFile:ok'){
    res.wxacode = wxacodePath
    res.image = imagePath
    res.message = '读取云存储'
  } else {
    //生成小程序码并保存在云存储
    const wxacodeRes = await genWXACode(token, path)
    const wxacodeUploadRes = await cloud.uploadFile({
      cloudPath: `${cloudWXACodePath}${cardID}.jpg`,
      fileContent: wxacodeRes
    })
    //下载卡牌图片并保存在云存储
    const dlImgRes = await downloadImg(cardImageUrl)
    const imgUploadRes = await cloud.uploadFile({
      cloudPath: `${cloudImagePath}${cardID}.jpg`,
      fileContent: dlImgRes
    })
    res.wxacode = wxacodeUploadRes.fileID
    res.image = imgUploadRes.fileID
    // res.wxacodeRes = wxacodeRes
    // res.dlImgRes = dlImgRes
    res.message = '新生成'
  }
  // res.wxacodeDlRes = wxacodeDlRes
  // res.imageDlRes = imageDlRes
  return res
}
