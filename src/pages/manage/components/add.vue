<template>
  <div>
    <el-dialog :title="info.isadd?'管理添加':'管理编辑'" :visible.sync="info.isshow">
      <el-form :model="user">
        <el-form-item label="所属角色" label-width="100px">
          <el-select v-model="user.roleid">
            <el-option :value="0" label="请选择" disabled></el-option>
            <el-option
              v-for="item in rolelist"
              :key="item.id"
              :label="item.rolename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户名" label-width="100px">
          <el-input v-model="user.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="100px">
          <el-input v-model="user.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态" label-width="100px">
          <el-switch v-model="user.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.isadd">添 加</el-button>
        <el-button type="primary" v-else @click="upate">编 辑</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  reqManageAdd,
  reqRoleList,
  reqManageInfo,
  reqManageUpate
} from "../../../utils/http";
import { successalert } from "../../../utils/alert";
export default {
  props: ["info","list"],
  data() {
    return {
      user: {
        roleid: 0,
        username: "",
        password: "",
        status: 1
      },
      rolelist: []
    };
  },
  methods: {
    cancel() {
      this.info.isshow = false;
      this.info.isadd = false;
    },
    emity() {
      this.user = {
        roleid: 0,
        username: "",
        password: "",
        status: 1
      };
    },
    add() {
      reqManageAdd(this.user).then(res => {
        console.log("add");
        if (res.data.code == 200) {
          successalert(res.data.msg);
          this.cancel();
          this.emity();
          this.$emit("init");
        }
      });
    },
    getone(id) {
      reqManageInfo({ uid: id }).then(res => {
        if (res.data.code == 200) {
          this.user = res.data.list;
          this.user.password = "";
        }
      });
    },
    upate() {
      reqManageUpate(this.user).then(res => {
        if (res.data.code == 200) {
          successalert(res.data.msg);
          //弹框消失
          this.cancel();
          this.emity();
          //刷新list
          this.$emit("init");
        }
      });
    }
  },
  mounted() {
    reqRoleList().then(res => {
      if (res.data.code == 200) {
        this.rolelist = res.data.list;
      }
    });
  }
};
</script>

<style>
</style>