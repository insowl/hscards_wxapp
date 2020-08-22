'use strict';
const cloud = require('wx-server-sdk')
const rp = require('request-promise')

const refreshCardSets = async function () {
  let options = {
    uri: "https://hs.blizzard.cn/action/cards/sets",
    json: true
  }
  return new Promise((resolve, reject) => {
    rp(options).then(function(res){
      console.log("res:" + JSON.stringify(res))
      resolve(res)
    }).catch(function(err){
      console.log("err:" + JSON.stringify(err))
      reject(err)
    })
  })
}

cloud.init()
const db = cloud.database()

exports.main = async (event, context) => {
  let res = await refreshCardSets()
  let cardSet = {}
  let list1 = res.data.standard
  let list2 = res.data.wild
  for(let i = 0; i < list1.length; i++){
    // console.log(JSON.stringify(list1[i]))
    cardSet[list1[i].slug] = list1[i].name
  }
  for(let j = 0; j < list2.length; j++){
    // console.log(JSON.stringify(list2[j]))
    cardSet[list2[j].slug] = list2[j].name
  }
  let ud = await db.collection('basic_configs').doc('5cd174a78015bf4f586bf824').update({
    data: {
      cardSet: cardSet
    }
  })
  const config = await db.collection('basic_configs').doc('5cd174a78015bf4f586bf824').get()
  return(config.data)
}