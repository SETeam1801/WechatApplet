const app = getApp()

Page({
	data: {
	log_on:false,
	name :app.data.name,
	tempFilePaths:app.data.tempFilePaths != undefined ? app.data.tempFilePaths : "",
	show: false,
	actions: [
		{
			name: '退出登录'
		}
		/*
		{
			name: '选项',
			subname: '副文本',
			openType: 'share'
		}*/
	]
	},

	onShow() {
		this.getTabBar().init();
		this.setData({
			log_on:app.data.log_on,
			name :app.data.name != undefined ? app.data.name : '登录出错',
			tempFilePaths:app.data.tempFilePaths != undefined ? app.data.tempFilePaths : ""
		});
	},
 
	onLoad: function () {
		console.log(app.data.token)
	},
	onClose() {
    this.setData({ show: false });
  },

  onSelect(event) {
		if(event.detail.name=='退出登录')
		{
			app.data.enteredRefresh = true;
			app.data.findRefresh = true;
			app.data.token = '001';
			app.data.log_on = false;
			app.data.tempFilePaths = '';
			app.data.name = '';
			app.data.school = '';
			app.data.college = '';
			app.data.myclass = '';
			app.data.stuID = '';
			app.data.phone = '';
			app.data.mailbox = '';
			wx.switchTab({
				url: '/index/index3'
			})
			app.writeMessage();
		}
	},
	toggle(type) {
    this.setData({
      [type]: !this.data[type]
    });
  },
	showActionSheet(){
		this.toggle('show');
},
	gotonext1(){
		wx.navigateTo({
			url: '/personalinformation/personalinformation'
		})
	},
	gotonext2(){
		wx.navigateTo({
			url: '/notice/notice'
		})
	},
	gotonext4(){
		wx.navigateTo({
			url: '/feedback/feedback'
		})
	},
	gotonext5(){
		wx.navigateTo({
			url: '/about/about'
		})
	},
	  //转发
		onShareAppMessage: function() {
			if (res.from === 'button') {}
			return {
				title: '转发',
				path: '/pages/index/index',
				success: function(res) {}
			}
		}
})
