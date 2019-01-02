// 云函数入口文件
const cloud = require("wx-server-sdk");

cloud.init({
    env: "test-ab9fdd",
    traceUser: true
});
const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
    // 更新操作
    const { name, age } = event;
    if (!name) {
        return {
            code: 0,
            msg: "名字不能为空"
        };
    }
    if (!age) {
        return {
            code: 0,
            msg: "年龄不能为空"
        };
    }
    try {
        let res = await db
            .collection("users")
            .where({
                name: name
            })
            .get();
        const queryResult = res && res.data;
        if (!queryResult.length) {
            return {
                code: 20,
                msg: "没有此条数据"
            };
        } else {
            await db
                .collection("users")
                .where({
                    name: name
                })
                .update({
                    data: {
                        age: age
                    }
                })
                .catch(err => {
                    console.log(222, err);
                });
            return {
                code: 1,
                msg: "ok"
            };
        }
    } catch (err) {
        console.log("err", err);
    }
};
