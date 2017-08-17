Page({
  data: {
    classIndex: 0,
    costIndex: 0,
    classItems: [
      {name: '', value: '全部', checked: 'true'},
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
      {name: '', value: '全部', checked: 'true'},
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
    cardClass: '',
    cardCost: '',
    cardStandard: 1,
    keywords: ''
  },
  classPickerChange: function(e){
    this.setData({
      classIndex: e.detail.value,
    })
    this.setData({
      cardClass: this.data.classItems[this.data.classIndex].name
    })
    console.log(this.data.classIndex + this.data.cardClass)
  },
  costPickerChange: function(e){
    this.setData({
      costIndex: e.detail.value,
    })
    this.setData({
      cardCost: this.data.costItems[this.data.costIndex].name
    })
    console.log(this.data.costIndex + this.data.cardCost)
  },
  classChange: function(e) {
    this.setData({
      cardClass: e.detail.value
    })
  },
  costChange: function(e) {
    this.setData({
      cardCost: e.detail.value
    })
  },
  standardChange:function(e){
    this.setData({
      cardStandard: e.detail.value
    })
  },
  bindBlur: function(e){
    this.setData({
      keywords: e.detail.value
    })
  },
  doSearch: function(){
    console.log('cardClass=' + this.data.cardClass)
    console.log('cost=' + this.data.cardCost)
    console.log('standard=' + this.data.cardStandard)
    console.log('keywords=' + this.data.keywords)
    wx.navigateTo({
        url: "../list/list?cardClass="+this.data.cardClass+"&cost="+this.data.cardCost+"&standard="+this.data.cardStandard+"&keywords="+this.data.keywords
    })
  }
})
