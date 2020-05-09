const app = getApp()

Page({
  data: {
    value:app.data.name,
    must:true
    
  },

	onShow() {
		this.getTabBar().init();
	},

  onLoad: function () {
    
  },
  onUnload: function () {
    console.log('1out');
  },


})
