// organizations-detail/organizations-detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    entered:true,
    organization:[],
    images: [
      'https://img.yzcdn.cn/vant/apple-1.jpg',
      'https://img.yzcdn.cn/vant/apple-2.jpg',
      "/学生端/首页/发现二级页.png",
      "/学生端/首页/发现二级页.png",
      "/学生端/首页/发现二级页.png",
    ],
    de:'   安徽中医药大学大学生书\n画协会，由一群书画爱好者成立，初建于1984年，如今已经走过34载春秋岁月，是本校历史最悠久的社团。书协最初的创办遵循“弘扬中华书画艺术，繁荣校园传统文化，提高学子文化素质，扶持校院书画新人”的宗旨，以传承中华传统工艺—书法、绘画、剪纸等为己任',
    department:[{name:"嵌入式", de:"安徽中医药大学大学生书画协会，由一群书画爱好者成立，初建于1984年，如今已经走过34载春秋岁月，是本校历史最悠久的社团。书协最初的创办遵循“弘扬中华书画艺术，繁荣校园传统文化，提高学子文化素质，扶持校院书画新人”的宗旨，以传承中华传统工艺—书法、绘画、剪纸等为己任."},{name:"后台", de:"安徽中医药大学大学生书画协会，由一群书画爱好者成立，初建于1984年，如今已经走过34载春秋岁月，是本校历史最悠久的社团。书协最初的创办遵循“弘扬中华书画艺术，繁荣校园传统文化，提高学子文化素质，扶持校院书画新人”的宗旨，以传承中华传统工艺—书法、绘画、剪纸等为己任"},{name:"前端", de:"安徽中医药大学大学生书画协会，由一群书画爱好者成立，初建于1984年，如今已经走过34载春秋岁月，是本校历史最悠久的社团。书协最初的创办遵循“弘扬中华书画艺术，繁荣校园传统文化，提高学子文化素质，扶持校院书画新人”的宗旨，以传承中华传统工艺—书法、绘画、剪纸等为己任"},{name:"图形组", de:"安徽中医药大学大学生书画协会，由一群书画爱好者成立，初建于1984年，如今已经走过34载春秋岁月，是本校历史最悠久的社团。书协最初的创办遵循“弘扬中华书画艺术，繁荣校园传统文化，提高学子文化素质，扶持校院书画新人”的宗旨，以传承中华传统工艺—书法、绘画、剪纸等为己任"}]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.organization = JSON.parse(options.organization)
    wx.setNavigationBarTitle({
      title: this.data.organization.clubName
    })
    if(this.data.organization.entered == undefined)
      this.data.entered = false;
    else
      this.data.entered = true;
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