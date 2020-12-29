<template>
  <div>
    <el-dialog :title="info.isadd?'管理添加':'管理编辑'" :visible.sync="info.isshow">
      {{user}}
      <el-form :model="user">
        <el-form-item label="上级分类" label-width="100px">
          <el-select v-model="user.pid">
            <el-option :value="0" label="顶级分类"></el-option>
            <el-option v-for="item in list" :key="item.id" :label="item.catename" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分类名称" label-width="100px">
          <el-input v-model="user.catename" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="图片" label-width="100px" v-if="user.pid!==0">
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :on-change="changeImg2"
          >
            <img v-if="imgUrl" :src="imgUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

        <el-form-item label="状态" label-width="100px">
          <el-switch v-model="user.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.isadd">添 加</el-button>
        <el-button type="primary" v-else @click="update">编 辑</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { successalert } from "../../../utils/alert";
import { reqcateAdd, reqcateDetail,reqcateUpdate } from "../../../utils/http";
export default {
  props: ["info", "list"],
  data() {
    return {
      imgUrl: "",
      //3.初始化user
      user: {
        pid: "",
        catename: "",
        img: null,
        status: 1
      }
    };
  },
  methods: {
    cancel() {
      this.info.isshow = false;
      this.info.isadd = false;
      this.empty();
    },
    empty() {
      this.imgUrl = "";
      //3.初始化user
      this.user = {
        pid: "",
        catename: "",
        img: null,
        status: 1
      };
    },
    add() {
      reqcateAdd(this.user).then(res => {
        if (res.data.code == 200) {
          successalert(res.data.msg);
          this.cancel();
          this.empty();
          this.$emit("init");
        }
      });
    },
    changeImg2(e) {
      let file = e.raw;
      //判断
      this.imgUrl = URL.createObjectURL(file);
      this.user.img = file;
    },
    getone(id) {
      reqcateDetail({ id: id }).then(res => {
        if (res.data.code == 200) {
          this.user = res.data.list;
          //补id
          this.user.id = id;
          //处理图片
          this.imgUrl = this.$pre + this.user.img;
        }
      });
    },
    update() {
      reqcateUpdate(this.user).then(res => {
        if (res.data.code == 200) {
          //弹成功
          successalert(res.data.msg);
          //弹框消失
          this.cancel();
          //数据清空
          this.empty();
          //刷新list
          this.$emit("init");
        }
      });
    }
  }
};
</script>

<style scoped lang="stylus">
.form >>>.el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>