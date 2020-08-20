<template>
  <el-form
    ref="form"
    v-loading="formLoading"
    :model="form"
    :rules="rules"
    class="form"
    :inline="false"
    label-width="100px"
    label-position="right"
  >
    <el-form-item label="姓名" prop="name">
      <el-input v-model="form.name" placeholder="请输入" />
    </el-form-item>
    <el-form-item label="出生日期" prop="birthDate">
      <el-date-picker
        v-model="form.birthDate"
        style="width:100%;"
        placeholder="请选择"
        :clearable="false"
        type="date"
        value-format="yyyy-MM-dd"
      />
    </el-form-item>
    <el-form-item label="性别" prop="sex">
      <el-radio v-model="form.sex" :label="0">男</el-radio>
      <el-radio v-model="form.sex" :label="1">女</el-radio>
    </el-form-item>
    <el-form-item label="学历" prop="education">
      <el-select
        v-model="form.education"
        style="width:100%;"
        clearable
        filterable
        placeholder="请选择"
      >
        <el-option :label="'大学'" :value="1" />
        <el-option :label="'高中'" :value="2" />
      </el-select>
    </el-form-item>
    <el-form-item label="爱好" prop="love">
      <el-checkbox-group v-model="form.love">
        <el-checkbox :label="1">
          <span>写代码</span>
        </el-checkbox>
        <el-checkbox :label="2">
          <span>打球</span>
        </el-checkbox>
      </el-checkbox-group>
    </el-form-item>

    <el-form-item style="text-align:center;">
      <el-button @click="resetForm">重置</el-button>
      <el-button @click="saveForm">保存</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: '',
  components: {},
  props: {
    // 表单操作 add|edit
    operation: {
      type: String,
      default: 'add'
    },
    // 表单标识信息，如id
    meta: {
      type: null,
      default: null
    }
  },

  data() {
    return {
      formLoading: false,
      saveLoading: false,

      defaultForm: {
        name: null,
        birthDate: null,
        sex: null,
        education: null,
        love: []
      },
      form: {},
      rules: {
        name: [
          { required: true, message: '不能为空', trigger: 'blur' }
          //   { validator: this.customValid, trigger: 'blur' }
        ],
        education: [{ required: true, message: '不能为空', trigger: 'change' }]
      }
    }
  },
  created() {
    this.resetForm()
  },
  methods: {
    /**
     * 自定义校验规则
     */
    customValid(rule, value, callback) {
      const reg = new RegExp(/^https?:\/\/.*$/)
      if (value === '') {
        callback()
      } else if (!reg.test(value)) {
        callback(new Error('必须以https://或http://开头'))
      } else {
        callback()
      }
    },
    /**
     * 重置表单数据
     */
    resetForm() {
      // this.$refs.form.resetFields();
      this.form = JSON.parse(JSON.stringify(this.defaultForm))
      this.clearFormValidate()
    },

    /**
     * 校验表单数据
     */
    async validateForm() {
      return new Promise((resolve, reject) => {
        this.$refs.form.validate((valid) => {
          if (!valid) {
            reject('校验失败')
          } else {
            resolve(true)
          }
        })
      })
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
     * 获取被编辑的数据
     */
    async getForm() {
      try {
        this.formLoading = true
        const res = await this.$axios.get('test')
        this.formLoading = false
        if (res.name) {
          this.form = res
        } else {
          this.resetForm()
        }
      } catch (error) {
        this.formLoading = false
        this.resetForm()
      }
    },

    /**
     * 保存表单
     */
    async saveForm() {
      try {
        await this.validateForm()
        this.saveLoading = true
        this.operation === 'add'
          ? await this.addForm()
          : await this.editForm()
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
     * 添加表单
     * @return {Promise}
     */
    async addForm() {
      const form = JSON.parse(JSON.stringify(this.form))
      const res = await this.$axios.post('/postTest', form)
      return res
    },

    /**
     * 编辑表单
     * @return {Promise}
     */
    async editForm() {
      const form = JSON.parse(JSON.stringify(this.form))
      const res = await this.$axios.post('/postTest', form)
      return res
    }
  }
}
</script>

<style lang="scss" scoped>
.el-form {
  ::v-deep .el-form-item {
    .el-form-item__content {
      text-align: left;
    }
  }
}
</style>
