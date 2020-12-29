<template>
  <div>
    <el-table :data="list" style="width: 100%">
      <el-table-column prop="id" label="用户编号" width="180"></el-table-column>
      <el-table-column prop="username" label="用户名"></el-table-column>
      <el-table-column prop="rolename" label="所属角色"></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status===1">启用</el-button>
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.uid)">编辑</el-button>
            <del-btn @confirm="del(scope.row.uid)"></del-btn>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { reqManageDel } from "../../../utils/http"
import { successalert } from "../../../utils/alert";
export default {
  props:["list"],
    data(){
        return{
      
        }
    },
    methods:{
      del(uid){
        reqManageDel({ uid: uid }).then(res => {
        if (res.data.code == 200) {
          successalert(res.data.msg);
          this.$emit("init");
        }
      })
      },
      edit(uid){
             this.$emit("edit", uid);
      }
    }
};
</script>

<style>
</style>