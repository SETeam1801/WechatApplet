// index/second/personalinformation.js
const App = getApp();
var prePage = '';
Page({
  data: 
  {
    show: false,
    actions: 
    [
      {
        name: '从手机相册中选择'
      }
    ],
    tempFilePaths: '',
    name: '',
    school: '',
    college: '',
    myclass: '',
    phone: '',
    mailbox: '',
    nameerror: '',
    schoolerror: '',
    collegeerror: '',
    myclasserror: '',
    phoneerror: '',
    mailboxerror: '',
    must: false,
    readonly: true,
    modify: false,
    buttonname: '修改',
    showsavebutton: false
  },

  onLoad: function (options) 
  {
    this.getprepage();
    this.setData
      ({
        buttonname: '修改',
        must: false,
        readonly: true,
        modify: false,
        showsavebutton: false,
        name:App.data.name,
        school:App.data.school,
        college:App.data.college,
        myclass:App.data.myclass,
        phone:App.data.phone,
        mailbox:App.data.mailbox,
      });
     console.log(this.data.tempFilePaths);
  },
  getprepage()
  {
    var pages = getCurrentPages();
        var Page = pages[pages.length - 1];//当前页
         if(pages.length > 1){ //说明有上一页存在
             //上一个页面实例对象
             prePage = pages[pages.length - 2];
             this.setData
             ({
              tempFilePaths: (pages[pages.length - 2]).data.tempFilePaths
            })
         }
  },
  chooseimage()
  {
    if(this.data.must==true)
    {
      var _this = this;
      wx.chooseImage
      ({
        count: 1, // 默认9 
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有 
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有 
        success: function (res) 
        {
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片 
          _this.setData({
            tempFilePaths: res.tempFilePaths
          });
          
        }
      })
    }
  },
  choose()
  {
    console.log(this.data.name);
    if(this.data.must == false)
    {
      this.setData
      ({
        buttonname:'取消',
        must:true,
        readonly:false,
        modify:true,
        showsavebutton:true
      });
      
    }
    else
      this.setData
      ({
        buttonname: '修改',
        must: false,
        readonly: true,
        modify: false,
        showsavebutton: false,
        name:App.data.name,
        school:App.data.school,
        college:App.data.college,
        myclass:App.data.myclass,
        phone:App.data.phone,
        mailbox:App.data.mailbox,
        nameerror: '',
        schoolerror: '',
        collegeerror: '',
        myclasserror: '',
        phoneerror: '',
        mailboxerror: '',
      });
  },
  savedata()
  {
    if(this.data.nameerror == '' && this.data.schoolerror == '' && this.data.collegeerror == '' && 
    this.data.myclasserror == '' && this.data.phoneerror == '' && this.data.mailboxerror == '')
    {
      this.setData({
        buttonname: '修改',
        must: false,
        readonly: true,
        modify: false,
        showsavebutton: false
      });
      /*App.data.tempFilePaths = this.data.name;
      App.data.name = this.data.name;
      App.data.school = this.data.school;
      App.data.college = this.data.college;
      App.data.myclass = this.data.myclass;
      App.data.phone = this.data.phone;
      App.data.mailbox = this.data.mailbox;*/
      App.getdata(this.data.tempFilePaths, this.data.name, this.data.school, this.data.college, this.data.myclass, this.data.phone, this.data.mailbox)
      prePage.changeData(this.data.tempFilePaths, this.data.name);
    }
  },
  getname(e)
  {
    if(e.detail.value == '')
    {
      this.setData({nameerror:"请输入名字！"})
    }
    else
      this.setData({name:e.detail.value, nameerror:''})
  },
  getschool(e)
  {
    if(e.detail.value == '')
    {
      this.setData({schoolerror:"请输入学校名字！"})
    }
    else
      this.setData({school:e.detail.value, schoolerror:''})
  },
  getcollege(e)
  {
    if(e.detail.value == '')
    {
      this.setData({collegeerror:"请输入学院！"})
    }
    else
      this.setData({college:e.detail.value, collegeerror:''})
  },
  getmyclass(e)
  {
    if(e.detail.value == '')
    {
      this.setData({myclasserror:"请输入年级专业班级！"})
    }
    else
      this.setData({myclass:e.detail.value, myclasserror:''})
  },
  getphone(e)
  {
    if(!(/^1[34578]\d{9}$/.test(e.detail.value))) 
    {
      this.setData({phoneerror:"请输入正确手机号码！"})
    }
    else
      this.setData({phone:e.detail.value, phoneerror:''});
  },
  getmailbox(e)
  {
    if (!(/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(e.detail.value)))
    {
      this.setData({mailboxerror:"请输入正确邮箱地址！"})
    }
    else
      this.setData({mailbox:e.detail.value, mailboxerror:''});
  },
})