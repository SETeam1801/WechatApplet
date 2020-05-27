const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    stuName:app.data.name, 
    stuId:app.data.stuID, 
    phoNum:app.data.phone,
    mailbox:app.data.mailbox, 
    deptName:'',
    clubName:'',
    myDesc:'',
    entered:true,
    organization:[],
    //department:[],
    showModal:false,
    department:{
      clubName:'QG工作室',
      clubDesc:'   \t安徽中医药大学大学生书\n画协会，由一群书画爱好者成立，初建于1984年，如今已经走过34载春秋岁月，是本校历史最悠久的社团。书协最初的创办遵循“弘扬中华书画艺术，繁荣校园传统文化，提高学子文化素质，扶持校院书画新人”的宗旨，以传承中华传统工艺—书法、绘画、剪纸等为己任',
      clubPictureUrl:[],
      dept:[{deptName:"嵌入式", deptDesc:"   安徽中医药大学大学生书画协会，由一群书画爱好者成立，初建于1984年，如今已经走过34载春秋岁月，是本校历史最悠久的社团。书协最初的创办遵循“弘扬中华书画艺术，繁荣校传统文化，提高学子文化素质，扶持校院书画新人”的宗旨，以传承中华传统工艺—书法、绘画、剪纸等为己任.", 
      status:1, recruitment:{startTime:"2015-03-06 12:00:00", endTime:"2030-03-08 12:00:00", deptId:"部门id", qq:"861245461", times:3, maxNum:10, standard:"只要单身小姐姐，只要单身小姐姐，只要单身小姐姐，只要单身小姐姐，只要单身小姐姐，只要单身小姐姐，只要单身小姐姐，", add:"只要单身小姐姐，只要单身小姐姐，只要单身小姐姐，只要单身小姐姐，只要单身小姐姐，只要单身小姐姐，只要单身小姐姐，"}},
            {deptName:"后台", deptDesc:"安徽中医药大学大学生书画协会，由一群书画爱好者成立，初建于1984年，如今已经走过34载春秋岁月，是本校历史最悠久的社团。书协最初的创办遵循“弘扬中华书画艺术，繁荣校园传统文化，提高学子文化素质，扶持校院书画新人”的宗旨，以传承中华传统工艺—书法、绘画、剪纸等为己任", 
            status:1, recruitment:{startTime:"2015-03-06 12:00:00", endTime:"2015-03-08 12:00:00", deptId:"部门id", qq:"861245461", times:2, maxNum:10, standard:"只要单身小姐姐，只要单身小姐姐，只要单身小姐姐，只要单身小姐姐，只要单身小姐姐，只要单身小姐姐，只要单身小姐姐，", add:"只要单身小姐姐，只要单身小姐姐，只要单身小姐姐，只要单身小姐姐，只要单身小姐姐，只要单身小姐姐，只要单身小姐姐，"}},
            {deptName:"前端", deptDesc:"安徽中医药大学大学生书画协会，由一群书画爱好者成立，初建于1984年，如今已经走过34载春秋岁月，是本校历史最悠久的社团。书协最初的创办遵循“弘扬中华书画艺术，繁荣校园传统文化，提高学子文化素质，扶持校院书画新人”的宗旨，以传承中华传统工艺—书法、绘画、剪纸等为己任", 
            status:0, recruitment:{startTime:"2015-03-06 12:00:00", endTime:"2015-03-08 12:00:00", deptId:"部门id", qq:"861245461", times:2, maxNum:10, standard:"只要单身小姐姐，只要单身小姐姐，只要单身小姐姐，只要单身小姐姐，只要单身小姐姐，只要单身小姐姐，只要单身小姐姐，", add:"只要单身小姐姐，只要单身小姐姐，只要单身小姐姐，只要单身小姐姐，只要单身小姐姐，只要单身小姐姐，只要单身小姐姐，"}},
            {deptName:"图形组", deptDesc:"安徽中医药大学大学生书画协会，由一群书画爱好者成立，初建于1984年，如今已经走过34载春秋岁月，是本校历史最悠久的社团。书协最初的创办遵循“弘扬中华书画艺术，繁荣校园传统文化，提高学子文化素质，扶持校院书画新人”的宗旨，以传承中华传统工艺—书法、绘画、剪纸等为己任", 
            status:1, recruitment:{startTime:"2030-03-06 12:00:00", endTime:"2031-03-08 12:00:00", deptId:"部门id", qq:"861245461", times:2, maxNum:10, standard:"只要单身小姐姐，只要单身小姐姐，只要单身小姐姐，只要单身小姐姐，只要单身小姐姐，只要单身小姐姐，只要单身小姐姐，", add:"只要单身小姐姐，只要单身小姐姐，只要单身小姐姐，只要单身小姐姐，只要单身小姐姐，只要单身小姐姐，只要单身小姐姐，"}}]
    }
  },
  show_club(){
    let that = this;
    wx.request({
      url: app.data.service_url + 'showClub/' + that.data.organization.clubId + '/',
      header: {
        'AUTHORIZATION':'Bearer ' + app.data.token,
      },
      method: 'GET',
      success(res) 
      {
        if(res.data.code == 100)
        {
          //that.data.department = res.data.data
          that.data.department.clubPictureUrl = res.data.data.clubPictureUrl
          that.setData({department:that.data.department});
        }
       },
       fail()
       {
        
       }
     });
   },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.organization = JSON.parse(options.organization)
    console.log(this.data.organization)
    wx.setNavigationBarTitle({
      title: this.data.organization.clubName
    })
    this.setData({clubName:this.data.organization.clubName})
    this.show_club()
    if(this.data.organization.entered == undefined)
      this.data.entered = false;
    else
      this.data.entered = true;
  },
  sign_up_post:function(deptId)
  {
    let that = this;
    wx.showToast({
      title: "提交中",
      icon:'loading',
      duration: 2000
    })
    wx.request({
      url: app.data.service_url + 'applyClub/' ,
      header: {
        'content-type':'application/json',
        'AUTHORIZATION':'Bearer ' + app.data.token,
      },
      data:{
        clubId:that.data.organization.clubId,
        deptId:deptId, 
        stuName:app.data.name, 
        stuId:app.data.stuID, 
        phoNum:app.data.phone,
        mailbox:app.data.mailbox, 
        stuDesc:that.data.myDesc
      },
      method: 'POST',
      success(res) 
      {
        if(res.data.code == 100)
        {
          this.setData({showModal:false})
          wx.showToast({
            title: "报名成功",
            icon:"success",
            duration: 2000
          })
        }
        else
        {
          if(res.data.message != undefined)
            wx.showToast({
              title:res.data.message + ",报名失败",
              icon:'none',
              duration: 2000
            })
          else
          {
            wx.showToast({
              title: "服务器出现问题,报名失败",
              icon:'none',
              duration: 2000
            })
          }
        }
       },
       fail()
       {
        wx.showToast({
          title: "网络出现问题,报名失败",
          icon:'none',
          duration: 2000
        })
       }
     });
  },
  sign_up:function(e)
  {
    console.log(e)
    let curTime = new Date()
    let finTime = new Date(e.currentTarget.dataset.organization.endTime)
    let staTime = new Date(e.currentTarget.dataset.organization.startTime)
    if(curTime < staTime)
      wx.showToast({
        title: "报名未开始",
        icon:'none',
        duration: 2000
      })
    else
      if(curTime > finTime)
        wx.showToast({
          title: "报名已截止",
          icon:'none',
          duration: 2000
        })
      else
      {
        this.setData({deptId:e.currentTarget.dataset.organization.deptId,deptName:e.currentTarget.dataset.deptname,showModal:true})
      }
  },
  submit:function()
  {
    this.sign_up_post(this.data.deptId);
  },
  cancel:function()
  {
    this.setData({showModal:false})
  },
  getWords:function(e)
  {
    this.data.myDesc = e.detail.value;
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