<template>
  <div class="wrap">
    <!-- <div ref="chart" style="width:800px;height:500px;" /> -->
    <div :id="id" :class="className" :style="{height:height,width:width}" />
  </div>
</template>

<script>
import echarts from 'echarts'
import resize from './mixins/resize'

export default {
  name: '',
  components: {},
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    id: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '200px'
    },
    height: {
      type: String,
      default: '200px'
    }
  },
  data() {
    return {
      parentPieData: [
        {
          value: 300,
          name: '类型1',
          children: [
            { value: 33215, name: '子类1' },
            { value: 31210, name: '子类2' },
            { value: 23114, name: '子类3' }
          ]
        },
        {
          value: 200,
          name: '其他',
          children: [
            { value: 3215, name: '子类1' },
            { value: 1210, name: '子类2' },
            { value: 2114, name: '子类3' },
            { value: 1234, name: '子类4' }
          ]
        },
        {
          value: 400,
          name: '类型2',
          children: [
            { value: 33215, name: '子类1' },
            { value: 1210, name: '子类2' }
          ]
        },

        {
          value: 600,
          name: '类型3',
          children: [
            { value: 33215, name: '子类1' },
            { value: 33215, name: '子类2' }
          ]
        }
      ],
      childrenPieData: [
        { value: 1234, name: '子类1' },
        { value: 2321, name: '子类2' },
        { value: 4114, name: '子类3' }
      ],
      chart: null
    }
  },
  mounted() {
    this.initChart()
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      const option = this.getOption(this.parentPieData, this.childrenPieData)
      this.chart = echarts.init(document.getElementById(this.id))
      this.chart.setOption(option)
      this.chart.on('click', (param) => {
        if (param.seriesName === '母饼图') {
          this.childrenPieData = param.data.children
          const option = this.getOption(
            this.parentPieData,
            this.childrenPieData,
            param.dataIndex
          )
          this.chart.setOption(option)
        }
      })
    },

    /**
     * 获取echart配置
     * @param {arry} parentData 母饼图数据
     * @param {arry} childrenData 子饼图数据
     * @param {number} currentIndex 选中饼图块的在母饼图数据的索引
     * @return echart配置
     */
    getOption(parentData, childrenData, currentIndex = 0) {
      let total = 0 // 母饼图数值总和
      let sum = 0 // 选中块前面饼图块数值总和（pi/2弧度顺时针开始算起）
      const currentValue = parentData[currentIndex].value // 选中块数值
      parentData.forEach((item, index) => {
        if (index < currentIndex) {
          sum += item.value
        }
        total += item.value
      })

      const parentPieCenter = [250, 250] // 母饼图圆心坐标
      const parentPieR = 150 // 母饼图半径
      const parentROffset = 0 // 母饼图半径偏移
      // 饼图块起点弧度（Echarts饼图默认从pi/2弧度顺时针开始画，所以需要如此计算）
      const sourceStartRadian = Math.PI / 2 - 2 * Math.PI * (sum / total)
      // 饼图块终点弧度
      const sourceEndRadian =
        sum > 0
          ? Math.PI / 2 - 2 * Math.PI * (sum / total + currentValue / total)
          : Math.PI / 2 - 2 * Math.PI * (currentValue / total) // 默认选中第一块

      // 计算母饼图选中块起点坐标
      const startPoint = this.computedCoord(
        parentPieCenter,
        parentPieR + parentROffset,
        sourceStartRadian
      )
      // 计算母饼图选中块终点坐标
      const endPoint = this.computedCoord(
        parentPieCenter,
        parentPieR + parentROffset,
        sourceEndRadian
      )

      let parentItemHeightPoint = null // 比较高的点
      let parentItemBottomPoint = null // 比较低的点

      if (startPoint.y === endPoint.y) {
        // 两个点一样高
        parentItemHeightPoint = startPoint
        parentItemBottomPoint = endPoint
      } else {
        // y值越小越高
        parentItemHeightPoint =
          Math.min(startPoint.y, endPoint.y) === startPoint.y
            ? startPoint
            : endPoint
        parentItemBottomPoint =
          Math.max(startPoint.y, endPoint.y) === startPoint.y
            ? startPoint
            : endPoint
      }

      const childrenPieCenter = [700, 250] // 子饼图圆心坐标
      const childrenPieR = 75 // 子饼图半径
      // 计算子饼图顶部坐标
      const childrenTopPoint = this.computedCoord(
        childrenPieCenter,
        childrenPieR,
        Math.PI / 2
      )
      // 计算子饼图底部坐标
      const childrenBottomPoint = this.computedCoord(
        childrenPieCenter,
        childrenPieR,
        -Math.PI / 2
      )
      // 返回echarts配置
      return {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        series: [
          {
            name: '母饼图',
            type: 'pie',
            radius: parentPieR,
            center: parentPieCenter,
            data: parentData,
            markLine: {
              symbol: ['none', 'none'], // 去掉箭头
              lineStyle: { type: 'dashed', color: '#409EFF' },
              label: {
                show: false
              },
              data: [
                [
                  {
                    name: '起点1',
                    x: parentItemHeightPoint.x,
                    y: parentItemHeightPoint.y
                  },
                  {
                    x: childrenTopPoint.x,
                    y: childrenTopPoint.y
                  }
                ],
                [
                  {
                    name: '起点2',
                    x: parentItemBottomPoint.x,
                    y: parentItemBottomPoint.y
                  },
                  {
                    x: childrenBottomPoint.x,
                    y: childrenBottomPoint.y
                  }
                ]
              ]
            },
            itemStyle: {
              borderColor: '#fff',
              borderWidth: 2
            }
          },
          {
            name: '子饼图',
            type: 'pie',
            radius: childrenPieR,
            center: childrenPieCenter,
            label: {
              position: 'inner'
            },
            labelLine: {
              show: false
            },
            data: childrenData,
            itemStyle: {
              borderColor: '#fff',
              borderWidth: 2
            }
          }
        ]
      }
    },

    /**
     * 计算圆周上各点的坐标（圆周位于直角坐标系第四象限）
     * @param {arry} center 圆心坐标 [x,y]
     * @param {number} radius 圆周半径
     * @param {number} radian 点在圆周上的弧度（x轴正方向开始）
     * @return {object} 圆周上点相对于圆心的坐标 如：{x:100,y:100}
     */
    computedCoord(center, radius, radian) {
      // 根据圆周所在象限变更加减号
      return {
        x: center[0] + Math.cos(radian) * radius,
        y: center[1] - Math.sin(radian) * radius
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.wrap {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
