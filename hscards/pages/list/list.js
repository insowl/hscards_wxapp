var util = require('../../utils/util.js')

Page({
  data: {
    params: {},
    text: {},
    cardList: [],
    totalPerClass: {},
    total: 0,
    classTotal: 0,
    classCount: 1,
    isAllClass: false
  },
  onLoad: function (option) {
    var that = this
    this.setData({
      params: {
        cardClass: option.cardClass,
        cost: option.cost,
        standard: option.standard,
        keywords: option.keywords,
        p: 1
      },
      text: {
        cardClass: util.classParam2Text(option.cardClass),
        cost: util.costParam2Text(option.cost),
        standard: util.standardParam2Text(option.standard)
      }
    })
    if(option.cardClass == '' || option.cardClass == null || option.cardClass == undefined){
      this.setData({
        isAllClass: true
      })
    }
    util.GET('action/cards/query', this.data.params, function(res) {
      console.log(res)
      that.data.params.p = res.data.nextPage
      console.log(that.data.params)
      var sum = 0
      if(that.data.isAllClass){
        for(var i in res.data.totalPerClass){
          sum += res.data.totalPerClass[i]
        }
      } else {
        sum = res.data.total
      }
      for(var i in res.data.cards){
        res.data.cards[i]['cardClassText'] = util.classParam2Text(res.data.cards[i].cardClass)
        res.data.cards[i]['cardTypeText'] = util.typeParam2Text(res.data.cards[i].cardType)
        res.data.cards[i]['cardSetText'] = util.setParam2Text(res.data.cards[i].cardSet)
      }
      that.setData({
        cardList: res.data.cards,
        totalPerClass: res.data.totalPerClass,
        total: sum,
        classTotal: Object.keys(res.data.totalPerClass).length
      })
      // console.log(Object.keys(res.data.totalPerClass).length)
    })
  },
  onReachBottom: function(){
    var that = this
    console.log('classTotal:'+ this.data.classTotal +',classCount:'+ this.data.classCount+',className:'+Object.keys(this.data.totalPerClass)[this.data.classCount])
    if(this.data.params.p > 1){
      util.GET('action/cards/query', this.data.params, function(res) {
        console.log(res)
        that.data.params.p = res.data.nextPage
        console.log(that.data.params)
        for(var i in res.data.cards){
          res.data.cards[i]['cardClassText'] = util.classParam2Text(res.data.cards[i].cardClass)
          res.data.cards[i]['cardTypeText'] = util.typeParam2Text(res.data.cards[i].cardType)
          res.data.cards[i]['cardSetText'] = util.setParam2Text(res.data.cards[i].cardSet)
        }
        that.setData({
          cardList: that.data.cardList.concat(res.data.cards)
        })
      })  
    } else if(this.data.isAllClass && (this.data.classCount) < this.data.classTotal) {      
        this.data.params.cardClass = Object.keys(this.data.totalPerClass)[this.data.classCount]
        util.GET('action/cards/query', this.data.params, function(res) {
        console.log(res)
        that.data.params.p = res.data.nextPage
        console.log(that.data.params)
        for(var i in res.data.cards){
          res.data.cards[i]['cardClassText'] = util.classParam2Text(res.data.cards[i].cardClass)
          res.data.cards[i]['cardTypeText'] = util.typeParam2Text(res.data.cards[i].cardType)
          res.data.cards[i]['cardSetText'] = util.setParam2Text(res.data.cards[i].cardSet)
        }
        that.setData({
          cardList: that.data.cardList.concat(res.data.cards)
        })
      })
      this.data.classCount ++
    }
  }
  
})
