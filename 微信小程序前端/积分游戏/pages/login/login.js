// pages/login/login.js
var app = getApp();
const fetch = require('../../utils/fetch.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pw_hidden:true,
    txt_hidden:"显示"
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
  changePwhidden:function(){
    if(this.data.pw_hidden){
        this.setData({
        pw_hidden:false,
        txt_hidden:"隐藏"
      })
    }else{
      this.setData({
        pw_hidden:true,
        txt_hidden:"显示"
      })
    }   
  },
  bindPhoneInput:function(e){
    this.setData({
      user_phone:e.detail.value
    })
  },
  bindPwInput:function(e){
    this.setData({
      user_pw:e.detail.value
    })
  },
  login: function (e) {
    /* console.log(this.data.user_phone + "||" + this.data.user_pw) */
    var user_phone = this.data.user_phone;
    var check_phone = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (typeof user_phone == "undefined") {
      wx.showToast({
        title: '手机号为空',
        icon: 'none',
        duration: 1500
      })
      return false;
    } else if (user_phone.length < 11) {
      wx.showToast({
        title: '手机号长度有误',
        icon: 'none',
        duration: 1500
      })
      this.setData({
        phone: ""
      })
      return false;
    } else if (!check_phone.test(user_phone)) {
      wx.showToast({
        title: '手机号格式有误',
        icon: 'none',
        duration: 1500
      })
      this.setData({
        phone: ""
      })
      return false;
    }
    var user_pw = this.data.user_pw;
    var list = { "user_phone": user_phone, "user_pw": user_pw }
    fetch("check_login.php", list, "POST").then((res) => {
      //console.log(res)
      var status = res.data.Status;
      var because = res.data.because;
      if (status == 0) {
        wx.showToast({
          title: because,
          icon: 'none',
          duration: 1500
        })
        this.setData({
          phone: "",
          pw: ""
        })
        return false;
      }
      wx.showToast({
        title: "登录成功",
        icon: 'success',
        duration: 1500
      })
      app.globalData.user_info = res.data[0]
      app.globalData.userStatus = 1
      wx.switchTab({
        url: '../index/index'
      });
    })
  }
})