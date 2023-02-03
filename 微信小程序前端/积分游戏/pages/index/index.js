var app = getApp();
const fetch = require('../../utils/fetch.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: true, //是否显示面板指示点
    autoplay: true, //是否自动播放
    interval: 4000, //停留时间间隔
    duration: 1000, //播放时长
    previousMargin: '50px', //前边距，可用于露出前一项的一小部分，接受 px 和 rpx 值
    nextMargin: '50px', //后边距，可用于露出后一项的一小部分，接受 px 和 rpx 值
    circular: true, //是否采用衔接滑动
    currentSwiperIndex: 0, //swiper当前索引
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
    if (app.globalData.userStatus == 0) {
      wx.showModal({
        title: '用户登录',
        content: '您还未登录，请先登录',
        showCancel: true,
        cancelText: "否",
        cancelColor: 'skyblue',
        confirmText: "是",
        confirmColor: 'skyblue',
        success: function (res) {
          if (res.cancel) {
            //在需要退出小程序的地方调用添加下面代码即可(js文件中)
            wx.exitMiniProgram({
              success: (res) => {console.log(res)},
            })
          } else if(res.confirm){
            wx.navigateTo({
              url: '../login/login'
            })
          }
        }
      })
    }
    var NowDay = new Date(Date.parse(new Date()) + 60 * 60 * 1000 * 8).toISOString().substring(0, 10);
    fetch('get_last_task_list.php').then((res) => {
      res.data.forEach((r) => {
        //console.log(r)
        var AllDays = app.checkDate(r.task_begin_data,r.task_end_data);
        var RemainDays = app.checkDate(r.task_begin_data,NowDay)
        var task_progress = (RemainDays/AllDays)*100;
        task_progress = task_progress.toFixed(1);
        r.task_progress = task_progress;
        //console.log(task_progress)
      })
      this.setData({
        list:res.data
      })
      //console.log(this.data.list)
      //console.log(res.data)
    })
    fetch('get_image_list.php').then((res) => {
      this.setData({
        imgUrls:res.data
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
  swiperBindchange(e) {
    this.setData({
      currentSwiperIndex: e.detail.current
    })
  },
  click: function(e) {
    //console.log(this.data.list[e.currentTarget.id].task_id)
    app.globalData.task_id = this.data.list[e.currentTarget.id].task_id;
    wx.navigateTo({
      url: '../DetailTask/DetailTask'
    })
  }

})