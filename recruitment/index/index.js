const app = getApp()
var systemInfo = wx.getSystemInfoSync();
Page({
  data: {
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
  onLoad()
  {
    let that = this;
    app.data.enteredRefresh = false;
    app.data.findRefresh = false;
    wx.getStorage({
      key: 'message',
      success: function(res) {
        console.log(12)
        app.data.token = res.data.token,
        app.data.log_on = res.data.log_on,
        app.data.tempFilePaths = res.data.tempFilePaths,
        app.data.name = res.data.name,
        app.data.school = res.data.school,
        app.data.college = res.data.college,
        app.data.myclass = res.data.myclass,
        app.data.stuID = res.data.stuID,
        app.data.phone = res.data.phone,
        app.data.mailbox = res.data.mailbox
        that.entered_page_post();
        that.search('');
      },
      fail()
      {
        that.entered_page_post();
        that.search('');
      }
    })
  },
	onShow() {
    this.getTabBar().init();
    this.setData({topNumFind: 0,topNumEntered:0});
    if(app.data.enteredRefresh == true)
    {
      app.data.enteredRefresh = false;
      this.entered_page_post();
    }
    if(app.data.findRefresh == true)
    {
      app.data.findRefresh = false;
      this.search('');
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
          if(res.data.code == 110)
          {
            wx.showToast({
              title: "登录状态出现问题，请重新登陆",
              icon:'none'
            })    
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
          if(res.data.code == 110)
          {
            wx.showToast({
              title: "登录状态出现问题，请重新登陆",
              icon:'none'
            })    
          }
          else
          {
            that.setData({
              loading: false,
              noMore:false,
              loadingFailed:true
            })
          }
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
