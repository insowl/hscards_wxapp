Page({
  data: {
    card: {}
  },
  onLoad: function(option) {
    var that = this
    var cardStr = decodeURIComponent(option.card)
    this.setData({
        card: JSON.parse(cardStr)
    })
    console.log(this.data.card)
  }
})