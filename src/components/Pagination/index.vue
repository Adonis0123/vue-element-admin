<!--
 * @Author: Hzh
 * @Date: 2020-08-26 10:29:56
 * @LastEditTime: 2020-09-21 10:53:45
 * @LastEditors: Hzh
 * @Description:封装element的分页组件
-->
<template>
  <el-pagination
    background
    :page-size.sync="currentPageSize"
    :current-page.sync="currentPageNo"
    :page-sizes="[5, 10, 20, 50]"
    :pager-count="5"
    :prev-text="'上一页'"
    :next-text="'下一页'"
    :total="total"
    layout="total, sizes, prev,pager, next, jumper"
    class="pagination"
    @size-change="pageSizeChange"
    @current-change="pageNoChange"
  />
</template>

<script>
export default {
  name: 'Pagination',

  components: {},

  props: {
    total: {
      type: Number,
      default: 0
    },
    pageSize: {
      type: Number,
      required: true
    },
    pageNo: {
      type: Number,
      required: true
    }
  },

  data() {
    return {
      currentPageSize: this.pageSize,
      currentPageNo: this.pageNo
    }
  },

  computed: {},

  watch: {
    currentPageSize: {
      handler: function(newVal) {
        this.$emit('update:pageSize', newVal)
      }
    },
    currentPageNo: {
      handler: function(newVal) {
        this.$emit('update:pageNo', newVal)
      }
    }
  },

  created() {},

  mounted() {},

  methods: {
    /**
     * @description: 切换每页条数时的回调
     * @param {Number}  currentPageSize 当前设置的每页条数
     */
    pageSizeChange(currentPageSize) {
      this.$emit('sizeChange', currentPageSize)
    },

    /**
     * @description: 切换页码时的回调
     * @param {Number}  currentPage
     */
    pageNoChange(currentPage) {
      this.$emit('currentChange', currentPage)
    }
  }
}
</script>

<style lang="scss" scoped>
.pagination {
  padding: 0;
  ::v-deep .number {
    background: #fff !important;
    border-radius: 4px !important;
    border: 1px solid rgba(210, 210, 210, 1) !important;
  }
  ::v-deep .number.active {
    border: none!important;
    background-color: #1890ff !important;
  }
  ::v-deep button {
    border: 1px solid rgba(210, 210, 210, 1) !important;
    background: #fff !important;
    padding: 0 10px !important;
    border-radius: 4px !important;
  }
}
</style>
