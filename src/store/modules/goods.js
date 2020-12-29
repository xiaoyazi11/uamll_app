import {reqgoodslist} from "../../utils/http"
let state={
   list:[]
}
let mutations={
    changeList(state,arr){
        state.list=arr
    }
}
let getters={
    list(state){
      return state.list
    }
}
let actions={
    reqList(context){
      reqgoodslist({page:context.state.page,size:context.state.size}).then(res=>{
        if(res.data.code){
            //删除的是最后一页的最后一条
            if(res.data.list.length===0&&context.state.page>1){
                context.commit("changePage",context.state.page-1)
                context.dispatch("reqList")
                return;
            }

            
            //修改list
            context.commit("changeList",res.data.list)
        }
    })
    }
}
export default {
  state,mutations,getters,actions,
  namespaced:true
}
