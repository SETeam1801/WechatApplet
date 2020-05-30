const app = getApp()
Component({
	data: {
		active: 0,
		
		icon: {
			normal_first:  '',
			active_first:  '',
      normal_second: '',
			active_second: ''
		},
		list: [
			{
				url: '/index/index',
				url2: '/index/index'
			},
			{
				url: '/index/index2',
				url2: '/index/index3'
			},
		],
		name : ''
	},

	methods: {
		onChange(event) {
			var that = this;
			this.setData({ active: event.detail });
			if(event.detail == 1)
			{
				if(app.data.log_on == false)
				wx.switchTab({
					url: this.data.list[event.detail].url2
				})
				else
				wx.switchTab({
					url: this.data.list[event.detail].url
				})
			}
			else
			{
				wx.switchTab({
					url: this.data.list[event.detail].url
				})
			}
				
		},

		init() {
			const page = getCurrentPages().pop();
			this.setData({
				active: this.data.list.findIndex(item => (item.url === `/${page.route}` || item.url2 === `/${page.route}`))
			});
		}
	},
});
