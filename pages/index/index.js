// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sacle:18,
    latitude:0,
    longitude:0,
    controls:[],
    _markers:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.mapCtx = wx.createMapContext("ofoMap");
    this.mapCtx.moveToLocation();
    // 1.获取定时器，用于判断是否已经在计费
    this.timer=options.timer;
    // 2.调用wx.getLocation系统API,获取并设置当前位置经纬度
    wx.getLocation({
      type:"gcj02",
      success: (res)=> {
        // console.log(res)
        this.setData({
          latitude:res.latitude,
          longitude:res.longitude
        })
      },
    });
    // 3.设置地图控件的位置及大小，通过设备宽高定位
    wx.getSystemInfo({
      success: (res)=> {
        this.setData({
          controls:[{
            id:1,
            iconPath:'/images/location.png',
            position:{
              left:20,
              top:res.windowHeight-80,
              width:50,
              height:50
            },
            clickable:true
          },
            {
              id: 2,
              iconPath: '/images/use.png',
              position: {
                left: res.windowWidth/2-45,
                top: res.windowHeight - 100,
                width: 90,
                height: 90
              },
              clickable: true
            },
            {
              id: 3,
              iconPath: '/images/warn.png',
              position: {
                left: res.windowWidth-70,
                top: res.windowHeight - 80,
                width: 50,
                height: 50
              },
              clickable: true
            },
            {
              id: 4,
              iconPath: '/images/marker.png',
              position: {
                left: res.windowWidth/2-15,
                top: res.windowHeight/2-45,
                width: 30,
                height: 45
              },
              clickable: false
            },
            {
              id: 5,
              iconPath: '/images/avatar.png',
              position: {
                left: res.windowWidth -68,
                top: res.windowHeight -155,
                width: 45,
                height: 45
              },
              clickable: true
            }]
        })
      },
    });
    // 4.请求服务器，显示附近的单车，用markers标记
    wx.request({
      url: 'https://www.easy-mock.com/mock/5aa8cbc5ed660354c14569c9/example/ofoBiyclePosition',
      data:[],
      method:'GET',
      success:(res)=>{
        console.log(res)
        this.setData({
          markers:res.data.data
        })
      }
    })
  },
  //地图控件点击事件
  bindcontroltap: function (e) {
     // 判断点击的是哪个控件 e.controlId的值是当前点击控件的id。
    switch (e.controlId) {
      //点击定位控件
      case 1: this.movetoPosition();
      break;
       // 点击立即用车，判断当前是否正在计费，此处只需要知道是调用扫码，后面会讲到这里的判断条件
      case 2:if(this.timer===""||this.timer===undefined){
        // 没有在计费就扫码
        wx.scanCode({
          success:(res)=>{
            wx.showLoading({
              title: '正在获取密码',
              mask: true // 显示蒙层
            });
            // 请求服务器获取密码和车号
            wx.request({
              url: 'https://www.easy-mock.com/mock/59098d007a878d73716e966f/ofodata/password',
              data:{},
              method:'GET',
              success:function(res){
                // 请求密码成功隐藏等待框
                wx.hideLoading();
                // 携带密码和车号跳转到密码页
                wx.redirectTo({
                  url: '../scanresult/scanresult?password='+res.data.data.password+'&number='+res.data.data.number,
                  success:function(res){
                    wx.showToast({
                      title: '获取密码成功',
                      duration:1000
                    })
                  }
                })
              }
            })
          }
        })
        // 当前已经在计费就回退到计费页
      }else{
        wx.navigateBack({
          delta:1
        })
      }
      break;
      //点击保障控件，跳转到报障页面
      case 3:wx.navigateTo({
        url: '../warn/warn'
      });
      break;
      //点击头像控件，跳转至个人中心
      case 5:wx.navigateTo({
        url: '../my/my',
      });
      break;
      default:break;
    }
  },
  //地图标记点击事件，连接用户位置和点击的单车位置
  bindmarkertap:function(e){
    let _markers=this.data.markers;//拿到标记数组
    let markerId=e.markerId;//获取点击的标记id
    let currMaker=_markers[markerId];//通过id拿到当前点击的标记
    this.setData({
      polyline:[{
        points:[{//起点连线
          longitude:this.data.longitude,
          latitude:this.data.latitude
        },{//终点连线，当前点击的标记
          longitude:currMaker.longitude,
          latitude:currMaker.latitude
        }],
        color:'#ff00dd',//连线颜色
        width:1,//连线宽度
        dottedLine:true //虚线
      }],
      scale:18
    })
  },
  //拖动地图事件
  bindregionchange:function(e){
    if(e.type=="begin"){
      wx.request({
        url: 'https://www.easy-mock.com/mock/5aa8cbc5ed660354c14569c9/example/ofoBiyclePosition',
        data:{},
        method:'GET',
        success:(res)=>{
          this.setData({
            _markers:res.data.data
          })
        }
      })
    }
    else if(e.type=="end"){
      this.setData({
        markers:this.data._markers
      })
    }
  },
  movetoPosition: function () {
    this.mapCtx.moveToLocation();
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