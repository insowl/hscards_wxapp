Page({
  data: {
    fromShare: 0,
    paramsStr: '',
    card: {},
    cardClass: {
      'druid': '德鲁伊',
      'hunter': '猎人',
      'mage': '法师',
      'paladin': '圣骑士',
      'priest': '牧师',
      'rogue': '潜行者',
      'shaman': '萨满',
      'warlock': '术士',
      'warrior': '战士',
      'neutral': '中立'
    },
    cardType: {
      'spell': '法术',
      'minion': '随从',
      'weapon': '武器'
    },
    cardRarity: {
      'normal': '基本',
      'common': '普通',
      'rare': '稀有',
      'epic': '史诗',
      'legendary': '传说'
    },
    cardSet: {
      'basic': '基本',
      'classic': '经典',
      'honors': '荣誉室',
      'naxx': '纳克萨玛斯',
      'gvg': '地精大战侏儒',
      'brm': '黑石山的火焰',
      'tgt': '冠军的试练',
      'loe': '探险者协会',
      'wotog': '上古之神的低语',
      'karazhan': '卡拉赞之夜',
      'msog': '龙争虎斗加基森',
      'ungoro': '勇闯安戈洛',
      'kotf': '冰封王座的骑士',
      'kobolds-catacombs': '狗头人与地下世界',
      'the-witchwood': '女巫森林'
    }
  },
  onLoad: function(option) {
    var that = this
    var cardStr = decodeURIComponent(option.card)
    this.setData({
      fromShare: option.fromShare,
      paramsStr: option.card,
      card: JSON.parse(cardStr)
    })
    console.log(this.data.card)
  },
  back2Index: function(){
    if(this.data.fromShare == 1){
      wx.reLaunch({
        url: '/pages/index/index'
      })
    } else if(this.data.fromShare == 0){
      wx.navigateBack({
        delta: 1
      })
    }
  },
  onShareAppMessage: function(res){
    return{
      title: this.data.card.name,
      path: '/pages/details/details?fromShare=1&card=' + this.data.paramsStr,
      imageUrl: this.data.card.imageUrl,
      success: function(res) {
        
      },
      fail: function(res) {
        
      }
    }
  }
})