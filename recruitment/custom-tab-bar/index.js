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
				text: 'first',
				url: '/index/index'

			},
			{
				text: 'second',
				url: '/index/index2'
			}
		],
		name : ''
	},

	methods: {
		onChange(event) {
			this.setData({ active: event.detail });
			wx.switchTab({
				url: this.data.list[event.detail].url
			});
		},

		init() {
			const page = getCurrentPages().pop();
			this.setData({
				active: this.data.list.findIndex(item => item.url === `/${page.route}`)
			});
		}
	}
});
