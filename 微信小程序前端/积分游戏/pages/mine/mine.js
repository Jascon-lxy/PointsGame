// pages/mine/mine.js
var app = getApp();
const fetch = require('../../utils/fetch.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    y_menus: [
      { title: "积分明细" },
      { title: "兑换记录" },
      { title: "我发布的奖励" },
      { title: "我的任务" },
      { title: "我的审核" },
      { title: "设置" }
    ]
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
    this.setData({
      user_info: app.globalData.user_info
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    //console.log(app.globalData.user_info)
    var user_id = app.globalData.user_info.user_id;
    var list = {"user_id":user_id}
    fetch("get_user_info.php", list, "POST").then((res) => {
      //console.log(res)
      
      app.globalData.user_info = res.data[0]
      this.setData({
        user_info : res.data[0]
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
  mine_tap: function (e) {
    //console.log(e.currentTarget.dataset.idx)
    var idx = e.currentTarget.dataset.idx
    if (idx == 4) {
      wx.navigateTo({
        url: '../examine/examine'
      })
    }else if(idx == 3){
      wx.navigateTo({
        url: '../my_task/my_task'
      })
    }else if(idx == 5){
      wx.navigateTo({
        url: '../DetailSetting/DetailSetting'
      })
    }else if(idx == 1){
      wx.navigateTo({
        url: '../my_buy_goods/my_buy_goods'
      })
    }else if(idx == 2){
      wx.navigateTo({
        url: '../my_put_goods/my_put_goods'
      })
    }
  }
})