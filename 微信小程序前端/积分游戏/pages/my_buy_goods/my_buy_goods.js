// pages/my_buy_goods/my_buy_goods.js
var app = getApp();
const fetch = require('../../utils/fetch.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbar: ['待使用', '已使用'],
    currentTab: 0
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
    var list = {"user_id":app.globalData.user_info.user_id};
    fetch('get_buying_list.php',list,'POST').then((res) => {
      this.setData({
        buying_list:res.data
      })
    })
    fetch('get_buyed_list.php',list,'POST').then((res) => {
      this.setData({
        buyed_list:res.data
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
   pass: function(e) {
     console.log(this.data.buying_list[e.currentTarget.dataset.index])
     var goods_id = this.data.buying_list[e.currentTarget.dataset.index].goods_id;
     var list = {"goods_id":goods_id}
     fetch('change_goods_status.php',list,'POST').then((res) => {
      var status = res.data.Status;
      var because = res.data.because;
      if(status == 0){
        wx.showToast({
          title: because,
          icon: 'none',
          duration: 1500
        })
      }else if(status == 1){
        wx.showToast({
          title: because,
          icon: 'success',
          duration: 1500
        })
      }
    })
    this.onShow();
   }
})