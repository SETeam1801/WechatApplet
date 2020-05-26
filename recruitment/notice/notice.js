// index/second/notice.js
const app = getApp()
Page({
  i : '0',  
  /**
   * 页面的初始数据
   */
  data: {
    arrays:[]
  },
 
  onLoad: function (options) {
    var that = this;
     wx.request({
      url: app.data.service_url + 'findNotices/' + '0',
      data:{},
      mathod:'GET',
      header:{
        'AUTHORIZATION' : 'Bearer  ' + app.data.token
      },
      success: function(res){
        console.log(res.data.data);
        that.setData({
          arrays : res.data.data
        });
      },
      fail:function(res){
        //关闭提示框
        that.setData({
          hidden: true
        })
      }
    }) 
  },

   /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    // 下面填写需要下拉时的函数 自己定
     var k = this
     wx.showToast({
       title: '刷新中',
       icon: 'loading',
       duration: 500
     })
     // 下拉刷新 调用onload函数
     k.onLoad()
    // 注意现在需要使用停止函数停止刷新
     wx.stopPullDownRefresh()
   },
 
 

})