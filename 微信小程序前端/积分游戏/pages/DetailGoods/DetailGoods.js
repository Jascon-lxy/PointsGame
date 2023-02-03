// pages/DetailGoods/DetailGoods.js
var app = getApp();
const fetch = require('../../utils/fetch.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
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
    var goods_id = app.globalData.goods_id;
    var list = {"goods_id":goods_id};
    fetch("get_detail_goods.php", list, "POST").then((res) => {
      console.log(res)
      this.setData({
        goods_info : res.data[0],
        user_id : app.globalData.user_info.user_id
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
  buy: function() {
    console.log(this.data.user_id + "----" + this.data.goods_info.goods_id)
    var buy_list = {"user_id":this.data.user_id,"goods_id":this.data.goods_info.goods_id}
    fetch("buy.php", buy_list, "POST").then((res) => {
      console.log(res)
      var status = res.data.Status;
      var because = res.data.because;
      if(status == 0){
        setTimeout(() => {
          wx.showToast({
            title: because,
            icon: 'none',
            duration: 1500
          });
          setTimeout(() => {
            wx.hideToast();
          }, 2000)
        }, 0);
        wx.switchTab({
          url: '../goods/goods'
        });
      }else if(status == 1){
        setTimeout(() => {
          wx.showToast({
            title: because,
            icon: 'success',
            duration: 1500
          });
          setTimeout(() => {
            wx.hideToast();
          }, 2000)
        }, 0);
        wx.switchTab({
          url: '../goods/goods'
        });
      }
    })
  }
})