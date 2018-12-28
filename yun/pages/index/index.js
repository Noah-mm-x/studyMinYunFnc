// pages/index/index.js
Page({
    data: {
        num1: "",
        num2: "",
        sum: "",
        queryWayList: [
            {
                name: "名字",
                param: "name"
            },
            {
                name: "年龄",
                param: "age"
            },
            {
                name: "性别",
                param: "genre"
            }
        ],
        currentWayObj: {
            name: "名字",
            param: "name"
        },
        queryVal: "",
        resultList: [],
        userList: []
    },
    onShow() {
        wx.cloud.init();
    },
    handleCal() {
        const self = this;
        wx.showToast({
            title: "计算中"
        });
        wx.cloud.callFunction({
            name: "add",
            data: {
                a: self.data.num1,
                b: self.data.num2
            },
            success(res) {
                console.log(res);
                wx.hideToast({});
                self.setData({
                    sum: res.result.sum
                });
            },
            fail(err) {
                console.log(err);
            }
        });
    },
    getData() {
        const queryVal = this.data.queryVal;
        this.setData({
            userList: []
        })
        if (!queryVal) {
            wx.showToast({
                title: "不能为空",
                icon: "none"
            });
            return false;
        }
        const self = this;
        wx.showToast({
            none: 'none',
            title: "正在查询"
        });
        wx.cloud.callFunction({
            name: "users",
            data: {
                param: self.data.currentWayObj.param,
                val: queryVal
            },
            success(res) {
                const data = res.result.data;
                if (!data.length) {
                    wx.showToast({
                        none: 'none',
                        title: "暂无数据"
                    });
                } else {
                    self.setData({
                        userList: res.result.data
                    });
                }

                console.log(111, res.result.data);
            },
            fail(err) {
                console.log(err);
            }
        });
    },
    handleInput1(e) {
        this.setData({
            num1: e.detail.value
        });
    },
    handleInput2(e) {
        this.setData({
            num2: e.detail.value
        });
    },
    handleTypePick(e) {
        const index = e.detail.value;
        let obj = {};
        obj.name = this.data.queryWayList[index].name;
        obj.param = this.data.queryWayList[index].param;
        this.setData({
            currentWayObj: obj
        });
    },
    handleQueryInput(e) {
        this.setData({
            queryVal: e.detail.value
        });
    }
});
