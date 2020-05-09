// index/second/feedback.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: '',
    // 最大字符数
    maxTextLen: 999,
    // 默认长度
    textLen: 0
  },
  getWords(e) {
    let page = this;
    // 设置最大字符串长度(为-1时,则不限制)
    let maxTextLen = page.data.maxTextLen;
    // 文本长度
    let textLen = e.detail.value.length;

    page.setData({
      maxTextLen: maxTextLen,
      textLen: textLen
    });
  },
  get(e){
    this.value=e.detail.value;
  }
})