// pages/put_goods/put_goods.js
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
    this.setData({
      user_name: app.globalData.user_info.user_name,
      user_id: app.globalData.user_info.user_id,
      user_image: app.globalData.user_info.user_image
    })
  },
  bindTitleInput: function (e) {
    this.setData({
      goods_title: e.detail.value
    })
  },
  bindContentInput: function (e) {
    this.setData({
      goods_content: e.detail.value
    })
  },
  bindPricetInput: function (e) {
    this.setData({
      goods_price: e.detail.value
    })
  },
  put: function() {
    var goods_info = {
      "goods_title":this.data.goods_title,"goods_content":this.data.goods_content,"goods_price":this.data.goods_price,
      "user_image":this.data.user_image,"user_id":this.data.user_id
    }
    fetch("put_goods.php",goods_info,"POST").then((res) => {
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
        url: '../goods/goods',
      })
    })
  }
})