const app = getApp()

Page({
	data: {
	log_on:false,
	name :app.data.name,
	tempFilePaths:app.data.tempFilePaths,
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
		this.setData({log_on:app.data.log_on});
	},
 
	onLoad: function () {
		
	},
	onClose() {
    this.setData({ show: false });
  },

  onSelect(event) {
		if(event.detail.name=='退出登录')
		{
			console.log('1');
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
	changeData: function(path,changename){
		this.setData({
			tempFilePaths:path,
			name:changename
		})
 }

})
