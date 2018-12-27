// pages/index/index.js
Page({
    data: {
        num1: '',
        num2: '',
        sum: ''
    },
    getData(){
        const self = this;
        wx.showToast({
            title: '计算中'
        })
        wx.cloud.init()
        wx.cloud.callFunction({
            name: 'add',
            data: {
                a: self.data.num1,
                b: self.data.num2
            },
            success(res) {
                console.log(res);
                wx.hideToast({})
                self.setData({
                    sum: res.result.sum
                })
            },
            fail(err) {
                console.log(err);
            }
        })
    },
    handleInput1(e){
        this.setData({
            num1: e.detail.value
        })
    },
    handleInput2(e){
        this.setData({
            num2: e.detail.value
        })
    }
})