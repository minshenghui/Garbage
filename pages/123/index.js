Page({

  data: {
    show_tip: true,
  },

  onLoad: function (options) {

  },

  goSearch: function () {
    wx.navigateTo({
      url: '/pages/components/search/search',
    })
  },

  onAikefu: function () {
    wx.navigateTo({
      url: '/pages/android/qa',
    })
  }
})