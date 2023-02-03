// pages/my_put_goods/my_put_goods.js
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
    var user_id = app.globalData.user_info.user_id
    var list = { "user_id": user_id }
    fetch("get_goods_list.php", list, "POST").then((res) => {
      this.setData({
        my_goods_list: res.data
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
  out: function () {

    var goods_id = this.data.my_goods_list[e.currentTarget.dataset.index].goods_id;
    var goods_status = this.data.my_goods_list[e.currentTarget.dataset.index].goods_status;
    if (goods_status == 0) {
      var list = { "goods_id": goods_id }
      fetch('change_out_goods.php', list, 'POST').then((res) => {
        var status = res.data.Status;
        var because = res.data.because;
        if (status == 0) {
          wx.showToast({
            title: because,
            icon: 'none',
            duration: 1500
          })
        } else if (status == 1) {
          wx.showToast({
            title: because,
            icon: 'success',
            duration: 1500
          })
        }
      })
      this.onShow();
    }else{
      wx.showToast({
        title: "该物品已被兑换或已使用",
        icon: 'success',
        duration: 1500
      })
    }

  }
})