// pages/wallet/wallet.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    overage:0,
    ticket:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '我的钱包',
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.getStorage({
      key: 'overage',
      success: (res) =>{
        this.setData({
          overage:res.data.overage
        })
      },
    })
  },
overageDesc:function(){
  wx.showModal({
    title: '',
    content: '充值余额'+this.data.overage+'元+活动赠送余额0.00',
    showCancel:false,
    confirmText:"我知道了"
  })
},
movetoCharge:function(){
  wx.redirectTo({
    url: '../charge/charge',
  })
},
//用车券
showTicket:function(){
  wx.showModal({
    title: '',
    content: '你没有用车券了',
    showCancel:false,
    confirmText:"好吧"
  })
},
//押金退还
showDeposit:function(){
  wx.showModal({
    title: '',
    content: '金会立即退回，退款后，您将不能使用ofo共享单车确认要进行此退款吗？',
    cancelText:"继续使用",
    cancelColor:"#ffd904",
    confirmText:"押金退款",
    confirmColor:"#ccc",
    success:(res)=>{
      if(res.confirm){
        wx.showToast({
          title: '退款成功',
          icon:'success',
          duration:2000
        })
      }
    }
  })
},
//关于ofo
showInvcode:function(){
  wx.showModal({
    title: "ofo共享单车",
    content: "微信服务号：ofobike,网址：m.ofo.so",
    showCancel: false,
    confirmText: "玩的6"
  })

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