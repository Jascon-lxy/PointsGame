// pages/put_task/put_task.js
var app = getApp();
const fetch = require('../../utils/fetch.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user_name: "",
    task_price: 1
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
    //console.log(new Date().toISOString().substring(0, 10));
    this.setData({
      begin_data: new Date(Date.parse(new Date()) + 60 * 60 * 1000 * 8).toISOString().substring(0, 10),
      end_data: new Date(Date.parse(new Date()) + 60 * 60 * 1000 * 24 * 2).toISOString().substring(0, 10),
      user_name: app.globalData.user_info.user_name,
      user_id: app.globalData.user_info.user_id
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
  bindTitleInput: function (e) {
    this.setData({
      task_title: e.detail.value
    })
  },
  bindContentInput: function (e) {
    this.setData({
      task_content: e.detail.value
    })
  },
  bindBeginDataChange: function (e) {
    //console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      begin_data: e.detail.value
    })
  },
  bindEndDataChange: function (e) {
    this.setData({
      end_data: e.detail.value
    })
  },
  PriceChange: function (e) {
    //console.log(e)
    this.setData({
      task_price: e.detail.value,
    });
  },
  put: function (e) {
    var list = {
      "task_title": this.data.task_title, "task_content": this.data.task_content, "task_price": this.data.task_price,
      "task_begin_data": this.data.begin_data, "task_end_data": this.data.end_data, "user_id": this.data.user_id
    }
    fetch("put_task.php",list,"POST").then((res) => {
      console.log(res)
      var status = res.data.Status;
      var because = res.data.because;
      if(status == 0){
        wx.showToast({
          title: because,
          icon: 'none',
          duration: 1500
        })
        return false;
      }
      wx.showToast({
        title: "提交成功",
        icon: 'success',
        duration: 1500
      })
      wx.switchTab({
        url: '../task/task',
      })
    })
  }
})