<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      :tree-props="{children: 'children'}"
    >
      <el-table-column prop="title" label="活动名称" sortable></el-table-column>

      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status===1">启用</el-button>
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
          <del-btn  @confirm="del(scope.row.id)">删除</del-btn>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { reqseckDel } from "../../../utils/http";
import { successalert} from "../../../utils/alert";
export default {
  data() {
    return {};
  },
  methods: {
    ...mapActions({
      reqList: "seckill/reqList"
    }),
    edit(id) {
      this.$emit("edit", id);
    },
    del(id) {
      reqseckDel({ id: id }).then(res => {
        if (res.data.code == 200) {
          successalert(res.data.msg);
          this.reqList();
        }
      });
    },
  },
  mounted() {
    this.reqList();
  },
  computed: {
    ...mapGetters({
      list: "seckill/list"
    })
  }
};
</script>

<style>
</style>