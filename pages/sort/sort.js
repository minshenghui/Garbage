var app = getApp();
var garbages = require('../../database/garbage.js');
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
    TabCur: 0,
    MainCur: 0,
    VerticalNavTop: 0,
    list: [],
    load: true,


    currentTab: 1
  },

  onLoad() {
    this.setData({
      garbageList: garbages.garbageList,
      tabBarWidth: wx.getSystemInfoSync().windowWidth - 168
    })
  },

  //滑动切换
  swiperTab: function(e) {
    this.setData({
      currentTab: e.detail.current
    });
  },

  //点击切换
  toTab: function(e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
    // this.getGarbage(e.currentTarget.dataset.current)
  },

  // 搜索
  toSearch() {
    wx.navigateTo({
      url: '/pages/index/search/search',
    })
  },

  getGarbage(sortId) {
    wx.showLoading({
      title: '加载中...',
    })
    wx.cloud.init();
    var db = wx.cloud.database();
    db.collection('product').where({
      sortId: Number(sortId)
    })
    
    .get({
      success(res) {
        wx.hideLoading()
        console.log(res.data)
      }
    })
  },

  onReady() {
    wx.hideLoading()
  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      MainCur: e.currentTarget.dataset.id,
      VerticalNavTop: (e.currentTarget.dataset.id - 1) * 50
    })
  },
  VerticalMain(e) {
    let that = this;
    let list = this.data.list;
    let tabHeight = 0;
    if (this.data.load) {
      for (let i = 0; i < list.length; i++) {
        let view = wx.createSelectorQuery().select("#main-" + list[i].id);
        view.fields({
          size: true
        }, data => {
          list[i].top = tabHeight;
          tabHeight = tabHeight + data.height;
          list[i].bottom = tabHeight;
        }).exec();
      }
      that.setData({
        load: false,
        list: list
      })
    }
    let scrollTop = e.detail.scrollTop + 20;
    for (let i = 0; i < list.length; i++) {
      if (scrollTop > list[i].top && scrollTop < list[i].bottom) {
        that.setData({
          VerticalNavTop: (list[i].id - 1) * 50,
          TabCur: list[i].id
        })
        return false
      }
    }
  }
})