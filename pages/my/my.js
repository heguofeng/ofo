// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{
      avatarUrl:'',
      nickName:"未登录"
    },
    bType:"primary",
    actionText:"登录",
    lock:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '个人中心',
    })
    var that=this;
    wx.getStorage({
      key: 'userInfo',
      success: function(res) {
        wx.hideLoading();
       that.setData({
         userInfo:{
           avatarUrl:res.data.userInfo.avatarUrl,
           nickName:res.data.userInfo.nickName
         },
         bType:res.data.bType,
         actionText:res.data.actionText,
         lock:true
       })       
      },
    })
  },
  bindAction:function(){
    this.data.lock=!this.data.lock;
    if(this.data.lock){
      wx.showLoading({
        title: '正在登录',
      });
      wx.login({
        success:(res)=>{
          wx.hideLoading();
          wx.getUserInfo({
            withCredentials:false,
            success:(res)=>{
              this.setData({
                userInfo:{
                  avatarUrl:res.userInfo.avatarUrl,
                  nickName:res.userInfo.nickName
                },
                bType:"warn",
                actionText:"退出登录"
              });
              wx.setStorage({
                key: 'userInfo',
                data: {
                  userInfo: {
                    avatarUrl: res.userInfo.avatarUrl,
                    nickName: res.userInfo.nickName
                  },
                  bType:'warn',
                  actionText:"退出登录"
                },
                success:function(res){
                  console.log("存储成功！")
                }
              })
            }
          })
        }
      })
    }else{
      wx.showModal({
        title: '确定退出？',
        content: '退出后将不能使用ofo了哦',
        success:(res)=>{
          if(res.confirm){
            console.log("确定")
            wx.removeStorageSync("userInfo")
            this.setData({
              userInfo:{
                avatarUrl:'',
                nickName:"未登录"
              },
              bType:"primary",
              actionText:"登录"
            })
          }else{
            console.log("取消");
            this.setData({
              lock:true
            })
          }
        }
      })
    }
  },
  movetoWallet:function(){
    wx.navigateTo({
      url: '../wallet/wallet',
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