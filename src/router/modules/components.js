/*
 * @Author: Hzh
 * @Date: 2020-07-22 18:16:18
 * @LastEditTime: 2020-09-21 10:32:16
 * @LastEditors: Hzh
 * @Description:组件库
 */

import Layout from '@/layout'

const componentsRouter = {
  path: '/components',
  component: Layout,
  redirect: 'noRedirect',
  name: 'ComponentDemo',
  sort: 4,
  meta: {
    title: '组件库',
    icon: 'component'
  },
  children: [
    {
      path: 'ele-form',
      component: () => import('@/views/components-demo/ele-form'),
      name: 'EleForm',
      meta: { title: 'ele表单' }
    },
    {
      path: 'ele-dialog-form',
      component: () => import('@/views/components-demo/ele-dialog-form'),
      name: 'DialogForm',
      meta: { title: 'ele对话框表单' }
    },
    {
      path: 'ele-table',
      component: () => import('@/views/components-demo/ele-table'),
      name: 'EleTable',
      meta: { title: 'ele表格' }
    },
    {
      path: 'tinymce',
      component: () => import('@/views/components-demo/tinymce'),
      name: 'TinymceDemo',
      meta: { title: '富文本编辑器' }
    },
    {
      path: 'markdown',
      component: () => import('@/views/components-demo/markdown'),
      name: 'MarkdownDemo',
      meta: { title: 'Markdown' }
    },
    {
      path: 'sticky',
      component: () => import('@/views/components-demo/sticky'),
      name: 'StickyDemo',
      meta: { title: 'Sticky 吸顶效果' }
    },

    {
      path: 'mixin',
      component: () => import('@/views/components-demo/mixin'),
      name: 'ComponentMixinDemo',
      meta: { title: '小组件' }
    },
    {
      path: 'back-to-top',
      component: () => import('@/views/components-demo/back-to-top'),
      name: 'BackToTopDemo',
      meta: { title: '返回顶部' }
    },
    {
      path: 'drag-dialog',
      component: () => import('@/views/components-demo/drag-dialog'),
      name: 'DragDialogDemo',
      meta: { title: '拖拽 Dialog（弹出框）' }
    },
    {
      path: 'drag-select',
      component: () => import('@/views/components-demo/drag-select'),
      name: 'DragSelectDemo',
      meta: { title: '拖拽 Select（多选框）' }
    },
    {
      path: 'dnd-list',
      component: () => import('@/views/components-demo/dnd-list'),
      name: 'DndListDemo',
      meta: { title: '拖拽 列表' }
    },
    {
      path: 'drag-kanban',
      component: () => import('@/views/components-demo/drag-kanban'),
      name: 'DragKanbanDemo',
      meta: { title: '拖拽 看板' }
    }
  ]
}

export default componentsRouter
