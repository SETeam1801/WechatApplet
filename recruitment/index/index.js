const app = getApp()
var systemInfo = wx.getSystemInfoSync();
Page({
  data: {
    token:'',
    school:'',
    topNumEntered:0,
    topNumFind:0,
    searchMassage:'',
    nextPage:0,
    organizations_entered:[],
    loadingEn:false,
    loadingFailedEn:false,
    loadingSuccess:false,
    organizations_find:[],
    //发现页数据是否加载完
    noMore: false,
    //发现页加载中
    loading: false,
	  //发现页数据是否加载失败
    loadingFailed: false,
  },
	onShow() {
    this.getTabBar().init();
    this.setData({topNumFind: 0,topNumEntered:0});
    if(this.data.token != app.data.token || this.data.school != app.data.school)
    {
      this.search('');
      this.entered_page_post();
      this.data.token = app.data.token;
    }
	},
  organizations_details(e)
  {
    //url在转换为JSON字符串时会出错，所以这个链接去掉
    e.currentTarget.dataset.organization.clubPictureUrl = '' 
    wx.navigateTo({
			url: '/organizations-detail/organizations-detail?organization='+ JSON.stringify(e.currentTarget.dataset.organization)
		})
  },
  getScrollEntered(e)
  {
    console.log(e.detail.scrollTop)
    if(e.detail.scrollTop < -100 && this.data.loadingEn == false && this.data.loadingSuccess == false && this.data.loadingFailedEn == false)
    {
      this.entered_page_post();
    }
  },
  entered_page_post(){
    this.data.organizations_entered = [];
    this.setData({
      loadingEn: true,
      loadingSuccess: false,
      loadingFailedEn:false,
      organizations_entered:this.data.organizations_entered
    })
    let that = this;
    wx.request({
      url: app.data.service_url + 'enteredPage/',
      header: {
        'AUTHORIZATION':'Bearer ' + app.data.token,
      },
      method: 'GET',
      success(res) 
      {
        if(res.data.code == 100)
        {
          that.data.organizations_entered = res.data.data;
          that.setData({organizations_entered:that.data.organizations_entered, loadingEn: false, loadingSuccess: true, loadingFailedEn:false,});
          setTimeout(function () {
            that.setData({
              loadingEn: false, 
              loadingSuccess: false, 
              loadingFailedEn:false,
            })
          }, 2000);
        }
         else
         {
          that.setData({
            loadingEn: false, 
            loadingSuccess: false, 
            loadingFailedEn:true,
          })
          setTimeout(function () {
            that.setData({
              loadingEn: false, 
              loadingSuccess: false, 
              loadingFailedEn:false,
            })
          }, 2000);
         }
       },
       fail()
       {
        that.setData({
          loadingEn: false, 
          loadingSuccess: false, 
          loadingFailedEn:true,
        })
        setTimeout(function () {
          that.setData({
            loadingEn: false, 
            loadingSuccess: false, 
            loadingFailedEn:false,
          })
        }, 2000);
       }
     });
   },
  search(e)
  {
    this.data.searchMassage = (e.detail == undefined ? '' : e.detail.value);
    this.data.nextPage = 0;
    this.data.organizations_find = [];
    this.setData({organizations_find:this.data.organizations_find});
    this.find_page_post();
  },
  find_page_post(){
    this.setData({
      loading: true,
      noMore:false,
      loadingFailed:false
    })
     let that = this;
     wx.request({
       url: app.data.service_url + 'findClubs/',
       header: {
        'AUTHORIZATION':'Bearer ' + app.data.token,
         'content-type':'application/json'
         //'AUTHORIZATION':'Bearer ' + app.data.token
       },
       data: {
        find:that.data.searchMassage,
        leaft:that.data.nextPage //第几页社团
       },
       method: 'POST',
       success(res) 
       {
         if(res.data.code == 100)
         {
            that.data.organizations_find = that.data.organizations_find.concat(res.data.data);
            that.setData({organizations_find:that.data.organizations_find});
            if(res.data.lastPage == true)
            {
              that.setData({
                loading: false,
                noMore:true,
                loadingFailed:false
              });
            }
            else
            {
              that.setData({
                loading: false,
                noMore:false,
                loadingFailed:false
              });
              that.data.nextPage++;
            }
         }
         else
         {
          that.setData({
            loading: false,
            noMore:false,
            loadingFailed:true
          })
         }
       },
       fail()
       {
        that.setData({
          loading: false,
          noMore:false,
          loadingFailed:true
        })
       }
     });
   },
  getScrollFind(e)
  {
    if(!this.data.noMore && !this.data.loading)
    {
      if(e.detail.scrollHeight - e.detail.scrollTop < systemInfo.windowHeight * 2)
      {
        this.find_page_post();
      }
    }
  },

  gotonext6()
  {
    var i = 0;
    for(i=0; i < 10; i++)
    this.data.organizations_find = this.data.organizations_find.concat([{clubId:this.data.organizations_find.length, clubDesc:'全国只有50支，广东省只有两支--QG工作室'}]);
    this.setData({organizations_find:this.data.organizations_find});
    this.setData({
      loading: true,
    })
  },


})
