// pages/DetailTask/DetailTask.js
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
    var NowDay = new Date(Date.parse(new Date()) + 60 * 60 * 1000 * 8).toISOString().substring(0, 10);
    var list = { "task_id": app.globalData.task_id };
    fetch('get_detail_task.php', list, 'POST').then((res) => {
      console.log(res.data)
      var AllDays = app.checkDate(res.data[0].task_begin_data, res.data[0].task_end_data);
      var RemainDays = app.checkDate(res.data[0].task_begin_data, NowDay)
      var days = app.checkDate(NowDay,res.data[0].task_end_data)
      var task_progress = (RemainDays / AllDays) * 100;
      task_progress = task_progress.toFixed(1);
      this.setData({
        user_image: res.data[0].user_image,
        task_title: res.data[0].task_title,
        user_name: res.data[0].user_name,
        task_price: res.data[0].task_price,
        task_content: res.data[0].task_content,
        task_begin_data: res.data[0].task_begin_data,
        task_end_data: res.data[0].task_end_data,
        task_progress:task_progress,
        days:days
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
  true: function(e) {
    var task_id = app.globalData.task_id;
    var list = {"task_id":task_id};
    fetch('change_task_status_examining.php',list,'POST').then((res) => {
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
    wx.switchTab({
      url: '../index/index',
    })
  },
  refuse: function(e){ 
    var task_id = app.globalData.task_id;
    var list = {"task_id":task_id};
    fetch('change_task_status_fail.php',list,'POST').then((res) => {
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
    wx.switchTab({
      url: '../index/index',
    })
   }
})