const app = getApp()
Page({
  data: {
    service_url:app.data.service_url + 'login/',
    pho_num:'',
    password:''
  },
  register_post(){
   /* wx.showToast({
      title: '正在登录！',
      icon:'none'
    })
    wx.showToast({
      title: '登录成功！',
        icon:'none'
    })
    app.data.log_on = true;
    app.data.name = 'res.data.userName';
    app.data.school = 'res.data.school';
    app.data.college ='res.data.college';
    app.data.myclass = 'res.data.class';
    app.data.stuID = 'res.data.stuId';
    app.data.phone = 'res.data.phoNum';
    app.data.mailbox = 'res.data.mailbox';
    app.data.tempFilePaths = 'res.data.tempFilePaths';
    setTimeout(function () {
      wx.switchTab({
        url: '/index/index2'
      })
    }, 2000);
    return;*/
    let that = this; 
    wx.request({
      url: app.data.service_url + 'login/',
      header: {
        'content-type': 'application/json'
      },
      data: {
        passWord: that.data.password,
        phoNum: that.data.pho_num,
      },
      method: 'POST',
      success(res) {
        if(res.data.code == 100)
        {
          wx.showToast({
            title: '登录成功！',
              icon:'none'
          })
          app.data.log_on = true;
          app.data.token = res.data.data.token;
          app.data.name = res.data.data.userName;
          app.data.school = res.data.data.school;
          app.data.college =res.data.data.college;
          app.data.myclass = res.data.data.class;
          app.data.stuID = res.data.data.stuId;
          app.data.phone = res.data.data.phoNum;
          app.data.mailbox = res.data.data.mailbox;
          app.data.tempFilePaths = res.data.data.tempFilePaths;
          setTimeout(function () {
            wx.switchTab({
              url: '/index/index2'
            })
          }, 2000);
        }
        else
        {
          wx.showToast({
            title: res.data.message,
            icon:'none'
          })
        }
      },
      fail()
      {
        wx.showToast({
          title: '网络出现问题,登录失败！',
          icon:'none'
        })
      }
    });
  },
  log_on_post_button()
  {
    wx.showToast({
      title: '正在登录！',
      icon:'none'
    })
    if(!(/^1[34578]\d{9}$/.test(this.data.pho_num))) 
    {
      wx.showToast({
        title: '手机号码错误,登录失败！',
        icon:'none'
      })
      return;
    }
    if (!(/^[0-9A-Za-z]{6,16}$/.test(this.data.password)))
    {
      wx.showToast({
        title: '密码输入有误,登录失败！',
        icon:'none'
      })
      return;
    }
    this.register_post();
  },
  getpho_num(e)
  {
    this.data.pho_num = e.detail
  },
  getpassword(e)
  {
    this.data.password = e.detail
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