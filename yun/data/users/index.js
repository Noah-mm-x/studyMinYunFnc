// 云函数入口文件
const cloud = require("wx-server-sdk");

cloud.init({
    env: "test-ab9fdd",
    traceUser: true
});
const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
    // 查询操作
    // const param = event.param;
    // const val = event.val;
    // try {
    //     return await db.collection("users").where({
    //         [param]: val,
    //     }).get(res=>{
    //         console.log(111,res);
    //     }).catch(err=>{
    //         console.log(222,err);
    //     });
    // } catch (err) {
    //     console.log('err',err);
    // }
    // return {
    //     event,
    // };

    // 插入操作
    const {name,age,genre} = event;
    if(!name){
        return {
            code: 0
        }
    }
    if(!age){
        return {
            code: 0
        }
    }
    if(!genre){
        return {
            code: 0
        }
    }
    try {
        return await db.collection("users").add({
            data:{
                name: name,
                age: age,
                genre: genre,
            }
        }).catch(err=>{
            console.log(222,err);
        });
    } catch (err) {
        console.log('err',err);
    }
    return {
        code: 1,
        event,
    };
};
