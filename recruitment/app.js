App({
  data:{
    enteredRefresh:true,
    findRefresh:true,
    token:'001',
    service_url:'https://re.boycharse.top/clubRecruitment/studentSide/' ,
    log_on:false,
    tempFilePaths:'',
    name:'',
    school:'',
    college:'',
    myclass:'',
    stuID:'',
    phone:'',
    mailbox:'',
  },
  writeMessage()
  {
    var message = {
      token:this.data.token,
      log_on:this.data.log_on,
      tempFilePaths:this.data.tempFilePaths,
      name:this.data.name,
      school:this.data.school,
      college:this.data.college,
      myclass:this.data.myclass,
      stuID:this.data.stuID,
      phone:this.data.phone,
      mailbox:this.data.mailbox,
    }
    wx.setStorageSync('message',   message)
  },
  onLaunch: function () {
    
  },

})
