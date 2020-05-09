const app = getApp()

Page({
  data: {
    name:app.data.name,
    must:true,
    shareshow:false
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
