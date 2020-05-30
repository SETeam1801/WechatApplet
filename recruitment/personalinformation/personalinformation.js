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
    if(this.data.must == true)
      wx.navigateTo({
        url: '/cut-picture/cut-picture'
      })
  },
  choose()
  {
    if(this.data.must == false)
    {
      this.setData//此时为由不可编辑转换为可编辑状态
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
  uploadpicture()
  {
    let that = this;
    wx.uploadFile({
      url: App.data.service_url + 'uploadAvatar/',
      header: 
      {
        'AUTHORIZATION':'Bearer ' + App.data.token,
        "Content-Type": "multipart/form-data",
      }, // 
      filePath:that.data.tempFilePaths,
      name:'img',
      success: function(res)
      {
        let mess = JSON.parse(res.data)
        if(mess.code == 100)
        {
          that.setData({tempFilePaths:mess.url})
          App.data.tempFilePaths = that.data.tempFilePaths;
          app.writeMessage();
        }
        else
        {
          if(res.data.code == 110)
          {
            wx.showToast({
              title: "登录状态出现问题，请重新登陆",
              icon:'none'
            })    
          }
          else
          {
            wx.showToast({
              title: mess.message,
              icon:'none'
            })
          }
        }
      },
      fail: function(res) {
        wx.showToast({
          title: '网络出现问题,上传头像失败!',
            icon:'none'
        })
      }
    })
  },
  post_information()
  {
    let that = this; 
    wx.showToast({
      title: '正在提交修改！',
      icon:'none'
    })
    wx.request({
      url: App.data.service_url + 'changePersonalInformation/',
      header: {
        'AUTHORIZATION':'Bearer ' + App.data.token,
        'content-type': 'application/json'
      },
      data: {
        class: that.data.myclass,
        college: that.data.college,
        mailbox: that.data.mailbox,
        phoNum: that.data.phone,
        school:  that.data.school,
        stuId: that.data.stuID,
        userName: that.data.name,
      },
      method: 'POST',
      success(res) {
        if(res.data.code == 100)
        {
          wx.showToast({
            title: '修改信息成功！',
              icon:'none'
          })
          if(that.data.tempFilePaths != undefined && that.data.tempFilePaths != '' && that.data.tempFilePaths != App.data.tempFilePaths)
            that.uploadpicture();
          App.data.name = that.data.name;
          App.data.school = that.data.school;
          App.data.college = that.data.college;
          App.data.myclass = that.data.myclass;
          App.data.stuID = that.data.stuID
          App.data.phone = that.data.phone;
          App.data.mailbox = that.data.mailbox;
          App.data.enteredRefresh = true;
          App.data.findRefresh = true;
          that.setData({
            buttonname: '修改',
            must: false,
            readonly: true,
            modify: false,
            showsavebutton: false
          });
          App.writeMessage();
        }
        else
        {
          if(res.data.code == 110)
          {
            wx.showToast({
              title: "登录状态出现问题，请重新登陆",
              icon:'none'
            })    
          }
          else
          {
            that.setData({
              readonly: false,
            });
            wx.showToast({
              title: res.data.message,
              icon:'none'
            })            
          }
        }
      },
      fail()
      {
        that.setData({
          readonly: false,
        });
        wx.showToast({
          title: '网络出现问题,修改信息失败！',
          icon:'none'
        })
      }
    })
  },
  savedata()
  {
    if(this.data.nameerror == '' && this.data.schoolerror == '' && this.data.collegeerror == '' && 
    this.data.myclasserror == '' && this.data.phoneerror == '' && this.data.mailboxerror == '' && this.data.stuIDerror == '')
    {
      this.setData({
        readonly: true,
      });
      this.post_information();
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
  onShareAppMessage: function() {
    if (res.from === 'button') {}
    return {
      title: '转发',
      path: '/pages/index/index',
      success: function(res) {}
    }
  }
})