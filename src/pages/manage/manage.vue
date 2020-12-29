<template>
  <div class="manage">
    <el-button type="primary" @click="Matadd">添 加</el-button>

    <!-- 列表 -->
    <v-list :list="list" @init="init" @edit="edit($event)"></v-list>

    <!-- 添加 -->
    <v-add :info="info" :list="list" @init="init" ref="add"></v-add>

    <el-pagination
      layout="prev, pager, next"
      :total="total"
      :page-size="pageSize"
      @current-change="changePage"
    ></el-pagination>
  </div>
</template>

<script>
import vList from "./components/list.vue";
import vAdd from "./components/add.vue";
import { reqManageList, reqManageCount } from "../../utils/http";
export default {
  components: {
    vAdd,
    vList
  },
  data() {
    return {
      info: {
        isshow: false,
        isadd: true
      },
      list: [],
      pageSize: 2,
      //总数
      total: 0,
      //当前页面
      page: 1
    };
  },
  methods: {
    Matadd() {
      this.info.isshow = true;
      this.info.isadd = true;
    },
    getTotal() {
      reqManageCount().then(res => {
        if (res.data.code == 200) {
          this.total = res.data.list[0].total;
          console.log(this.total);
        }
      });
    },
    // 列表
    getList() {
      reqManageList({ page: this.page, size: this.pageSize }).then(res => {
        if (res.data.code == 200) {
          if (res.data.list.length == 0 && this.page > 1) {
            this.page--;
            this.getList();
            return;
          }
          this.list = res.data.list;
        }
      });
    },
    init() {
      this.getTotal();
      this.getList();
    },
    changePage(e) {
      console.log(e);
      this.page = e;
      //再次取list
      this.getList();
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
.manage {
  padding-top: 20px;
}
</style>