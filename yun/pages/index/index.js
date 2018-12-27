// pages/index/index.js
Page({
    data: {

    },
    getData(){
        wx.cloud.init()
        wx.cloud.callFunction({
            name: 'add',
            data: {
                a: 1,
                b: 2
            },
            success(res) {
                console.log(1111,res,res.result.sum);
            },
            fail(err) {
                console.log(err);
            }
        })
    }
})