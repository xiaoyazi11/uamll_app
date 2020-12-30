<template>
  <div>
    <el-dialog :title="info.isadd?'添加规格':'编辑规格'" :visible.sync="info.isshow" @closed="cancel">
      <!-- 14.数据绑定到页面 -->

      <el-form :model="user">
        <div>user:{{user}}</div>
        <div>attrsArr:{{attrsArr}}</div>
        <el-form-item label="规格名称" label-width="100px">
          <el-input v-model="user.specsname"></el-input>
        </el-form-item>
        <el-form-item
          label="规格属性"
          label-width="100px"
          v-for="(item,index) in attrsArr"
          :key="index"
        >
          <div class="line">
            <el-input class="line-ipt" v-model="item.value"></el-input>
            <el-button type="primary" class="line-btn" v-if="index==0" @click="addAttr">新增规格属性</el-button>
            <el-button type="danger" class="line-btn" v-else @click="delAttr(index)">删除</el-button>
          </div>
        </el-form-item>

        <el-form-item label="状态" label-width="100px">
          <el-switch v-model="user.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.isadd">添 加</el-button>
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import {
  reqspecsAdd,
  reqspecsDetail,
  reqspecsUpdate
} from "../../../utils/http";
import { successalert, erroralert } from "../../../utils/alert";
export default {
  props: ["info"],
  data() {
    return {
      user: {
        specsname: "",
        attrs: "[]",
        status: 1
      },
      attrsArr: [{ value: "" }]
    };
  },
  computed: {
    ...mapGetters({})
  },
  methods: {
    ...mapActions({
      reqList: "specs/reqList",
      reqTotal: "specs/reqTotal"
    }),
    cancel() {
      if (!this.info.isadd) {
        this.empty();
      }
      this.info.isshow = false;
      this.empty();
    },
    addAttr() {
      this.attrsArr.push({ value: "" });
    },
    delAttr(index) {
      this.attrsArr.splice(index, 1);
    },
    empty() {
      (this.user = {
        specsname: "",
        attrs: "[]",
        status: 1
      }),
        (this.attrsArr = [{ value: "" }]);
    },
    checkProps() {
      return new Promise(resolve => {
        if (this.user.specsname === "") {
          erroralert("规格名称不能为空");
          return;
        }
        if (this.attrsArr.some(item => item.value === "")) {
          erroralert("请输入所有的规格属性");
          return;
        }
        resolve();
      });
    },
    add() {
      this.checkProps().then(() => {
        this.user.attrs = JSON.stringify(
          this.attrsArr.map(item => {
            return item.value;
          })
        );
        reqspecsAdd(this.user).then(res => {
          if (res.data.code == 200) {
            successalert(res.data.msg);
            this.cancel();
            this.empty();
            this.reqList();
            this.reqTotal();
          }
        });
      });
    },
    getone(id) {
      reqspecsDetail({ id: id }).then(res => {
        if (res.data.code == 200) {
          // 获取第一条信息
          this.user = res.data.list[0];
          // 转为对象
          this.user.attrs = JSON.parse(this.user.attrs);
          // 获取数组
          this.attrsArr = this.user.attrs.map(item => ({ value: item }));
        }
      });
    },
    update() {
      this.checkProps().then(() => {
        this.user.attrs = JSON.stringify(
          this.attrsArr.map(item => {
            return item.value;
          })
        );
        reqspecsUpdate(this.user).then(res => {
          if (res.data.code == 200) {
            //1.弹框消失
            this.cancel();
            //2.数据清空
            this.empty();
            //3.弹成功
            successalert(res.data.msg);
            //4.刷新list
            this.reqList();
          }
        });
      });
    }
  }
};
</script>

<style scoped>
.line {
  display: flex;
}
.line-btn {
  width: auto;
}
.line-ipt {
  flex: 1;
}
</style>