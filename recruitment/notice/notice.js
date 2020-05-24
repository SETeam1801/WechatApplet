// index/second/notice.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arrays:[],
    title1:'关于新版校园网主页上线测试的通知',
    text1:'各单位、部门：\n  根据学校工作安排，经过深入调研、专题研究、策划制作和反复调试，已对我校校园网主页进行了全新改版。为确保新版校园网主页正式上线运行平稳，现将新版主页上线测试（校园网用户测试网址：http://gduttest.gdut.edu.cn/），请大家试用并于5月25日12:00前反馈宝贵意见。\n  联系人：卢迪，电话：39322041，邮箱: 164249467@qq.com',
    organ1:'党委宣传部',
    date1:'2020/5/22'
  },

  onLoad: function (options) {
     wx.request({
      url: 'http://ip/clubRecruitment/studentSide/findNotices/',
      data:{
        
      },
      mathod:'POST',
      header:{
        'content-Type': 'application/json'
      },
      success: function(res){
        //如果成功的话
        that.setData({
          data: res.data,
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