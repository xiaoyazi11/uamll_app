<template>
  <div class="menu">
    <!-- 添加按钮 -->
    <el-button type="primary" @click="willAdd">添加</el-button>

    <!-- 列表 -->
    <v-list :list="list" @init="init" @edit="edit($event)"></v-list>

    <!-- 弹窗 -->
    <v-add :info="info" :list="list" @init="init" ref="add"></v-add>
  </div>
</template>

<script>
import vList from "./components/list.vue";
import vAdd from "./components/add.vue";
import { reqMenuList } from "../../utils/http";
export default {
  components: {
    vList,
    vAdd
  },
  data() {
    return {
      info: {
        isshow: false,
        isadd:true
      },
      list: []
    };
  },
  methods: {
    willAdd() {
      this.info.isshow = true;
        this.info.isadd=true
    },
    init() {
      reqMenuList().then(res => {
        if (res.data.code == 200) {
          this.list = res.data.list;
        }
      });
    },
    edit(id) {
      //弹框出现
      this.info.isshow = true;

      //43.是编辑
      this.info.isadd = false;

      //触发add的getOne()
      this.$refs.add.getone(id);
    }
  },
  mounted() {
    this.init();
  }
};
</script>
<style scoped>
.menu {
  padding-top: 20px;
}
</style>