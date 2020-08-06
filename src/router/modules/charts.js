/*
 * @Author: Hzh
 * @Date: 2020-07-22 18:16:18
 * @LastEditTime: 2020-08-06 18:56:44
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
    title: '图表',
    icon: 'chart'
  },
  children: [
    {
      path: 'mix-chart',
      component: () => import('@/views/charts/mix-chart'),
      name: 'MixChart',
      meta: { title: 'Mix Chart', noCache: true }
    }
  ]
}

export default chartsRouter
