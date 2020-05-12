// register/register.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    service_url:'',
    post:
    {
      userName:"",//用户名
      stuID:"", //学号
      school:"", //学校
      college: '',//学院
      myclass: '',//年级专业班级
      phoneNum:"", //电话号码
      mailbox:'',//邮箱
      password:''//密码
    },
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
    password1:'',//密码
    password2:'',//重复密码

    nameerror: '',
    schoolerror: '',
    collegeerror: '',
    myclasserror: '',
    phoneerror: '',
    mailboxerror: '',
    password1error:'',
    password2error:'',
    
    must: true,
    readonly: false,
    modify: true,
  },
  register_post(){
    wx.request({
      url: service_url,
      header: {
        'content-type': 'application/json'
      },
      data: {
        post
      },
      method: 'POST',
      success(res) {
        console.log(res.data)
      }
    })
  },
  register_post_button()
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
      this.data.post.userName = this.data.name;
      this.data.post.stuID = this.data.name;
      this.data.post.school = this.data.school;
      this.data.post.college = this.data.college;
      this.data.post.myclass = this.data.myclass;
      this.data.post.phoneNum = this.data.phone;
      this.data.post.mailbox = this.data.mailbox;
      this.data.post.password = this.data.password;
      register_post();
      /*App.getdata(this.data.tempFilePaths, this.data.name, this.data.school, this.data.college, this.data.myclass, this.data.phone, this.data.mailbox)
      prePage.changeData(this.data.tempFilePaths, this.data.name);*/
    }
  },
  chooseimage()
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
  getpassword1(e)
  {
    if (!(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/.test(e.detail.value)))
    {
      this.setData({mailboxerror:"请输入正确的密码！"})
    }
    else
      this.setData({mailbox:e.detail.value, mailboxerror:''});
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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