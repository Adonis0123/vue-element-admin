<!--
 * @Author: Hzh
 * @Date: 2020-09-14 09:38:49
 * @LastEditTime: 2020-09-21 09:50:12
 * @LastEditors: Hzh
 * @Description:页面小标题
-->
<script>
export default {
  name: 'PageTitle',
  functional: true,
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  render(h, context) {
    const { title } = context.props
    const { ref } = context.data
    const vnodes = []
    if (title) {
      vnodes.push(<el-row ref={(ref)} class='page-title'>{(title)}</el-row>)
    }
    return vnodes
  }
}
</script>

<style lang="scss" scoped>
  .page-title {
    background: #fff;
    padding: 15px;
    @include textXl();
    margin-bottom: 16px;
  }
</style>
