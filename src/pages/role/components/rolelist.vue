<template>
  <div class="rolelist">
    <el-table :data="roleList" style="width: 100%">
      <el-table-column prop="id" label="角色编号" width="180"></el-table-column>
      <el-table-column prop="rolename" label="角色名称" ></el-table-column>
         <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status===1">启用</el-button>
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>
       <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
       <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
         <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
        </template>
       </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { reqRoleDel } from "../../../utils/http";
import { successalert } from '../../../utils/alert';
export default {
  props:["roleList"],
  data() {
    return {
    };
  },
  methods:{
     del(id) {
      this.$confirm("你确定要删除吗?", "提示", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //点了删除按钮
          reqRoleDel({ id: id }).then(res => {
            if(res.data.code===200){
              //弹弹框
              successalert(res.data.msg)
              //32.刷新list
              this.$emit("init")
            }
          });
        })
        .catch(() => {});
    },
     edit(id){
         this.$emit("edit",id)
     }
  }
}  
</script>

<style scoped>
.rolelist{
  padding-top: 10px;
}
</style>