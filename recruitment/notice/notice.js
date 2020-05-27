// index/second/notice.js
const app = getApp()
Page({
  i : '0',  
  /**
   * 页面的初始数据
   */
  data: {
    arrays:[],
    loadarrays:[]
  },
 
  onLoad: function (options) {
    var that = this;
     wx.request({
      url: app.data.service_url + 'findNotices/' + that.i,
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
        that.i++;
        console.log(that.i)
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
     var k = this
     wx.showToast({
       title: '玩命加载中……',
       icon: 'loading',
       duration: 500
     })
    // 下拉刷新 调用onload函数
    k.i = '0'
    this.reload()
    // 注意现在需要使用停止函数停止刷新
    // wx.stopPullDownRefresh()
  },
 
  reload:function(){
    var that = this;
     wx.request({
      url: app.data.service_url + 'findNotices/' + that.i,
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
        that.i++;
        console.log(that.i)
      },
      fail:function(res){
        //关闭提示框
        that.setData({
          hidden: true
        })
      }
    }) 
  },

  loadList:function(){
    var that = this;
    wx.request({
      url: app.data.service_url + 'findNotices/' + that.i,
      data:{},
      mathod:'GET',
      header:{
        'AUTHORIZATION' : 'Bearer  ' + app.data.token
      },
      success: function (res){
        var loadData = that.data.arrays;
        for (var i = 0; i < res.data.length; i++){
          loadData.push(res.data[i]);
        }
        that.i++;
        that.setData({
          arrays: loadData
        })
        console.log(that.i);
      },
    })
  },

  onReachBottom : function(){
     this.loadList();
  }
 

})