<template>
  <div class="cate">
    <el-button type="primary" @click="Main">添加</el-button>
    <v-bannerlist :list="list" @init="init" @edit="edit($event)"></v-bannerlist>
    <v-banneradd :info="info" :list="list" @init="init" ref="add"></v-banneradd>
  </div>
</template>

<script>
import vBannerlist from "./components/list.vue";
import vBanneradd from "./components/add.vue";
import { reqbannerlist } from "../../utils/http";
export default {
  components: {
    vBannerlist,
    vBanneradd
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
      reqbannerlist({ istree: true }).then(res => {
        if (res.data.code == 200) {
          this.list = res.data.list;
        }
      });
    },
    edit(id) {
      this.info.isshow = true;
      this.info.isadd = false;
      this.$refs.add.getone(id);
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