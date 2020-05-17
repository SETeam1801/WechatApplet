const app = getApp()
var systemInfo = wx.getSystemInfoSync();
var data1 = '0'
Page({
  data: {
    organizations_entered:
    [
      {organizations_id:0, organizations_title:'全国只有50支'},
      
    ],
    organizations_find:
    [
      {organizations_id:1, organizations_title:'全国只有50支'},
      {organizations_id:0, organizations_title:'全国只有全国只有全国只有全国只有全国只有全国只有'},
    ],
    // 数据是否加载完
    noMore: false,
    // 加载中
    loading: false,
	// 数据是否加载失败
    loadingFailed: false,
  },
	onShow() {
    this.getTabBar().init();
	},

  organizations_details(e)
  {
      console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
			url: '/organizations-detail/organizations-detail?id='+ e.currentTarget.dataset.id
		})
  },
  gotonext6()
  {
    var i = 0;
    for(i=0; i < 10; i++)
    this.data.organizations_find = this.data.organizations_find.concat([{organizations_id:this.data.organizations_find.length, organizations_title:'全国只有50支，广东省只有两支--QG工作室'}]);
    this.setData({organizations_find:this.data.organizations_find});
    this.setData({
      loading: false,
    })
  },
  getScroll(e)
  {
    if(!this.data.noMore && !this.data.loading)
    {
      if(e.detail.scrollHeight - e.detail.scrollTop < systemInfo.windowHeight * 2)
      {
        this.gotonext6();
      }
    }
  }
})
