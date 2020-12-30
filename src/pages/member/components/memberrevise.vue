<template>
  <div>
    <el-dialog title="会员编辑" :visible.sync="info.isshow" @closed="cancel">
      <el-form :model="user">
        {{user}}
        <el-form-item label="手机号" label-width="100px">
          <el-input v-model="user.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="昵称" label-width="100px">
          <el-input v-model="user.nickname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="100px">
          <el-input v-model="user.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态" label-width="100px">
          <el-switch v-model="user.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="update">编 辑</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { reqMemberDeitl, reqMemberRevise } from "../../../utils/http";
import { successalert, erroralert } from "../../../utils/alert";
export default {
  props: ["list", "info"],
  data() {
    return {
      user: {
        uid: "",
        nickname: "",
        phone: "",
        password: "",
        status: 1
      }
    };
  },
  methods: {
    cancel() {
      this.info.isshow = false;
    },
    getone(uid) {
      reqMemberDeitl({ uid: uid }).then(res => {
        if (res.data.code == 200) {
          this.user = res.data.list;
          this.user.uid = uid;
        }
      });
    },
    checkProps() {
      return new Promise(resolve => {
        if (this.user.nickname === "") {
          erroralert("昵称不能为空");
          return;
        }
        if (this.user.phone === "") {
          erroralert("手机号不能为空");
          return;
        }
        resolve();
      });
    },
    update() {
      this.checkProps().then(() => {
        reqMemberRevise(this.user).then(res => {
          if (res.data.code == 200) {
            successalert(res.data.msg);
            this.cancel();
            this.$emit("init");
          }
        });
      });
    }
  }
};
</script>

<style>
</style>