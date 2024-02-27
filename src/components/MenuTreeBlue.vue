<template>
  <el-submenu v-if="menu.children && menu.children.length >= 1" :index="'' + menu.seqNo" class="blueMenu">
    <template slot="title">
      <div v-if=" menu.icon" class="menu-icon" style="background: none;box-shadow: none" @click="onOpen(menu.seqNo)">
        <el-badge v-if="menu.resName == ''" class="badge-icon" is-dot>
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
    <MenuTreeBlue v-for="item in menu.children" :key="item.id" :menu="item" />
  </el-submenu>
  <el-menu-item v-else :index="'' + menu.seqNo" @click="handleRoute(menu)">
    <i :class="menu.icon" />
    <span slot="title">{{ menu.resName }}</span>
  </el-menu-item>
</template>

<script>
export default {
  name: 'MenuTreeBlue',
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

<style  lang="scss">
.blueMenu {
  .menu-icon i{
    font-size: 20px !important;
  }

  i {
    color: #ffffff !important;

  }
  .el-submenu__title {
    span {
      color: #ffffff !important;
    }
  }
  .el-menu-item {
    span {
      color: #ffffff !important;
    }
  }
  .el-submenu__icon-arrow {
    display: block !important;
  }
  .menu-icon {
    margin-right: 12px !important;
  }
  &.is-opened .menu-icon{
    margin-right: 16px !important;
  }
  .el-submenu__icon-arrow{
    font-size: 12px;
    transform: rotateZ(-90deg);
  }

}
.el-submenu.is-opened>.el-submenu__title .el-submenu__icon-arrow{
   transform: rotateZ(0deg) !important;
}
.el-menu-vertical:not(.el-menu--collapse) {
  width: 180px;
}
#app[data-theme=Light] .blueMenu{
   .iconiconfontpaixingbang {
    font-size: 16px !important;
  }
  .iconsuanshu {
    font-size: 16px !important;
  }
  .iconshenpi {
    font-size: 22px !important;
  }
  // .iconresume-s {
  .icon-shenpi1:before {
    // font-size: 24px !important;
    font-size: 15px !important;
  }
}

</style>
