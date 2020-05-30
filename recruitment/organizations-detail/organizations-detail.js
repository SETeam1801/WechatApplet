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
    organization:{},
    department:{
      clubName:'加载中...',
      clubDesc:'加载中...',
      clubPictureUrl:[],
      dept:[{deptName:"加载中...", deptDesc:"加载中...", status:0}]
    },
    departmentFailed:{
      clubName:'加载失败',
      clubDesc:'加载失败',
      clubPictureUrl:[],
      dept:[{deptName:"加载失败", deptDesc:"加载失败", status:0}]
    },
    showModal:false,
  },
  addEnteredMessage()
   {
    let lenEntered = this.data.organization.entered.length;
    let lenDept = this.data.department.dept.length;
    console.log(this.data.organization.entered);
    console.log(lenEntered);
    console.log(this.data.department.dept)
    console.log(lenDept)
    for(let i = 0; i < lenEntered; i++)
    {
      for(let j = 0; j < lenDept; j++)
      {
        if(this.data.department.dept[j].status == 1 && this.data.department.dept[j].recruitment.deptId == this.data.organization.entered[i].department)
        {
          this.data.department.dept[j].entered = this.data.organization.entered[i]
        }
        
        console.log(j);
      }
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
          that.data.department = res.data.data
          if(that.data.organization.entered != undefined)
          {
            that.addEnteredMessage()
            that.data.entered = true;
          }
          that.setData({department:that.data.department});
        }
        else
        {
          that.data.department = that.data.departmentFailed;
          that.setData({department:that.data.department});
        }
       },
       fail()
       {
        that.data.department = that.data.departmentFailed;
        that.setData({department:that.data.department});
       }
     });
   },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.organization = JSON.parse(options.organization)
    wx.setNavigationBarTitle({
      title: this.data.organization.clubName
    })
    this.setData({clubName:this.data.organization.clubName,
      stuName:app.data.name, 
      stuId:app.data.stuID, 
      phoNum:app.data.phone,
      mailbox:app.data.mailbox, })
    this.show_club()
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
          that.setData({showModal:false})
          wx.showToast({
            title: "报名成功",
            icon:"success",
            duration: 2000
          })
          app.data.enteredRefresh = true;
        }
        else
        {
          if(res.data.message != undefined)
          {
            if(res.data.code == 400)
              wx.showToast({
                title:"不可重复报名",
                icon:'none',
                duration: 2000
              })
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
                  title:res.data.message + ",报名失败",
                  icon:'none',
                  duration: 2000
                })
              }
            }
          }
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
    if(app.data.log_on == false)
    {
      wx.showToast({
        title: "请先登录",
        icon:'none',
        duration: 2000
      })
      return;
    }
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
