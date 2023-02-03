// pages/examine/examine.js
var app = getApp();
const fetch = require('../../utils/fetch.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbar: ['待审核', '已审核'],
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
    var user_id = (app.globalData.user_info.user_id%2)+1;
    // console.log(user_id)
    // console.log(app.globalData.user_info.user_id)
    var list = {"user_id":user_id};
    fetch('get_examined_list.php',list,'POST').then((res) => {
      //console.log(res.data)
      this.setData({
        Examined_list:res.data
      })
    })
    fetch('get_examining_list.php',list,'POST').then((res) => {
      this.setData({
        Examining_list:res.data
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
    //  console.log(e.currentTarget.dataset.index)
    //  console.log(this.data.Examining_list[e.currentTarget.dataset.index].task_id)
    var task_id = this.data.Examining_list[e.currentTarget.dataset.index].task_id;
    var list = {"task_id":task_id};
    fetch('change_task_status.php',list,'POST').then((res) => {
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
    this.onLoad()
    this.onShow()
    console.log("pass成功")
   },
   refuse: function(e){ 
    var task_id = this.data.Examining_list[e.currentTarget.dataset.index].task_id;
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
    this.onLoad()
    this.onShow()
    console.log("refuse成功")
   }
})