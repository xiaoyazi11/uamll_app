<template>
  <div class="space">
    <el-button type="primary" @click="willAdd">添加</el-button>
    <v-list @edit="edit"></v-list>
    <v-add :info="info" ref="add"></v-add>
  </div>
</template>

<script>
import vList from "./components/list.vue"
import vAdd from "./components/add.vue"
export default {
   components:{
     vList,
     vAdd
   },
   data(){
     return{
       info:{
         isshow:false,
         isadd:true
       }
     }
   },
   methods:{
     willAdd(){
         this.info.isshow=true,
         this.info.isadd=true
     },
     edit(id){
         this.info.isshow=true,
         this.info.isadd=false,
         this.$refs.add.getone(id)
     }
   }
}
</script>

<style scoped>
.space{
  padding-top: 20px;
}

</style>