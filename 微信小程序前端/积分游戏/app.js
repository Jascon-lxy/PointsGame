// app.js
App({
  globalData: {
    userStatus: 0,
    user_info:null,
    task_id:0,
    goods_id:0
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
  }
})
