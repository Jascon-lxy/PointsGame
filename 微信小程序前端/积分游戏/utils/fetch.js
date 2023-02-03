module.exports = function(path, data, method) {
  return new Promise((resolve, reject) => {
    wx.request({
      //url: 'https://www.jason-xiaoyi.top/lxy_first/controller/' + path,
      url: 'http://127.0.0.1/lxy_first/controller/' + path,
      method: method,
      data: data,
      header: {
        'content-type':'application/x-www-form-urlencoded;charset=utf-8'
      },
      success: resolve,
      fail: function() {
        reject()
        wx.showModal({
          showCancel: false,
          title: '失败'
        })
      }
    })
  })
}