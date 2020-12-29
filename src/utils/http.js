import Vue from "vue"
import axios from "axios"
import qs from "qs"
import {erroralert} from "./alert"
// 开发环境

let baseUrl="/api"
Vue.prototype.$pre="http://localhost:3000"

//生产环境使用 打包
// let baseUrl=""
// Vue.prototype.$pre=""



//响应拦截
axios.interceptors.response.use(res=>{
    
    console.group("本次请求地址是："+res.config.url)
    console.log(res);
    console.groupEnd()
    if(res.data.code!==200){
        erroralert(res.data.msg)
    }
    if(!res.data.list){
        res.data.list=[]
    }
    return res
})

// post 带有文件，参数转换
function dataToFormData(user){
    let data=new FormData()
    for(let i in user){
        data.append(i,user[i])
    }
    return data
}

// 菜单
// 菜单添加

export const reqMenuAdd=(user)=>{
    return axios({
        url:baseUrl+"/api/menuadd",
        method:"post",
        data:qs.stringify(user)
    })
}

// 菜单列表

export let reqMenuList =()=>{
   return axios({
        url:baseUrl+"/api/menulist",
        params:{
            istree:true
        }
    })
}

export let reqMenuDel=(obj)=>{
    return axios({
        url:baseUrl+"/api/menudelete",
        method:"post",
        data:qs.stringify(obj)
    })
}

//38.一条数据
export let reqMenuDetail=(obj)=>{
    return axios({
        url:baseUrl+"/api/menuinfo",
        params:obj
    })
}

//39.修改接口
export let reqMenuUpdate=(user)=>{
    return axios({
        url:baseUrl+"/api/menuedit",
        method:"post",
        data:qs.stringify(user)
    })
}
// ********************角色管理
// 角色管理添加
export let reqRoleAdd=(user)=>{
    return axios({
        url:baseUrl+"/api/roleadd",
        method:"post",
        data:qs.stringify(user)
    })
}
// 角色列表

export let reqRoleList =(obj)=>{
    return axios({
         url:baseUrl+"/api/rolelist",
         params:obj
     })
 }

//  角色删除
export let reqRoleDel=(obj)=>{
    return axios({
        url:baseUrl+"/api/roledelete",
        method:"post",
        data:qs.stringify(obj)
    })
}
// 获取一条
export let reqRoleDetail=(obj)=>{
    return axios({
        url:baseUrl+"/api/roleinfo",
        params:obj
    })
}



// 角色修改
export let reqRoleUpdate=(user)=>{
    return axios({
        url:baseUrl+"/api/roleedit",
        method:"post",
        data:qs.stringify(user)
    })
}

/********* 管理员********** */

// 管理员添加
export let reqManageAdd=(user)=>{
    return axios({
        url:baseUrl+"/api/useradd",
        method:'post',
        data:qs.stringify(user)
    })
}

// 管理员列表

export let reqManageList=(obj)=>{
    return axios({
        url:baseUrl+"/api/userlist",
        method:"get",
        params:obj
    })
}

// 管理员总数

export let reqManageCount=()=>{
    return axios({
        url:baseUrl+"/api/usercount"
    })
}

// 管理员删除

export let reqManageDel=(obj)=>{
    return axios({
        url:baseUrl+"/api/userdelete",
        method:"post",
        data:obj
    })   
}

// 管理员获取一条
 
export let reqManageInfo=(obj)=>{
    return axios({
        url:baseUrl+"/api/userinfo",
        method:"get",
        params:obj
    })
}

// 管理员逻辑

export let reqManageUpate=(user)=>{
    return axios({
        url:baseUrl+"/api/useredit",
        method:"post",
        data:qs.stringify(user)
    })
}

/************商品分类管理 start**************************/

//添加 user={img:File,catename:"12",pid:1}
export let reqcateAdd = (user) => {
    return axios({
        url: baseUrl + "/api/cateadd",
        method: "post",
        data: dataToFormData(user)
    })
}

//列表 p={istree:true} {pid:1}
export let reqcatelist = (p) => {
    return axios({
        url: baseUrl + "/api/catelist",
        params:p
    })
}

//详情 user={id:1}
export let reqcateDetail = (user) => {
    return axios({
        url: baseUrl + "/api/cateinfo",
        method: "get",
        params: user
    })
}

//修改 user={id:"必填",img:file,catename:""}
export let reqcateUpdate = (user) => {
    return axios({
        url: baseUrl + "/api/cateedit",
        method: "post",
        data: dataToFormData(user)
    })
}

//删除 user={id:1}
export let reqcateDel = (user) => {
    return axios({
        url: baseUrl + "/api/catedelete",
        method: "post",
        data: qs.stringify(user)
    })
}


// **************会员管理**********

// 会员列表

export let reqMemberList=()=>{
    return axios({
        url:baseUrl+"/api/memberlist"
    })
}

//  获取

export let reqMemberDeitl=(obj)=>{
    return axios({
        url:baseUrl+"/api/memberinfo",
        method:"get",
        params:obj
    })
}

// 修改

export let reqMemberRevise=(user)=>{
    return axios({
        url:baseUrl+"/api/memberedit",
        method:'post',
        data:qs.stringify(user)
    })
}


/************商品规格管理 start**************************/

//添加 
export let reqspecsAdd = (user) => {
    return axios({
        url: baseUrl + "/api/specsadd",
        method: "post",
        data: qs.stringify(user)
    })
}

//列表 
export let reqspecslist = (obj) => {
    return axios({
        url: baseUrl + "/api/specslist",
        params:obj
    })
}

//详情 user={id:1}
export let reqspecsDetail = (user) => {
    return axios({
        url: baseUrl + "/api/specsinfo",
        method: "get",
        params: user
    })
}

//修改 
export let reqspecsUpdate = (user) => {
    return axios({
        url: baseUrl + "/api/specsedit",
        method: "post",
        data: qs.stringify(user)
    })
}

//删除 user={id:1}
export let reqspecsDel = (user) => {
    return axios({
        url: baseUrl + "/api/specsdelete",
        method: "post",
        data: qs.stringify(user)
    })
}

// 总和

export let reqspecsCount = ()=>{
    return axios({
        url:baseUrl+"/api/specscount"
    })
}


/************商品管理 start**************************/

//添加 
export let reqgoodsAdd = (user) => {
    return axios({
        url: baseUrl + "/api/goodsadd",
        method: "post",
        data: dataToFormData(user)
    })
}

//列表 
export let reqgoodslist = (obj) => {
    return axios({
        url: baseUrl + "/api/goodslist",
        params:obj
    })
}

//详情 
export let reqgoodsDetail = (user) => {
    return axios({
        url: baseUrl + "/api/goodsinfo",
        method: "get",
        params: user
    })
}

//修改 user={id:"必填",img:file,catename:""}
export let reqgoodsUpdate = (user) => {
    return axios({
        url: baseUrl + "/api/goodsedit",
        method: "post",
        data: dataToFormData(user)
    })
}

//删除 user={id:1}
export let reqgoodsDel = (user) => {
    return axios({
        url: baseUrl + "/api/goodsdelete",
        method: "post",
        data: qs.stringify(user)
    })
}

//总数
export let reqgoodsCount=()=>{
    return axios({
        url:baseUrl+"/api/goodscount"
    })
}


/************商品分类管理 start**************************/

//添加 user={img:File,catename:"12",pid:1}
export let reqbannerAdd = (user) => {
    return axios({
        url: baseUrl + "/api/banneradd",
        method: "post",
        data: dataToFormData(user)
    })
}

//列表 p={istree:true} {pid:1}
export let reqbannerlist = (p) => {
    return axios({
        url: baseUrl + "/api/bannerlist",
        params:p
    })
}

//详情 user={id:1}
export let reqbannerDetail = (user) => {
    return axios({
        url: baseUrl + "/api/bannerinfo",
        method: "get",
        params: user
    })
}

//修改 user={id:"必填",img:file,catename:""}
export let reqbannerUpdate = (user) => {
    return axios({
        url: baseUrl + "/api/banneredit",
        method: "post",
        data: dataToFormData(user)
    })
}

//删除 user={id:1}
export let reqbannerDel = (user) => {
    return axios({
        url: baseUrl + "/api/bannerdelete",
        method: "post",
        data: qs.stringify(user)
    })
}


/************商品秒杀管理 start**************************/

//添加 
export let reqseckAdd = (user) => {
    return axios({
        url: baseUrl + "/api/seckadd",
        method: "post",
        data: qs.stringify(user)
    })
}

//列表 
export let reqsecklist = (obj) => {
    return axios({
        url: baseUrl + "/api/secklist",
        params:obj
    })
}

//详情 user={id:1}
export let reqseckDetail = (user) => {
    return axios({
        url: baseUrl + "/api/seckinfo",
        method: "get",
        params: user
    })
}

//修改 
export let reqseckUpdate = (user) => {
    return axios({
        url: baseUrl + "/api/seckedit",
        method: "post",
        data: qs.stringify(user)
    })
}

//删除 user={id:1}
export let reqseckDel = (user) => {
    return axios({
        url: baseUrl + "/api/seckdelete",
        method: "post",
        data: qs.stringify(user)
    })
}


