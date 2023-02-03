// pages/task/task.js
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
    fetch('get_undone_task_list.php').then((res) => {
      res.data.forEach((r) => {
        //console.log(r)
        var AllDays = this.checkDate(r.task_begin_data,r.task_end_data);
        var RemainDays = this.checkDate(r.task_begin_data,NowDay)
        var task_progress = (RemainDays/AllDays)*100;
        task_progress = task_progress.toFixed(1);
        r.task_progress = task_progress;
        //console.log(task_progress)
      })
      this.setData({
        list:res.data
      })
      console.log(this.data.list)
      //console.log(res.data)
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
  go_put_task:function () {
    wx.navigateTo({
      url: '../put_task/put_task',
    })
    // var days = this.checkDate(this.data.list[0].task_begin_data,this.data.list[0].task_end_data);
    // var days = this.checkDate(this.data.list[1].task_begin_data,this.data.list[1].task_end_data);
    // console.log(days)
  },
  checkDate: function(startTime,endTime) {
    //日期格式化
    var start_date = new Date(startTime.replace(/-/g, "/"));
    var end_date = new Date(endTime.replace(/-/g, "/"));
    //转成毫秒数，两个日期相减
    var ms = end_date.getTime() - start_date.getTime();
    //转换成天数
    var day = parseInt(ms / (1000 * 60 * 60 * 24));
    //do something
    return day;
  },
  click: function(e) {
    //console.log(this.data.list[e.currentTarget.id].task_id)
    app.globalData.task_id = this.data.list[e.currentTarget.id].task_id;
    wx.navigateTo({
      url: '../DetailTask/DetailTask'
    })
  }
})