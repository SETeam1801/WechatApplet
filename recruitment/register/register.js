const app = getApp()      
Page({

  /**
   * 页面的初始数据
   */
  data: {
    service_url:app.data.service_url,
    tempFilePaths: app.data.tempFilePaths,
    name: '',
    school: '',
    college: '',
    myclass: '',
    stuID:'',
    phone: '',
    mailbox: '',
    password1:'',//密码
    password2:'',//重复密码

    nameerror: '',
    schoolerror: '',
    collegeerror: '',
    myclasserror: '',
    stuIDerror:'',
    phoneerror: '',
    mailboxerror: '',
    password1error:'',
    password2error:'',
    
    must: true,
    readonly: false,
    modify: true,
  },
  uploadpicture()
  {
    let that = this;
    wx.uploadFile({
      url: that.data.service_url + 'uploadAvatar/',
      header: 
      {
        'AUTHORIZATION':'Bearer ' + app.data.token,
        "Content-Type": "multipart/form-data",
      }, // 
      filePath:that.data.tempFilePaths,
      name:'img',
      success: function(res)
      {
        let mess = JSON.parse(res.data)
        if(mess.code == 100)
        {
          app.data.tempFilePaths = mess.url;
          app.writeMessage();
        }
        else
        {
          wx.showToast({
            title: mess.message,
            icon:'none'
          })
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
  register_post(){
    let that = this; 
    wx.showToast({
      title: '正在提交注册信息！',
      icon:'none'
    })
    wx.request({
      url: that.data.service_url + 'register/',
      header: {
        'content-type': 'application/json'
      },
      data: {
        class: that.data.myclass,
        college: that.data.college,
        mailbox: that.data.mailbox,
        passWord: that.data.password1,
        phoNum: that.data.phone,
        school:  that.data.school,
        stuId: that.data.stuID,
        userName: that.data.name,
      },
      method: 'POST',
      success(res) {
        if(res.data.code == 100)
        {
          app.data.token = res.data.data.token;
          app.data.log_on = true;
          app.data.name = that.data.name;
          app.data.school = that.data.school;
          app.data.college =that.data.college;
          app.data.myclass = that.data.myclass;
          app.data.stuID = that.data.stuID;
          app.data.phone = that.data.phone;
          app.data.mailbox = that.data.mailbox;
          app.data.enteredRefresh = true;
          app.data.findRefresh = true;
          if(that.data.tempFilePaths != undefined && that.data.tempFilePaths != '' && that.data.tempFilePaths != app.data.tempFilePaths)
            that.uploadpicture();
          wx.showToast({
            title: '注册成功！',
              icon:'none'
          })
          app.writeMessage();
          setTimeout(function () {
            wx.switchTab({
              url: '/index/index'
            })
          }, 1000);
        }
        else
        {
          wx.showToast({
            title: res.data.message,
            icon:'none'
          })
        }
      },
      fail()
      {
        wx.showToast({
          title: '网络出现问题,注册失败！',
          icon:'none'
        })
      }
    });
  },
  register_post_button()
  {
    var judge = true;
    if(this.data.nameerror == '' && this.data.schoolerror == '' && this.data.collegeerror == '' && 
    this.data.myclasserror == '' && this.data.stuIDerror == '' && 
    this.data.phoneerror == '' && this.data.mailboxerror == '' && this.data.password1error == '',
    this.data.password2error == '')
    {
      if(this.data.name == '')
      {
        judge = false;
        this.setData({nameerror:"请输入名字！"})
      }
      if(this.data.school == '')
      {
        judge = false;
        this.setData({schoolerror:"请输入学校名字！"})
      }
      if(this.data.college == '')
      {
        judge = false;
        this.setData({collegeerror:"请输入学院！"})
      }
      if(this.data.myclass == '')
      {
        judge = false;
        this.setData({myclasserror:"请输入年级专业班级！"})
      }
      if(!(/^[0-9]{1,20}$/.test(this.data.stuID)))
      {
        judge = false;
        this.setData({stuIDerror:"请输入正确学号！"})
      }
      if(!(/^1[34578]\d{9}$/.test(this.data.phone))) 
      {
        judge = false;
        this.setData({phoneerror:"请输入正确手机号码！"})
      }
      if (!(/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(this.data.mailbox)))
      {
        judge = false;
        this.setData({mailboxerror:"请输入正确邮箱地址！"})
      }
      if (!(/^[0-9A-Za-z]{6,16}$/.test(this.data.password1)))
      {
        judge = false;
        this.setData({password1error:"请输入正确的密码！"})
      }
      if (this.data.password2 != this.data.password1 || this.data.password2 == '')
      {
        judge = false;
        if ('' != this.data.password1error)
          this.setData({password2error:"请输入正确密码！"})
        else
          this.setData({password2error:"两次密码不一致！"})
      }
      if(judge == false)
        return;
      this.register_post();
      /*App.getdata(this.data.tempFilePaths, this.data.name, this.data.school, this.data.college, this.data.myclass, this.data.phone, this.data.mailbox)
      prePage.changeData(this.data.tempFilePaths, this.data.name);*/
    }
  },
  chooseimage()
  {
    wx.navigateTo({
      url: '/cut-picture/cut-picture'
    })
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
  getpassword1(e)
  {
    if (!(/^[0-9A-Za-z]{6,16}$/.test(e.detail)))
    {
      this.setData({password1error:"请输入正确的密码！"})
    }
    else
      this.setData({password1:e.detail, password1error:''});
  },
  getpassword2(e)
  {
    if (e.detail != this.data.password1)
    {
      if ('' != this.data.password1error)
        this.setData({password2error:"请输入正确密码！"})
      else
        this.setData({password2error:"两次密码不一致！"})
    }
    else
      this.setData({password2:e.detail, password2error:''});
  },
  
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    if (res.from === 'button') {}
    return {
      title: '转发',
      path: '/pages/index/index',
      success: function(res) {}
    }
  }
})