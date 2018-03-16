// pages/charge/charge.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputValue:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '充值',
    })
  },
bindInput:function(res){
  console.log(res)
  this.setData({ inputValue:res.detail.value})
},
charge:function(){
  if(parseInt(this.data.inputValue)<=0||isNaN(this.data.inputValue)){
    wx.showModal({
      title: '警告',
      content: '咱是不是还得给你钱？',
      showCancel:false,
      confirmText:"不不不"
    })
  }else{
    wx.redirectTo({
      url: '../wallet/wallet',
      success:function(res){
        wx.showToast({
          title: '充值成功',
          icon:"success",
          duration:2000
        })
      }
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
    wx.getStorage({
      key: 'overage',
      success: (res) =>{
        wx.setStorage({
          key: 'overage',
          data: {
            overage:parseInt(this.data.inputValue)+parseInt(res.data.overage)
          }
        })
      },
      //如果本地没有金额，
      fail:(res)=>{
        wx.setStorage({
          key: 'overage',
          data: {
            overage:parseInt(this.data.inputValue)
          },
        })
      }
    })
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