App({
  data:{
    log_on:true,
    tempFilePaths:'https://img.yzcdn.cn/vant/cat.jpeg',
    name:'App.name',
    school:'App.school',
    college:'App.college',
    myclass:'App.myclass',
    phone:'App.phone',
    mailbox:'App.mailbox',
    password : ""
  },
  onLaunch: function () {

  },
  getdata(tempFilePaths1, name1, school1, college1, myclass1, phone1, mailbox1)
    {
      this.data.tempFilePaths = tempFilePaths1;
      this.data.name = name1;
      this.data.school = school1;
      this.data.college = college1;
      this.data.myclass = myclass1;
      this.data.phone = phone1;
      this.data.mailbox = mailbox1;
    }
  
})
