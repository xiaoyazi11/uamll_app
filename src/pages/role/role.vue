<template>
  <div class="role">
    <el-button type="primary" @click="Matadd()">添 加</el-button>
    <!-- 列表 -->
    <v-rolelist :roleList="roleList" @init="init" @edit="edit($event)"></v-rolelist>
    <!-- 添加 -->
    <v-roleadd :info="info" :roleList="roleList" @init="init" ref="roleadd"></v-roleadd>
  </div>
</template>

<script>
import vRolelist from "./components/rolelist.vue";
import vRoleadd from "./components/roleadd.vue";
import { reqRoleList } from "../../utils/http";
export default {
  components: {
    vRolelist,
    vRoleadd
  },
  data() {
    return {
      info: {
        isshow: false,
        isadd: true
      },
      roleList: []
    };
  },
  methods: {
    Matadd() {
      this.info.isshow = true;
    },
    edit(id) {
      //弹框出现
      this.info.isshow = true;

      //43.是编辑
      this.info.isadd = false;

      //触发add的getOne()
      this.$refs.roleadd.getone(id);
    },
    init() {
      reqRoleList().then(res => {
        this.roleList = res.data.list;
      });
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<style scoped>
.role {
  padding-top: 20px;
}
</style>