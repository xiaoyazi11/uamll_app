<template>
  <div class="list">
    <el-table
      :data="list"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      :tree-props="{children: 'children'}"
    >
      <el-table-column prop="id" label="商品编号" sortable></el-table-column>
      <el-table-column prop="goodsname" label="商品名称" sortable></el-table-column>
      <el-table-column label="商城价格" sortable>
        <template slot-scope="scope">
          <div>{{scope.row.price}}</div>
        </template>
      </el-table-column>
      <el-table-column label="市场价格" sortable>
        <template slot-scope="scope">
          <div>{{scope.row.market_price}}</div>
        </template>
      </el-table-column>
      <el-table-column label="图片">
        <template slot-scope="scope">
          <img :src="$pre+scope.row.img" alt />
        </template>
      </el-table-column>
      <el-table-column label="是否新品">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.isnew===1">是</el-button>
          <el-button type="info" v-else>否</el-button>
        </template>
      </el-table-column>
      <el-table-column label="是否热卖">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.ishot===1">是</el-button>
          <el-button type="info" v-else>否</el-button>
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status===1">启用</el-button>
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
          <del-btn @confirm="del(scope.row.id)"></del-btn>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="size"
      @current-change="changePage"
    ></el-pagination>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { reqgoodsDel } from "../../../utils/http";
import { successalert } from "../../../utils/alert";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      list: "goods/list",
      total: "goods/total",
      //一页的数量
      size: "goods/size"
    })
  },
  methods: {
    ...mapActions({
      reqList: "goods/reqList",
      reqTotal: "goods/reqTotal",
      changePage: "goods/changePage"
    }),
    del(id) {
      reqgoodsDel({ id: id }).then(res => {
        if (res.data.code == 200) {
          successalert(res.data.msg);
          this.reqList();
          this.reqTotal();
        }
      });
    },
    edit(id) {
      this.$emit("edit", id);
    }
  },
  mounted() {
    this.reqList();
    this.reqTotal();
  }
};
</script>

<style scoped>
.list {
  padding-top: 10px;
}
img {
  width: 80px;
  height: 80px;
}
</style>