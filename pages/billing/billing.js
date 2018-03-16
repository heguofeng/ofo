// pages/billing/billing.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hours:'00',
    minuters:'00',
    seconds:'00',
    billing:"正在计费"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取扫码成功页传过来的车牌号，再定义一个定时器
    this.setData({
      number: options.number,
      timer: this.timer
    })
    // 初始化计时器
    let s = 0;
    let m = 0;
    let h = 0;
    // 计时开始
    this.timer = setInterval(() => {
      this.setData({
        seconds: s<10?"0"+s++:s++
      })
      if (s == 60) {
        s = 0;
        m++;
        setTimeout(() => {
          this.setData({
            minuters: m < 10 ? "0" + m : m
          });
        }, 1000)
        if (m == 60) {
          m = 0;
          h++
          setTimeout(() => {
            this.setData({
              hours: h < 10 ? "0" + h : h
            });
          }, 1000)
        }
      };
    }, 1000)  
  },
endRide:function(){
  clearInterval(this.timer);
  this.timer="";
  this.setData({
    billing:"本次骑行结束",
    disabled:true
  })
},
moveToIndex:function(){
  if(this.timer==""){
    wx.redirectTo({
      url: '../index/index',
    })
  }else{
    wx.navigateTo({
      url: '../index/index?timer='+this.timer,
    })
  }
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
  
  }
})