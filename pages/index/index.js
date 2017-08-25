const util = require('../../utils/util.js')

Page({
  data: {
    classIndex: 0,
    costIndex: 0,
    standardIndex: 0,
    classItems: [
      {name: '', value: '全部职业', checked: 'true'},
      {name: 'druid', value: '德鲁伊'},
      {name: 'hunter', value: '猎人'},
      {name: 'mage', value: '法师'},
      {name: 'paladin', value: '圣骑士'},
      {name: 'priest', value: '牧师'},
      {name: 'rogue', value: '潜行者'},
      {name: 'shaman', value: '萨满'},
      {name: 'warlock', value: '术士'},
      {name: 'warrior', value: '战士'},
      {name: 'neutral', value: '中立'}
    ],
    costItems: [
      {name: '', value: '全部水晶', checked: 'true'},
      {name: '0', value: '0'},
      {name: '1', value: '1'},
      {name: '2', value: '2'},
      {name: '3', value: '3'},
      {name: '4', value: '4'},
      {name: '5', value: '5'},
      {name: '6', value: '6'},
      {name: '7', value: '7+'}
    ],
    standardItems: [
      {name: '1', value: '标准卡牌', checked: 'true'},
      {name: '0', value: '狂野卡牌'}
    ],
    params: {
      cardClass: '',
      cost: '',
      standard: 1,
      keywords: '',
      p: 1
    },
    isAllClass: true,
    totalPerClass: {},
    total: 0,
    classTotal: 0,
    classCount: 1
  },
  onLoad: function(option){

  },
  classPickerChange: function(e){
    if(e.detail.value > 1){
      this.setData({
        isAllClass: false
      })
    }
    this.setData({
      classIndex: e.detail.value,
    })
    this.setData({
      'params.cardClass': this.data.classItems[this.data.classIndex].name
    })
    console.log(this.data.classIndex + this.data.params.cardClass)
  },
  costPickerChange: function(e){
    this.setData({
      costIndex: e.detail.value,
    })
    this.setData({
      'params.cost': this.data.costItems[this.data.costIndex].name
    })
    console.log(this.data.costIndex + this.data.params.cost)
  },
  standardPickerChange: function(e){
    this.setData({
      standardIndex: e.detail.value,
    })
    this.setData({
      'params.cardStandard': this.data.standardItems[this.data.standardIndex].name
    })
    console.log(this.data.standardIndex + this.data.params.cardStandard)
  },
  bindInput: function(e){
    this.setData({
      'params.keywords': e.detail.value
    })
  },
  bindConfirm: function(e){
    this.setData({
      'params.keywords': e.detail.value
    })
    this.searchRequest()
  },
  doSearch: function(){
    this.searchRequest()
  },
  onReachBottom: function(){
    if(this.data.params.p > 1){
      this.pageRequest()
    } else if(this.data.isAllClass && (this.data.classCount) < this.data.classTotal) {
      this.setData({
        'params.cardClass': Object.keys(this.data.totalPerClass)[this.data.classCount]
      })
      this.pageRequest()
      this.data.classCount ++
    }
  },
  //列表项点击事件
  nav2Detail: function(e){
    var cardStr = JSON.stringify(e.currentTarget.dataset.card)    
    wx.navigateTo({
      url: "../details/details?card=" + encodeURIComponent(cardStr)
    })
  },
  //主动搜索请求
  searchRequest: function(){
    this.setData({
      'params.p': 1
    })
    var that = this
    util.GET('action/cards/query', this.data.params, function(res) {
      console.log(that.data.params)
      console.log(res)
      that.setData({
        'params.p': res.data.nextPage
      })
      var sum = 0
      if(that.data.isAllClass){
        for(var i in res.data.totalPerClass){
          sum += res.data.totalPerClass[i]
        }
      } else {
        sum = res.data.total
      }
      for(var i = 0; i < res.data.cards.length; i++){
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
    })
  },
  //翻页搜索请求
  pageRequest: function(){
    var that = this
    util.GET('action/cards/query', this.data.params, function(res) {
      console.log(that.data.params)
      console.log(res)
      that.setData({
        'params.p': res.data.nextPage
      })
      for(var i = 0; i < res.data.cards.length; i++){
        res.data.cards[i]['cardClassText'] = util.classParam2Text(res.data.cards[i].cardClass)
        res.data.cards[i]['cardTypeText'] = util.typeParam2Text(res.data.cards[i].cardType)
        res.data.cards[i]['cardSetText'] = util.setParam2Text(res.data.cards[i].cardSet)
      }
      that.setData({
        cardList: that.data.cardList.concat(res.data.cards)
      })
    })
  }
})
