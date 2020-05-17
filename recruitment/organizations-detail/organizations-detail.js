// organizations-detail/organizations-detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    organizations_id:'',
    images: [
      'https://img.yzcdn.cn/vant/apple-1.jpg',
      'https://img.yzcdn.cn/vant/apple-2.jpg',
      "/学生端/首页/发现二级页.png",
      "/学生端/首页/发现二级页.png",
      "/学生端/首页/发现二级页.png",
      "/学生端/首页/发现二级页.png",
      "/学生端/首页/发现二级页.png",
      "/学生端/首页/发现二级页.png",
      "/学生端/首页/发现二级页.png",
      "/学生端/首页/发现二级页.png",
      "/学生端/首页/发现二级页.png",
      "/学生端/首页/发现二级页.png",
      "/学生端/首页/发现二级页.png",
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(decodeURIComponent(options.id)) 
    this.setData({organizations_id:options.id})
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