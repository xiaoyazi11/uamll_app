<template>
  <div class="cate">
    <el-button type="primary" @click="Main">添加</el-button>
    <v-catelist :list="list" @init="init" @edit="edit($event)"></v-catelist>
    <v-cateadd :info="info" :list="list" @init="init" ref="cateadd"></v-cateadd>
  </div>
</template>

<script>
import vCatelist from "./components/catelist.vue";
import vCateadd from "./components/cateadd.vue";
import { reqcatelist } from "../../utils/http";
export default {
  components: {
    vCatelist,
    vCateadd
  },
  data() {
    return {
      info: {
        isshow: false,
        isadd: true
      },
      list: []
    };
  },
  methods: {
    Main() {
      (this.info.isshow = true), (this.info.isadd = true);
    },
    init() {
      reqcatelist({ istree: true }).then(res => {
        if (res.data.code == 200) {
          this.list = res.data.list;
        }
      });
    },
    edit(id) {
      this.info.isshow = true;
      this.info.isadd = false;
      this.$refs.cateadd.getone(id);
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<style scoped>
.cate {
  padding-top: 20px;
}
</style>