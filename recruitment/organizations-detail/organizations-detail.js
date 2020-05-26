const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    entered:true,
    organization:[],
    //department:[],

    department:{
      clubName:'QG工作室',
      clubDesc:'   安徽中医药大学大学生书\n画协会，由一群书画爱好者成立，初建于1984年，如今已经走过34载春秋岁月，是本校历史最悠久的社团。书协最初的创办遵循“弘扬中华书画艺术，繁荣校园传统文化，提高学子文化素质，扶持校院书画新人”的宗旨，以传承中华传统工艺—书法、绘画、剪纸等为己任',
      clubPictureUrl:[],
      dept:[{deptName:"嵌入式", deptDesc:"安徽中医药大学大学生书画协会，由一群书画爱好者成立，初建于1984年，如今已经走过34载春秋岁月，是本校历史最悠久的社团。书协最初的创办遵循“弘扬中华书画艺术，繁荣校传统文化，提高学子文化素质，扶持校院书画新人”的宗旨，以传承中华传统工艺—书法、绘画、剪纸等为己任.", 
      status:1, recruitment:{startTime:"2015-03-06 12:00:00", endTime:"2015-03-08 12:00:00", deptId:"部门id", qq:"861245461", times:3, maxNum:10, standard:"只要单身小姐姐，只要单身小姐姐，只要单身小姐姐，只要单身小姐姐，只要单身小姐姐，只要单身小姐姐，只要单身小姐姐，", add:"只要单身小姐姐，只要单身小姐姐，只要单身小姐姐，只要单身小姐姐，只要单身小姐姐，只要单身小姐姐，只要单身小姐姐，"}},
            {deptName:"后台", deptDesc:"安徽中医药大学大学生书画协会，由一群书画爱好者成立，初建于1984年，如今已经走过34载春秋岁月，是本校历史最悠久的社团。书协最初的创办遵循“弘扬中华书画艺术，繁荣校园传统文化，提高学子文化素质，扶持校院书画新人”的宗旨，以传承中华传统工艺—书法、绘画、剪纸等为己任", 
            status:1, recruitment:{startTime:"2015-03-06 12:00:00", endTime:"2015-03-08 12:00:00", deptId:"部门id", qq:"861245461", times:2, maxNum:10, standard:"只要单身小姐姐，只要单身小姐姐，只要单身小姐姐，只要单身小姐姐，只要单身小姐姐，只要单身小姐姐，只要单身小姐姐，", add:"只要单身小姐姐，只要单身小姐姐，只要单身小姐姐，只要单身小姐姐，只要单身小姐姐，只要单身小姐姐，只要单身小姐姐，"}},
            {deptName:"前端", deptDesc:"安徽中医药大学大学生书画协会，由一群书画爱好者成立，初建于1984年，如今已经走过34载春秋岁月，是本校历史最悠久的社团。书协最初的创办遵循“弘扬中华书画艺术，繁荣校园传统文化，提高学子文化素质，扶持校院书画新人”的宗旨，以传承中华传统工艺—书法、绘画、剪纸等为己任", 
            status:0, recruitment:{startTime:"2015-03-06 12:00:00", endTime:"2015-03-08 12:00:00", deptId:"部门id", qq:"861245461", times:2, maxNum:10, standard:"只要单身小姐姐，只要单身小姐姐，只要单身小姐姐，只要单身小姐姐，只要单身小姐姐，只要单身小姐姐，只要单身小姐姐，", add:"只要单身小姐姐，只要单身小姐姐，只要单身小姐姐，只要单身小姐姐，只要单身小姐姐，只要单身小姐姐，只要单身小姐姐，"}},
            {deptName:"图形组", deptDesc:"安徽中医药大学大学生书画协会，由一群书画爱好者成立，初建于1984年，如今已经走过34载春秋岁月，是本校历史最悠久的社团。书协最初的创办遵循“弘扬中华书画艺术，繁荣校园传统文化，提高学子文化素质，扶持校院书画新人”的宗旨，以传承中华传统工艺—书法、绘画、剪纸等为己任", 
            status:1, recruitment:{startTime:"2015-03-06 12:00:00", endTime:"2015-03-08 12:00:00", deptId:"部门id", qq:"861245461", times:2, maxNum:10, standard:"只要单身小姐姐，只要单身小姐姐，只要单身小姐姐，只要单身小姐姐，只要单身小姐姐，只要单身小姐姐，只要单身小姐姐，", add:"只要单身小姐姐，只要单身小姐姐，只要单身小姐姐，只要单身小姐姐，只要单身小姐姐，只要单身小姐姐，只要单身小姐姐，"}}]
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
    this.show_club()
    if(this.data.organization.entered == undefined)
      this.data.entered = false;
    else
      this.data.entered = true;
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