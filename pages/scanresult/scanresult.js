// pages/scanresult/scanresult.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    time: 9,  // 默认计时时长，这里设短一点，用于调试，ofo app是90s
    password:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      password:options.password
    })
    let time=9;
    this.timer=setInterval(()=>{
      this.setData({
        time:--time
      })
       // 读完秒后携带单车号码跳转到计费页
    if(time==0){
      clearInterval(this.timer);
      wx.redirectTo({
        url: '../billing/billing?number='+options.number,
      })
    }
    }, 1000);
  },
moveToWarn:function(){
  clearInterval(this.timer)
  wx.redirectTo({
    url: '../index/index',
  })
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