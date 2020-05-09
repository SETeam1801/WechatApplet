const app = getApp()

Page({
	data: {
	name :app.data.name,
	tempFilePaths:'https://img.yzcdn.cn/vant/cat.jpeg',
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
	},
  onChange(event) {
		// event.detail 为当前输入的值
		app.data.name = event.detail,
    console.log(app.data.name);
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
			url: 'second/personalinformation'
		})
	},
	gotonext4(){
		wx.navigateTo({
			url: 'second/feedback'
		})
	},
	gotonext5(){
		wx.navigateTo({
			url: 'second/about'
		})
	},
	changeData: function(path,changename){
		this.setData({
			tempFilePaths: path,
			name:changename
		})
 }

})
