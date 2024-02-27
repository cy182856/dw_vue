<template>
  <el-submenu v-if="menu.children && menu.children.length >= 1" :index="'' + menu.seqNo">
    <template slot="title">
      <div v-if="menu.icon" class="circle-big-btn menu-icon btn-default-color" @click="onOpen(menu.seqNo)">
        <el-badge v-if="menu.resName == '' && collapse == true" class="badge-icon" is-dot>
          <i :class="menu.icon" />
        </el-badge>
        <template v-else>
          <i :class="menu.icon" />
        </template>
      </div>
      <span slot="title">
        <el-badge v-if="menu.resName == ''" class="badge-icon" is-dot>{{ menu.resName }}</el-badge>
        <template v-else>{{ menu.resName }}</template>
      </span>
    </template>
    <MenuTree v-for="item in menu.children" :key="item.id" :menu="item" />
  </el-submenu>
  <el-menu-item v-else :index="'' + menu.seqNo" @click="handleRoute(menu)">
    <i :class="menu.icon" />
    <span slot="title">{{ menu.resName }}</span>
  </el-menu-item>
</template>

<script>
export default {
  name: 'MenuTree',
  props: {
    menu: {
      type: Object,
      required: true
    }
  },
  methods: {
    handleRoute(menu) {
      const resUrl = menu.resUrl.substring(0, 1) === '/' ? menu.resUrl : '/' + menu.resUrl
      if (this.$route.path !== resUrl) {
        //  清空查询条件
        this.$store.dispatch('saveSearchParam', { path: resUrl, searchParam: null })
      }
      // 通过菜单URL跳转至指定路由
      this.$router.push(resUrl)
    },
    onOpen(menu) {
      this.$emit('show')
    }
  }
}
</script>

<style scoped lang="scss">
i{
  margin-right: 5px
}
</style>
