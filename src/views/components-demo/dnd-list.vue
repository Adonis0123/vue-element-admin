<!--
 * @Author: Hzh
 * @Date: 2020-07-22 18:16:18
 * @LastEditTime: 2020-08-06 14:21:38
 * @LastEditors: Hzh
 * @Description:拖拽列表演示
-->

<template>
  <div class="components-container">
    <aside class="aside">drag-list base on
      <a href="https://github.com/SortableJS/Vue.Draggable" target="_blank">Vue.Draggable</a>
    </aside>
    <div class="editor-container">
      <dnd-list :list1="list1" :list2="list2" list1-title="List" list2-title="Article pool" />
    </div>
  </div>
</template>

<script>
import DndList from '@/components/DndList'
import { fetchList } from '@/api/article'

export default {
  name: 'DndListDemo',
  components: { DndList },
  data() {
    return {
      list1: [],
      list2: []
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      this.listLoading = true
      fetchList().then(response => {
        this.list1 = response.data.items.splice(0, 5)
        this.list2 = response.data.items
      })
    }
  }
}
</script>

