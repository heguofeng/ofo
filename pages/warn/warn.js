// pages/warn/warn.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  picUrls:[],
  inputValue:{
    num:0,
    desc:""
  },
  checkboxValue:[],
  actionText:"拍照/相册",
  btnBgc:'',
  itemValue:[
    {
      checked: false,
      value: "私锁私用",
      color: "#b9dd08"
    },
    {
      checked: false,
      value: "车牌缺损",
      color: "#b9dd08"
    },
    {
      checked: false,
      value: "轮胎坏了",
      color: "#b9dd08"
    },
    {
      checked: false,
      value: "车锁坏了",
      color: "#b9dd08"
    },
    {
      checked: false,
      value: "违规乱停",
      color: "#b9dd08"
    },
    {
      checked: false,
      value: "密码不对",
      color: "#b9dd08"
    },
    {
      checked: false,
      value: "刹车坏了",
      color: "#b9dd08"
    },
    {
      checked: false,
      value: "其他故障",
      color: "#b9dd08"
    }
  ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '报障维修',
    })
  },
checkboxChange:function(e){
  let _values=e.detail.value;
  if(_values.length==0){
    this.setData({
      btnBgc:""
    })
  }else{
    this.setData({
      checkboxValue:_values,
      btnBgc:"#b9dd08"
    })
  }
},
// 输入单车编号，存入inputValue
numberChange: function (e) {
  this.setData({
    inputValue: {
      num: e.detail.value,
      desc: this.data.inputValue.desc
    }
  })
},
// 输入备注，存入inputValue
descChange: function (e) {
  console.log(e)
  this.setData({
    inputValue: {
      num: this.data.inputValue.num,
      desc: e.detail.value
    }
  })
},
formSubmit:function(e){
  if(this.data.picUrls.length>0&&this.data.checkboxValue.length>0){
    wx.request({
      url: 'https://www.easy-mock.com/mock/59098d007a878d73716e966f/ofodata/msg',
      data:{
                  // 如果是post请求就把这些数据传到服务器，这里用get请求模拟一下假装获得了服务器反馈
          // picUrls: this.data.picUrls,
          // inputValue: this.data.inputValue,
          // checkboxValue: this.data.checkboxValue
      },
      method:'GET',
      success:function(res){
        wx.showToast({
          title: res.data.data.msg,
          icon:'success',
          duration:2000
        })
      }
    })
  }else{
    wx.showModal({
      title: '请填写反馈信息',
      content: '看什么看，赶快填反馈信息，削你啊',
      confirmText:"我填我填",
      cancelText:"劳资不填",
      success:(res)=>{
        if(res.confirm){

        }else{
          console.log("back")
          wx.navigateBack({
            delta:1
          })
        }
      }
    })
  }
},
//拍照或选择照片
bindCamera:function(){
  wx.chooseImage({
    count:4,
    sizeType:['oiriginal','compressed'],
    sourceType:['album','camera'],
    success:(res)=>{
      let tfps=res.tempFilePaths;
      let _picUrls=this.data.picUrls;
      for(let item of tfps){
        _picUrls.push(item);
        this.setData({
          picUrls:_picUrls,
          actionText:"+"
        })
      }
    }
  })
},
delPic:function(e){
  let index=e.target.dataset.index;
  let _picUrls=this.data.picUrls;
  _picUrls.splice(index,1);
  this.setData({picUrls:_picUrls})
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