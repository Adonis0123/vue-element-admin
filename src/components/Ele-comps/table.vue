<!--
 * @Author: Hzh
 * @Date: 2020-09-16 16:50:01
 * @LastEditTime: 2020-09-21 11:44:30
 * @LastEditors: Hzh
 * @Description:数据元
-->
<template>
  <el-row ref="wrap" class="data-element">
    <page-title ref="pageTitle" title="表格组件" />
    <el-row class="data-element-container">
      <el-row ref="searchFormBox" class="search-form-box" type="flex" align="middle" justify="space-between">
        <el-form
          ref="searchForm"
          :inline="true"
          :model="searchForm"
          :rules="searchFormRules"
          class="search-form"
          @submit.native.prevent
        >
          <el-form-item label="数据元分类" prop="dataElementType">
            <el-select
              v-model="searchForm.dataElementType"
              placeholder="请选择"
              size="mini"
              style="width:154px;"
            >
              <el-option :label="'全部'" value="-1" />
              <el-option
                v-for=" item in dataElementList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="关键字" prop="keyword">
            <el-input
              v-model.trim="searchForm.keyword"
              size="mini"
              placeholder="请输入关键字进行搜索"
              style="width:250px;"
            />
          </el-form-item>
          <el-form-item label="日期筛选">
            <el-date-picker
              v-model="selectedDate"
              size="mini"
              :editable="false"
              :clearable="false"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions"
              :default-time="['00:00:00', '23:59:59']"
              :style="{ width: '255px' }"
              @change="dateChange"
            />
          </el-form-item>
          <el-form-item>
            <el-button size="mini" type="primary" plain @click="handleSearch">查询</el-button>
          </el-form-item>
        </el-form>
        <div>
          <el-button size="mini" class="add-btn" type="primary" @click="handleDialog('add')">添加数据元</el-button>
        </div>
      </el-row>
      <el-row class="table-box">
        <el-table
          ref="table"
          v-loading="tipContent === 'loading'"
          class="table"
          border
          highlight-current-row
          :height="tableHeight"
          :row-class-name="tabRowClassName"
          :data="tableData"
          :header-cell-style="{background:'#F2F6FD'}"
          @header-dragend="layoutTable"
        >
          <el-table-column align="center" width="100" prop="diag" label="数据元标识符" />
          <el-table-column align="center" width="100" prop="sex" label="数据元名称" />
          <el-table-column align="center" width="100" prop="visitAge" label="分类" />
          <el-table-column align="center" prop="regDeptName" label="定义" />
          <el-table-column align="center" width="160" prop="regDate" label="数据类型" />
          <el-table-column align="center" width="160" prop="disDate" label="表示格式" />
          <el-table-column align="center" width="160" prop="disDate" label="数据元允许值" />
          <el-table-column
            label="操作"
            width="100"
            align="center"
            header-align="center"
            fixed="right"
            :resizable="false"
          >
            <div slot-scope="scope" class="action">
              <el-button size="mini" type="text" @click="deleteData(scope.row)">删除</el-button>
              <el-button
                size="mini"
                type="text"
                @click="handleDialog('edit',scope.row, scope.$index)"
              >编辑</el-button>
            </div>
          </el-table-column>
        </el-table>
      </el-row>
      <el-row ref="page-bar" class="page-bar" type="flex" justify="center">
        <pagination
          :page-size.sync="searchForm.pageSize"
          :page-no.sync="searchForm.pageNo"
          :total="total"
          @sizeChange="pageSizeChange"
          @currentChange="pageNoChange"
        />
      </el-row>
    </el-row>
    <dialog-form
      :visible.sync="addEditVisible"
      :operation="addEditOperation"
      :meta="addEditMeta"
    />
  </el-row>
</template>

<script>
import Pagination from '../Pagination'
import DialogForm from './DialogForm'
import PageTitle from '@/views/components-demo/PageTitle'
import { isCharacterValidator } from '@/utils/validate'
import { formatDate } from '@/utils'
export default {
  name: '',

  components: { DialogForm, Pagination, PageTitle },

  mixins: [],

  props: {},

  data() {
    return {
      selectedDate: [], // 选择时间
      /* 表格查询参数 */
      searchForm: {
        dataElementType: '-1',
        keyword: '',
        beginTime: null,
        endTime: null,
        pageNo: 1,
        pageSize: 10
      },
      /* 表格查询参数校验规则 */
      searchFormRules: {
        dataElementType: [
          // { required: true, message: '请选择数据元分类', trigger: 'change' }
        ],
        keyword: [
          { validator: isCharacterValidator, trigger: 'blur' }
          // { required: true, message: '请输入活动名称', trigger: 'blur' },
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      addEditVisible: false, // 新增和编辑的弹窗访问标志
      addEditOperation: 'add', // 新增或编辑的标识
      addEditMeta: {}, // 新增或编辑的信息
      total: 5, // 查询的总数量
      tipContent: false, // 表格加载状态
      tableData: [], // 表格总数据量
      tableHeight: null, // 表格高度,用于自适应(初始值必须为null)
      dataElementList: [],
      // 时间选择器配置项
      pickerOptions: {
        /**
         * 日期禁选配置，禁止选择当天之后的日期。
         * @param date 日期，当该日期大于当前日期则禁用
         */
        disabledDate(date) {
          // const currentDate = new Date();
          // currentDate.setHours(23);
          // currentDate.setMinutes(59);
          // currentDate.setSeconds(59);
          // currentDate.setMilliseconds(999);
          // return date.getTime() > currentDate.getTime();
        }
      }
    }
  },

  computed: {},

  watch: {},

  created() {
    this.handleSearch()
  },

  mounted() {
    this.resizeTableHeight()
  },

  destroyed() {},

  methods: {

    /**
     * @description: 日期选择器被改变时的回调
     */
    dateChange() {
      this.searchForm.beginTime = formatDate(
        new Date(this.selectedDate[0]),
        'yyyy-MM-dd'
      )
      this.searchForm.endTime = formatDate(
        new Date(this.selectedDate[1]),
        'yyyy-MM-dd'
      )
    },

    /**
     * @description: 处理新增或编辑
     * @param {String} operation 标识
     * @param {Object} row 编辑的行
     * @param {Number} index 编辑的index
     */
    handleDialog(operation, row = null, index = null) {
      this.addEditOperation = operation
      if (operation === 'add') {
        console.log('add')
      } else {
        console.log('edit')
      }

      this.addEditVisible = true
    },

    /**
     * @description: 删除数据
     * @param {Object} row
     */
    async deleteData(row) {
      try {
        await this.$confirm('确定删除这条数据？', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        const res = await this.$axios.get('/test')
        if (res === true) {
          this.getTableData(this.searchForm) // 重新刷新表格
          this.$message({
            showClose: true,
            duration: 2000,
            message: '删除成功',
            type: 'success'
          })
        }
      } catch (error) {
        console.error(error)
      }
    },

    /**
     * @description: 点击查询
     */
    handleSearch() {
      this.searchForm.pageNo = 1
      this.getTableData(this.searchForm)
    },

    /**
     * @description: 获取表格数据
     * @param {Object} searchParams 查询参数
     */
    async getTableData(searchParams) {
      try {
        this.tipContent = 'loading'
        // const res = await this.$axios.get('/test', { params: this.searchForm });
        const res = {
          total: 100,
          data: [
            { name: '测试数据' },
            { name: '测试数据' },
            { name: '测试数据' },
            { name: '测试数据' },
            { name: '测试数据' },
            { name: '测试数据' },
            { name: '测试数据' },
            { name: '测试数据' },
            { name: '测试数据' },
            { name: '测试数据' },
            { name: '测试数据' },
            { name: '测试数据' },
            { name: '测试数据' },
            { name: '测试数据' },
            { name: '测试数据' },
            { name: '测试数据' }
          ]
        }
        if (res.data.length > 0 || this.searchForm.pageNo === 1) {
          this.tableData = res.data
          this.tipContent = this.tableData.length ? false : 'empty'
          this.total = res.total
          this.layoutTable()
        } else {
          // 如果没有数据并且请求的不是第一页却没有数据，自动请求最后一页数据（用来解决调转页码无数据时的bug,可视项目情况处理）
          this.searchForm.pageNo = Math.ceil(
            res.total / this.searchForm.pageSize
          ) // 计算最后一页页码
          this.getTableData(searchParams)
        }
      } catch (error) {
        console.error(error)
        this.tipContent = 'error'
        this.tableData = []
        this.total = 0
        this.searchForm.pageNo = 1
      }
    },

    /**
     * @description: 校验表单数据
     */
    async validateForm() {
      return new Promise((resolve, reject) => {
        this.$refs.searchForm.validate((valid) => {
          if (!valid) {
            reject('校验失败')
          } else {
            resolve(true)
          }
        })
      })
    },

    /**
     * @description: 移除表单项的校验结果
     * @param {String} props 传入待移除的表单项的 prop 属性或者 prop 组成的数组，如不传则移除整个表单的校验结果
     */
    clearFormValidate(props = []) {
      this.$nextTick(() => {
        if (this.$refs.searchForm) {
          this.$refs.searchForm.clearValidate(props)
        }
      })
    },

    /**
     * @description:对表格重新布局，解决特殊情况下表格错位的问题
     */
    layoutTable() {
      this.$nextTick(() => {
        if (this.$refs.table) {
          this.$refs.table.doLayout() // 重新布局解决表格错位
        }
      })
    },

    /**
     * @description: 监听窗口变化，动态设置表格高度
     */
    resizeTableHeight() {
      this.setTableHeight()
      const elementResizeDetectorMaker = require('element-resize-detector') // 监听元素长宽变化的插件
      const listener = elementResizeDetectorMaker()
      listener.listenTo(this.$refs.wrap.$el, (element) => {
        this.setTableHeight()
      })
    },

    /**
     * @description: 计算表格自适应高度
     */
    setTableHeight() {
      this.$nextTick(() => {
        const appMain = document.querySelector('.app-main')
        if (
          !this.$refs['searchFormBox'] ||
          !this.$refs['pageTitle'] ||
          !this.$refs['page-bar']
        ) {
          return
        }
        const wrapHeight = appMain.offsetHeight // 容器总高度
        const headerHeight = this.$refs['pageTitle'].$el.offsetHeight // 头部高度
        const searchBoxHeight = this.$refs['searchFormBox'].$el.offsetHeight // 搜索条件的高
        const pageBarHeight = this.$refs['page-bar'].$el.offsetHeight // 分页组件高度
        /*  计算表格高度 106 = 各种padding margin */
        this.tableHeight = wrapHeight - headerHeight - searchBoxHeight - pageBarHeight - 50 - 30 - 30
        this.layoutTable()
      })
    },

    /**
     * @description: 切换每页条数时的回调
     * @param {Number}  currentPageSize 当前设置的每页条数
     */
    pageSizeChange(currentPageSize) {
      this.searchForm.pageSize = currentPageSize
      this.searchForm.pageNo = 1
      this.getTableData(this.searchForm)
    },

    /**
     * @description: 切换页码时的回调
     * @param {Number}  currentPage
     */
    pageNoChange(currentPage) {
      this.searchForm.pageNo = currentPage
      this.getTableData(this.searchForm)
    },

    /**
     * @description:设置row的className
     * @param {Object}
     */
    tabRowClassName({ row, rowIndex }) {
      const index = rowIndex + 1
      if (index % 2 === 0) {
        return 'striped-row'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
// 设置表格的样式
::v-deep .striped-row {
  background: #fcfeff;
}
.data-element {
  height: 100%;
  &-container {
    padding: 15px;
    background: #fff;
    .search-form-box {
      .search-form {
        .el-form-item {
          margin-bottom: 0px;
        }
        button {
          padding: 7px 25px;
        }
      }
    }

    .table-box {
      margin: 15px 0;
    }
  }
}
</style>
