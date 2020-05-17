// index/second/personalinformation.js
const App = getApp();
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
    stuID:'',
    phone: '',
    mailbox: '',
    nameerror: '',
    schoolerror: '',
    collegeerror: '',
    myclasserror: '',
    stuIDerror: '',
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
    this.setData
      ({
        buttonname: '修改',
        must: false,
        readonly: true,
        modify: false,
        showsavebutton: false,
        name:(App.data.name != undefined) ? App.data.name : '',
        school:(App.data.school != undefined) ? App.data.school : '',
        college: (App.data.college != undefined) ? App.data.college : '',
        myclass: (App.data.myclass != undefined) ? App.data.myclass : '',
        stuID: (App.data.stuID != undefined) ? App.data.stuID : '',
        phone: (App.data.phone != undefined) ? App.data.phone : '',
        mailbox: (App.data.mailbox != undefined) ? App.data.mailbox : '',
        tempFilePaths:(App.data.tempFilePaths != undefined)?App.data.tempFilePaths:''
      });
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
        name:(App.data.name != undefined) ? App.data.name : '',
        school:(App.data.school != undefined) ? App.data.school : '',
        college: (App.data.college != undefined) ? App.data.college : '',
        myclass: (App.data.myclass != undefined) ? App.data.myclass : '',
        stuID: (App.data.stuID != undefined) ? App.data.stuID : '',
        phone: (App.data.phone != undefined) ? App.data.phone : '',
        mailbox: (App.data.mailbox != undefined) ? App.data.mailbox : '',
        tempFilePaths:(App.data.tempFilePaths != undefined)?App.data.tempFilePaths:'',
        nameerror: '',
        schoolerror: '',
        collegeerror: '',
        myclasserror: '',
        stuIDerror: '',
        phoneerror: '',
        mailboxerror: '',
      });
  },
  savedata()
  {
    if(this.data.nameerror == '' && this.data.schoolerror == '' && this.data.collegeerror == '' && 
    this.data.myclasserror == '' && this.data.phoneerror == '' && this.data.mailboxerror == '' && this.data.stuIDerror == '')
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
      App.getdata(this.data.tempFilePaths, this.data.name, this.data.school, this.data.college, this.data.myclass, this.data.stuID, this.data.phone, this.data.mailbox)
    }
  },
  getname(e)
  {
    if(e.detail == '')
    {
      this.setData({nameerror:"请输入名字！"})
    }
    else
      this.setData({name:e.detail, nameerror:''})
  },
  getschool(e)
  {
    if(e.detail == '')
    {
      this.setData({schoolerror:"请输入学校名字！"})
    }
    else
      this.setData({school:e.detail, schoolerror:''})
  },
  getcollege(e)
  {
    if(e.detail == '')
    {
      this.setData({collegeerror:"请输入学院！"})
    }
    else
      this.setData({college:e.detail, collegeerror:''})
  },
  getmyclass(e)
  {
    if(e.detail == '')
    {
      this.setData({myclasserror:"请输入年级专业班级！"})
    }
    else
      this.setData({myclass:e.detail, myclasserror:''})
  },
  getstuID(e)
  {
    if(!(/^[0-9]{1,20}$/.test(e.detail)))
    {
      this.setData({stuIDerror:"请输入正确学号！"})
    }
    else
      this.setData({stuID:e.detail, stuIDerror:''})
  },
  getphone(e)
  {
    if(!(/^1[34578]\d{9}$/.test(e.detail))) 
    {
      this.setData({phoneerror:"请输入正确手机号码！"})
    }
    else
      this.setData({phone:e.detail, phoneerror:''});
  },
  getmailbox(e)
  {
    if (!(/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(e.detail)))
    {
      this.setData({mailboxerror:"请输入正确邮箱地址！"})
    }
    else
      this.setData({mailbox:e.detail, mailboxerror:''});
  },
})