<template>
  <el-dialog
    :title="`${operation === 'add' ? '新增' : '编辑'}`"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    width="880px"
  >
    <div v-loading="dialogLoading" class="wrap">
      <el-row class="form-box">
        <el-form
          ref="form"
          :model="form"
          label-width="120px"
          label-position="right"
          :rules="formRules"
          class="form"
          @submit.native.prevent
        >
          <el-row>
            <el-col :span="12">
              <el-form-item label="数据元分类" prop="dataElementType">
                <el-row type="flex" align="middle">
                  <el-select
                    v-model="form.dataElementType"
                    placeholder="请选择"
                    size="mini"
                    style="width:260px;"
                  >
                    <el-option
                      v-for=" item in dataElementList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    />
                  </el-select>
                </el-row>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="数据元标识符" prop="identifier">
                <el-input
                  v-model.trim="form.identifier"
                  size="mini"
                  placeholder="格式：XXNN.NN.NNN.NN"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="数据元名称" prop="name">
            <el-input v-model.trim="form.name" size="mini" placeholder=" " />
          </el-form-item>
          <el-form-item label="数据元定义" prop="definition">
            <el-input
              v-model.trim="form.definition"
              :rows="3"
              type="textarea"
              size="mini"
              placeholder=" "
            />
          </el-form-item>
          <el-row>
            <el-col :span="12">
              <el-form-item label="数据类型" prop="dataType">
                <el-select
                  v-model="form.dataType"
                  placeholder="请选择"
                  size="mini"
                  style="width:300px;"
                >
                  <el-option
                    v-for=" item in dataTypeList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="表示格式" prop="format">
                <el-select v-model="form.format" placeholder="请选择" size="mini" style="width:300px;">
                  <el-option
                    v-for=" item in dataFormatList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="数据长度" prop="dataLength">
                <el-select
                  v-model="form.dataLength"
                  placeholder="请选择"
                  size="mini"
                  style="width:300px;"
                >
                  <el-option
                    v-for=" item in dataLengthList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="长度设置" prop="setLength">
                <el-input v-model.trim="form.setLength" size="mini" placeholder="固定长度" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="数据元允许值" prop="allowVal">
            <el-input v-model.trim="form.allowVal" size="mini" placeholder=" " />
          </el-form-item>
        </el-form>
      </el-row>
      <el-row class="btn" type="flex" align="middle" justify="center">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" :loading="saveLoading" @click="saveForm">保存</el-button>
      </el-row>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: '',
  components: {},
  props: {
    visible: {
      type: Boolean,
      default: false,
      required: true
    },
    // 表单操作 add|edit
    operation: {
      type: String,
      required: true
    },
    // 表单标识信息，如id
    meta: {
      type: null,
      default: null
    }
  },
  data() {
    return {
      saveLoading: false,
      dialogVisible: this.visible,
      dialogLoading: false,
      /* 表单参数 */
      form: {
        dataElementType: '', // 数据元分类
        identifier: '', // 标识符
        name: '', // 数据元名称
        definition: '', // 数据元定义
        dataType: '', // 数据类型
        format: '', // 表示格式
        dataLength: '', // 数据长度
        setLength: '', // 长度设置
        allowVal: '' // 允许值
      },
      /*    表单参数校验规则 */
      formRules: {
        dataElementType: [
          { required: true, message: '请选择数据元分类', trigger: 'change' }
        ],
        identifier: [
          { required: true, message: '请输入数据元标识符', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入数据元标名称', trigger: 'blur' }
        ],
        definition: [
          { required: true, message: '请输入数据元标定义', trigger: 'blur' }
        ],
        dataType: [
          { required: true, message: '请选择数据类型', trigger: 'change' }
        ],
        format: [{ required: true, message: '请选择格式', trigger: 'change' }],
        dataLength: [
          { required: true, message: '请选择数据长度', trigger: 'change' }
        ],
        setLength: [{ required: true, message: '请设置长度', trigger: 'blur' }],
        keyword: [
          // { validator: isCharacterValidator, trigger: 'blur' }
          // { required: true, message: '请输入活动名称', trigger: 'blur' },
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      dataElementList: [], // 数据元分类
      dataTypeList: [], // 数据类型
      dataFormatList: [], // 表示格式
      dataLengthList: [] // 数据长度
    }
  },
  watch: {
    visible: {
      deep: true,
      handler: function(newV, oldV) {
        this.dialogVisible = this.visible
        if (this.visible === true) {
          this.$nextTick(() => {
            this.resetForm()
            if (this.operation === 'edit') {
              // this.getForm()
            }
          })
        }
      }
    },
    dialogVisible: {
      deep: true,
      handler: function(newV, oldV) {
        this.$emit('update:visible', this.dialogVisible)
      }
    }
  },
  methods: {
    /**
     * @description: 重置表单数据
     */
    resetForm() {
      this.$refs.form.resetFields()
      this.clearFormValidate()
    },

    /**
     * 移除表单项的校验结果
     * @param props 传入待移除的表单项的 prop 属性或者 prop 组成的数组，如不传则移除整个表单的校验结果
     */
    clearFormValidate(props = []) {
      this.$nextTick(() => {
        if (this.$refs.form) {
          this.$refs.form.clearValidate(props)
        }
      })
    },

    /**
     * @description: 校验表单数据
     */
    async validateForm() {
      return new Promise((resolve, reject) => {
        this.$refs.form.validate((valid) => {
          if (!valid) {
            console.log('检验失败')
            reject('校验失败')
          } else {
            resolve(true)
          }
        })
      })
    },

    /**
     * @description: 获取被编辑的数据
     * @param {type}
     */
    async getForm() {
      this.dialogLoading = true
      // await Promise.all([this.$refs.SKForm.getForm()])
      this.dialogLoading = false
    },

    /**
     * @description: 保存表单
     */
    async saveForm() {
      try {
        await this.validateForm()
        this.saveLoading = true
        this.operation === 'add' ? await this.addForm() : await this.editForm()
        this.saveLoading = false
        this.$notify({
          showClose: true,
          duration: 2000,
          message: '保存成功',
          type: 'success'
        })
        this.$emit('submitted', true)
      } catch (error) {
        this.saveLoading = false
      }
    },

    /**
     * @description: 新增
     */
    async addForm() {
      console.log(this.form)
      // const form = JSON.parse(JSON.stringify(this.form));
      // const res = await this.$axios.post('/postTest', form);
      // return res;
    },

    /**
     * @description: 编辑
     */
    async editForm() {
      // const form = JSON.parse(JSON.stringify(this.form));
      // const res = await this.$axios.post('/postTest', form);
      // return res;
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-dialog {
  .el-dialog__header {
    box-sizing: border-box;
    border-bottom: 1px solid #dcdfe6;
  }

  .el-dialog__body {
    // .icon-edit {
    //   width: 20px;
    //   height: 20px;
    //   margin: 0 10px;
    //   cursor: pointer;
    //   // &:hover {
    //   //   color: $--color-primary;
    //   // }
    // }
    .btn {
      button {
        padding: 10px 26px;
      }
      .el-button + .el-button {
        margin-left: 20px;
      }
    }
  }
}
</style>
