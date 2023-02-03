// pages/goods/goods.js
var app = getApp();
const fetch = require('../../utils/fetch.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbar: ['小刘老师', '小龙同志'], 
    currentTab: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var xiaoliu_list = {"user_id":1}
    var xiaolong_list = {"user_id":2}
    fetch("get_goods_list.php", xiaoliu_list, "POST").then((res) => {
      this.setData({
        xiaoliu_con : res.data
      })
    })
    fetch("get_goods_list.php", xiaolong_list, "POST").then((res) => {
      this.setData({
        xiaolong_con : res.data
      })
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  navbarTap: function(e){ 
    this.setData({ 
     currentTab: e.currentTarget.dataset.idx 
    }) 
   },
   goTodatilxiaolong: function (e) {
    console.log(e);
    console.log(this.data.xiaolong_con[e.currentTarget.id].goods_id);
    app.globalData.goods_id = this.data.xiaolong_con[e.currentTarget.id].goods_id;
    wx.navigateTo({
      url: '../DetailGoods/DetailGoods',
    })
  },
   goTodatilxiaoliu: function (e) {
     console.log(e);
     console.log(this.data.xiaoliu_con[e.currentTarget.id].goods_id);
     app.globalData.goods_id = this.data.xiaoliu_con[e.currentTarget.id].goods_id;
     wx.navigateTo({
      url: '../DetailGoods/DetailGoods',
    })
   },
   go_put_goods: function(e) {
     wx.navigateTo({
       url: '../put_goods/put_goods',
     })
   }
})