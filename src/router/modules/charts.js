/*
 * @Author: Hzh
 * @Date: 2020-07-22 18:16:18
 * @LastEditTime: 2020-08-07 16:51:55
 * @LastEditors: Hzh
 * @Description:图表
 */

import Layout from '@/layout'

const chartsRouter = {
  path: '/charts',
  component: Layout,
  redirect: 'noRedirect',
  name: 'Charts',
  alwaysShow: true,
  sort: 5,
  meta: {
    title: '图表库',
    icon: 'chart'
  },
  children: [
    {
      path: 'mix-chart',
      component: () => import('@/views/charts/mix-chart'),
      name: 'MixChart',
      meta: { title: 'Mix Chart', noCache: true }
    },
    {
      path: 'gis-chart',
      component: () => import('@/views/charts/gis-chart'),
      name: 'GisChart',
      meta: { title: 'GIS地图', noCache: true }
    },
    {
      path: 'composite-pie-chart',
      component: () => import('@/views/charts/composite-pie-chart'),
      name: 'CompositePieChart',
      meta: { title: '复合饼图', noCache: true }
    }
  ]
}

export default chartsRouter
