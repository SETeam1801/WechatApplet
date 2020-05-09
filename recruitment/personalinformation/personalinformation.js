// index/second/personalinformation.js
const App=getApp();
var prePage='';
Page({
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
    myclass:App.data.myclass,
    phone:App.data.phone,
    mailbox:App.data.mailbox,
    must:false,
    readonly:true,
    modify:false,
    buttonname:'修改',
    showsavebutton:false
  },

  onLoad: function (options) {
    this.getprepage();
    console.log('1');
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
    if(this.data.must==false)
    {
      var _this = this;
      wx.chooseImage({
        count: 1, // 默认9 
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有 
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有 
        success: function (res) {
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片 
          _this.setData({
            tempFilePaths: res.tempFilePaths
          });
          
        }
      })
    }
  },
  choose(){
    console.log('1');
    if(this.data.must == false)
    {
      console.log('2');
      this.setData({
        buttonname:'取消',
        must:true,
        readonly:false,
        modify:true,
        showsavebutton:true
      });
      
    }
    else
    {console.log('3');
      this.setData({
        buttonname:'修改',
        must:false,
        readonly:true,
        modify:false,
        showsavebutton:false
      });
    }
  },
  savedata()
  {
      this.setData({
        buttonname:'修改',
        must:false,
        readonly:true,
        modify:false,
        showsavebutton:false
      });
      App.data.name= name;
      App.data.school=school;
      App.data.college=college;
      App.data.myclass=myclass;
      App.data.phone=phone;
      App.data.mailbox=mailbox;
      prePage.changeData(this.tempFilePaths, App.data.name);
  }
})