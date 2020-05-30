const app = getApp()

Page({
	data: {
		value:app.data.log_on,
		select:"/painting/not-logon-0.jpg"
	},

	onShow() {
		this.getTabBar().init();
	},

	onLoad: function () {

	},
	log_on()
	{
		wx.navigateTo({
			url: '/log-on/log-on'
		})
	},
	register()
	{
		wx.navigateTo({
			url: '/register/register'
		})
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
