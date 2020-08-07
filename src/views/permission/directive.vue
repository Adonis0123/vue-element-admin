<template>
  <div class="app-container">
    <switch-roles @change="handleRolesChange" />
    <div :key="key" style="margin-top:30px;">
      <div>
        <span v-permission="['admin']" class="permission-alert">
          只有
          <el-tag class="permission-tag" size="small">admin</el-tag> 才能看到这段内容
        </span>
        <span v-permission="['admin']" class="permission-alert">
          代码：
          <el-tag class="permission-sourceCode" type="info" @click="handleCopy($event)">
            v-permission="['admin']"
          </el-tag>
        </span>

      </div>

      <div>
        <span v-permission="['editor']" class="permission-alert">
          只有
          <el-tag class="permission-tag" size="small">editor</el-tag> 才能看到这段内容
        </span>
        <span v-permission="['editor']" class="permission-alert">
          代码：
          <el-tag class="permission-sourceCode" type="info" @click="handleCopy($event)">
            v-permission="['editor']"
          </el-tag>
        </span>
      </div>

      <div>
        <span v-permission="['admin','editor']" class="permission-alert">
          <el-tag class="permission-tag" size="small">admin</el-tag> 或者
          <el-tag class="permission-tag" size="small">editor</el-tag> 能看到这段内容
        </span>
        <span v-permission="['admin','editor']" class="permission-alert">
          代码：
          <el-tag class="permission-sourceCode" type="info" @click="handleCopy($event)">
            v-permission="['admin','editor']"
          </el-tag>
        </span>
      </div>
    </div>

    <div :key="'checkPermission'+key" style="margin-top:60px;">
      <aside>
        在某些情况下，不适合使用 v-permission。例如：Element-UI 的 el-tab 或 el-table-column 以及其它动态渲染 dom 的场景。你只能通过手动设置 v-if 来实现。
        <br>
        例如下面例子：
      </aside>

      <el-tabs type="border-card" style="width:550px;">
        <el-tab-pane v-if="checkPermission(['admin'])" label="Admin">
          Admin 能看到这段内容
          <el-tag class="permission-sourceCode" type="info" @click="handleCopy($event)">
            v-if="checkPermission(['admin'])"
          </el-tag>
        </el-tab-pane>

        <el-tab-pane v-if="checkPermission(['editor'])" label="Editor">
          Editor 能看到这段内容
          <el-tag class="permission-sourceCode" type="info" @click="handleCopy($event)">
            v-if="checkPermission(['editor'])"
          </el-tag>
        </el-tab-pane>

        <el-tab-pane v-if="checkPermission(['admin','editor'])" label="Admin或者Editor">
          admin 或者 editor 能看到这段内容
          <el-tag class="permission-sourceCode" type="info" @click="handleCopy($event)">
            v-if="checkPermission(['admin','editor'])"
          </el-tag>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import permission from '@/directive/permission/index.js' // 权限判断指令
import checkPermission from '@/utils/permission' // 权限判断函数
import SwitchRoles from './components/SwitchRoles'
import clip from '@/utils/clipboard' // use clipboard directly
export default {
  name: 'DirectivePermission',
  components: { SwitchRoles },
  directives: { permission },
  data() {
    return {
      key: 1 // 为了能每次切换权限的时候重新初始化指令
    }
  },
  methods: {
    checkPermission,
    handleRolesChange() {
      this.key++
    },
    handleCopy(event) {
      const text = event.toElement.innerText
      clip(text, event)
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  ::v-deep .permission-alert {
    width: 320px;
    margin-top: 15px;
    margin-right: 20px;
    background-color: #f0f9eb;
    color: #67c23a;
    padding: 8px 16px;
    border-radius: 4px;
    display: inline-block;
  }
  ::v-deep .permission-sourceCode {
      cursor: pointer;
  }
  ::v-deep .permission-tag {
    background-color: #ecf5ff;
  }
}
</style>

