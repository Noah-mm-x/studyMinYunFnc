// pages/index/index.js
Page({
    data: {
        num1: '',
        num2: '',
        sum: ''
    },
    onShow(){
        wx.cloud.init()
    },
    handleCal(){
        const self = this;
        wx.showToast({
            title: '计算中'
        })
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
    getData(){
        const self = this;
        wx.showToast({
            title: '插入中'
        })
        wx.cloud.callFunction({
            name: 'users',
            data: {
            },
            success(res) {
                console.log(111,res.result.data);
                wx.hideToast({})
            },
            fail(err) {
                console.log(err);
            }
        })
        // const db = wx.cloud.database()
        // db.collection("users").add({
        //     // data 字段表示需新增的 JSON 数据
        //     data: {
        //         name: '张三',
        //         age: 18,
        //         genre: 'male'
        //     },
        //     success(res) {
        //         // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
        //         console.log(res);
        //     },
        //     fail(err) {
        //         console.log(err);
        //     }
        // })
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