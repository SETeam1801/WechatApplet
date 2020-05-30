// index/second/about.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    text:"您好：\n  首先非常感谢您使用本社团招新小程序！\n  本小程序由6名来自计算机学院软件工程专业的2018级学生以及1名技术顾问共同开发完成。\n  在软件工程的课程学习之余，我们开发了招新通这一微信小程序，来消化吸收我们在课堂上学习的知识。\n  同时，我们也希望本小程序能够为广大社团、学生组织以及大一新生提供一个好用、便捷的招新平台，从而大大简化招新的流程。\n  希望我们的小程序能够让你真正感觉到科技改变生活！",
    tail:"招新通项目开发团队 2020.5.28"
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