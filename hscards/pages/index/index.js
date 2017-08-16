Page({
  data: {
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
  },
  classChange: function(e) {
    this.setData({
      cardClass: e.detail.value
    })
    console.log('cardClass=' + this.data.cardClass)
  },
  costChange: function(e) {
    this.setData({
      cardCost: e.detail.value
    })
    console.log('cost=' + this.data.cardCost)
  },
  standardChange:function(e){
    this.setData({
      cardStandard: e.detail.value
    })
    console.log('standard=' + this.data.cardStandard)
  }
})
