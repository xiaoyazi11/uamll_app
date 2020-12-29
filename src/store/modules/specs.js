import {reqspecslist,reqspecsCount} from "../../utils/http"

let state={
    list:[],
    total:0,
    //一页的数量
    size:2,
    //当前的页码
    page:1

}
let mutations={
    changeList(state,arr){
      state.list=arr
    },
    changeTotal(state,num){
        state.total=num
    },
    changePage(state,num){
        state.page=num
    }
}
let getters={
    list(state){
        return state.list
    },
    total(state){
        return state.total
    },
    size(state){
        return state.size
    }
}
let actions={
     reqList(context){
         reqspecslist({page:context.state.page,size:context.state.size}).then(res=>{
             if(res.data.code==200){
                if(res.data.list.length===0&&context.state.page>1){
                    context.commit("changePage",context.state.page-1)
                    context.dispatch("reqList")
                    return;
                }
                //处理列表逻辑
                let list=res.data.list
                list.forEach(item=>{
                    item.attrs=JSON.parse(item.attrs)
                })
                //修改list
                context.commit("changeList",list)
             }
         })
     },
     reqTotal(context){
        reqspecsCount().then(res=>{
            if(res.data.code==200){
                context.commit("changeTotal",res.data.list[0].total)
            }
        })
     },
     changePage(context,num){
         context.commit("changePage",num)
         context.dispatch("reqList")

     }
}
export default {
    state,mutations,getters,actions,
    namespaced:true
}