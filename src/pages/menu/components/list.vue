<template>
  <div class="list">
    <el-table
      :data="list"
      style="width: 100%"
      row-key="id"
      border
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
     >
      <el-table-column prop="id" label="菜单编名"></el-table-column>
      <el-table-column prop="title" label="菜单名称"></el-table-column>
      <el-table-column prop="icon" label="菜单图标">
        <template slot-scope="scope">
          <i :class="scope.row.icon"></i>
        </template>
      </el-table-column>
      <el-table-column prop="url" label="菜单地址"></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status===1">启用</el-button>
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="操作" width="180">
         <template slot-scope="scope">
            <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
        <el-button type="danger"  @click="del(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { reqMenuDel } from "../../../utils/http";
import { successalert } from '../../../utils/alert';
export default {
  props: ["list"],
  methods:{
     del(id) {
      this.$confirm("你确定要删除吗?", "提示", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //点了删除按钮
          reqMenuDel({ id: id }).then(res => {
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
};
</script>

<style scoped>
.list {
  padding-top: 10px;
}
</style>