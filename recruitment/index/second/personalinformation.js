// index/second/personalinformation.js
const App=getApp();
var prePage='';
Page({

  /**
   * 页面的初始数据
   */

  data: {
    tempFilePaths :null,
    show: false,
    actions: [
      {
        name: '从手机相册中选择'
      }
    ],
    name:App.data.name,
    school:App.data.school,
    college:App.data.college,
    class:App.data.class,
    phone:App.data.phone,
    mailbox:App.data.mailbox,
    must:false,
    readonly:true
  },

  onLoad: function (options) {
    this.getprepage();
   // console.log(tempFilePaths);
  },
  getprepage(){
    var pages = getCurrentPages();
        var Page = pages[pages.length - 1];//当前页
         if(pages.length > 1){ //说明有上一页存在
             //上一个页面实例对象
             prePage = pages[pages.length - 2];
             this.setData({
              tempFilePaths: (pages[pages.length - 2]).data.tempFilePaths
            })
         }
  },
  chooseimage(){
    var _this = this;
    wx.chooseImage({
      count: 1, // 默认9 
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有 
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有 
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片 
        _this.setData({
          tempFilePaths: res.tempFilePaths
        });console.log(res.tempFilePaths);
        prePage.changeData(res.tempFilePaths);
      }
    })
  },
})