App({
  data:{
    token:'',
    service_url:'http://nomalocaris.top:8888/clubRecruitment/studentSide/' ,
    log_on:true,
    tempFilePaths:'/painting/logo.jpg',
    name:'App.name',
    school:'App.school',
    college:'App.college',
    myclass:'App.myclass',
    stuID:'',
    phone:'App.phone',
    mailbox:'App.mailbox',
  },
  onLaunch: function () {

  },
  getdata(tempFilePaths1, name1, school1, college1, myclass1, stuID1, phone1, mailbox1)
    {
      this.data.tempFilePaths = tempFilePaths1;
      this.data.name = name1;
      this.data.school = school1;
      this.data.college = college1;
      this.data.myclass = myclass1;
      this.data.stuID = stuID1;
      this.data.phone = phone1;
      this.data.mailbox = mailbox1;
    }
  
})
