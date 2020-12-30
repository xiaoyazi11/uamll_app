<template>
  <div>
    <el-dialog :title="info.isadd?'添加菜单':'编辑菜单'" :visible.sync="info.isshow" @close="cancel">
      <el-form :model="user">
        <el-form-item label="角色名称" label-width="100px">
          <el-input v-model="user.rolename" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色权限" label-width="100px">
          <el-tree :data="list" show-checkbox node-key="id" :props="defaultProps" ref="tree"></el-tree>
        </el-form-item>
        <el-form-item label="状态" label-width="100px">
          <el-switch v-model="user.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel()">取 消</el-button>
        <el-button type="primary" @click="roleadd()" v-if="info.isadd">添 加</el-button>
        <el-button type="primary" @click="update()" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  reqRoleAdd,
  reqMenuList,
  reqRoleDetail,
  reqRoleUpdate
} from "../../../utils/http";
import { successalert,erroralert } from "../../../utils/alert";
export default {
  props: ["info", "roleList"],
  data() {
    return {
      user: {
        rolename: "",
        menus: "",
        status: 1
      },
      list: [],
      defaultProps: {
        children: "children",
        label: "title"
      }
    };
  },
  methods: {
    cancel() {
      if (!this.info.isadd) {
        this.emity();
      }
      this.info.isshow = false;
    },
    emity() {
      this.user = {
        rolename: "",
        menus: "",
        status: 1
      },
        this.$refs.tree.setCheckedKeys([]);
    },
    checkProps() {
      return new Promise(resolve => {
        if (this.user.rolename === "") {
          erroralert("角色名称不能为空");
          return;
        }
        if (this.user.menus === '[]') {
          erroralert("角色权限不能为空");
          return;
        }
        resolve();
      });
    },
    roleadd() {
        this.user.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
        console.log(this.user.menus);
      this.checkProps().then(() => {
        reqRoleAdd(this.user).then(res => {
          if (res.data.msg) {
            successalert(res.data.msg);
            this.cancel();
            this.emity();
            this.$emit("init");
          }
        });
      });
    },
    getone(id) {
      reqRoleDetail({ id: id }).then(res => {
        if (res.data.code == 200) {
          this.user = res.data.list;
          this.user.id = id;
          this.$refs.tree.setCheckedKeys(JSON.parse(this.user.menus));
        }
      });
    },
    update() {
        this.user.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      this.checkProps().then(() => {
        reqRoleUpdate(this.user).then(res => {
          if (res.data.code == 200) {
            //弹成功
            successalert(res.data.msg);
            //弹框消失
            this.cancel();
            //数据清空
            this.emity();
            //刷新list
            this.$emit("init");
          }
        });
      });
    }
  },
  mounted() {
    reqMenuList().then(res => {
      if (res.data.code == 200) {
        this.list = res.data.list;
      }
    });
  }
};
</script>

<style>
</style>