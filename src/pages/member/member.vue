<template>
  <div class="member">
        <v-memberlist :list="list"  @edit="edit($event)" @init="init"></v-memberlist>
         <v-memberrevise :list="list" :info="info" ref="memberrevise" @init="init"></v-memberrevise>
  </div>
</template>

<script>
import vMemberlist from "./components/memberlist.vue"
import vMemberrevise from "./components/memberrevise.vue"
import {reqMemberList} from "../../utils/http"
export default {
     components:{
       vMemberlist,
       vMemberrevise
     },
     data(){
       return{
         list:[],
         info:{
           isshow:false
         }
       }
     },
    methods:{
       init(){
         reqMemberList().then(res=>{
           if(res.data.code==200){
             this.list = res.data.list
           }
         })
        },
        edit(uid){
          this.info.isshow=true
          this.$refs.memberrevise.getone(uid);
        },
    },
    mounted(){
        this.init()
    }
}
</script>

<style>
.member{
  padding-top: 20px;
}
</style>