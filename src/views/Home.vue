<template>
  <div class="home">
    <aside :class="isCollapse ? 'collapse' : ''">
      <div class="collapse" :class="isCollapse ? 'iscollapse' : ''">
        <span class="circle-btn btn-default-color" @click="changeCollapse">
          <i
            class="iconfont"
            :class="isCollapse ? 'iconyousuojin' : 'iconzuosuojin'"
          />
        </span>
      </div>
      <div
        class="logo"
        :class="isCollapse ? 'iscollapse' : ''"
        @click="
          $router.push('/');
          handleHomeClick();
        "
      >
        <img :src="isCollapse ? logo2 : logo">
      </div>
      <div :class="isCollapse ? 'iscollapse' : ''" class="menu-collection">
        <p class="menu-collection-box">
          <span
            class="circle-btn btn-default-color"
            :class="{ active: !isCollectionMenu }"
            @click="handleCollectionChange(false)"
          >
            <i class="el-icon-s-operation" />
          </span>
          <span
            class="circle-btn btn-default-color"
            :class="{ active: isCollectionMenu }"
            @click="handleCollectionChange(true)"
          ><i
            class="el-icon-star-on"
          /></span>
        </p>
      </div>
      <el-scrollbar
        :class="isCollapse ? 'iscollapse' : ''"
        class="menu-scrollLeft"
      >
        <div v-show="!isCollectionMenu" class="menu">
          <el-menu
            class="menu-box"
            unique-opened
            :collapse="isCollapse"
            :default-active="activeIndex"
            :default-openeds="openeds"
            @open="handleopen"
            @select="handleselect"
          >
            <!-- :collapse="isCollapse" -->
            <!-- 导航菜单树组件，动态加载菜单 -->
            <!-- <menu-tree v-for="item in menuList" :key="item.id" :menu="item" /> -->
            <div v-if="theme === 'Light'">
              <Menu-Tree-Blue
                v-for="item in menuList"
                :key="item.id"
                :menu="item"
                :collapse="isCollapse"
                @show="handOpen"
              />
            </div>
            <div v-else>
              <Menu-Tree
                v-for="item in menuList"
                :key="item.id"
                :menu="item"
                :collapse="isCollapse"
                @show="handOpen"
              />
            </div>
          </el-menu>
        </div>
        <div v-show="isCollectionMenu">
          <el-menu
            class="collection-menu"
            :collapse="isCollapse"
            :default-active="activeCollectionIndex"
            :default-openeds="openeds"
            @open="handleopen"
          >
            <el-menu-item
              v-for="item in favorites"
              :key="item.id"
              :index="item.id + ''"
              :title="item.resName"
              @click="handleCollectionMenuRoute(item)"
            >
              <i class="el-icon-star-off" />
              <span slot="title" class="title">{{ item.resName }}</span>
              <span
                class="collection-menu-del"
              ><i
                class="el-icon-close"
                @click="handleCollectionDel(item)"
              /></span>
            </el-menu-item>
          </el-menu>
        </div>
      </el-scrollbar>
    </aside>
    <div class="header">
      <div class="path">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">
            <span class="circle-btn home-icon btn-light-color">
              <i v-if="theme === 'Light'" class="iconfont icontianchongxing-" />
              <i v-else class="iconfont iconshouye" />
            </span>
            {{ $t("comm.home") }}
          </el-breadcrumb-item>
          <template v-for="item in breadcrumbItems">
            <el-breadcrumb-item
              v-if="item.resUrl"
              :key="item.id"
              :to="{ path: '/' + item.resUrl }"
            >
              {{ item.resName != "" ? item.resName : "" }}
            </el-breadcrumb-item>
            <el-breadcrumb-item v-else :key="item.id">
              {{ item.resName != "" ? item.resName : "" }}
            </el-breadcrumb-item>
          </template>
        </el-breadcrumb>
        <el-popover
          v-model="collectionVisible"
          placement="bottom"
          width="300"
          trigger="click"
          popper-class="popper-bg-white"
        >
          <el-form label-width="60px">
            <el-form-item label="名称" style="margin-bottom: 0">
              <el-input v-model="collectionName" />
            </el-form-item>
          </el-form>
          <div style="text-align: right; margin: 0">
            <ul
              class="operation-box dialog-btn-box fixed-btn-box end-content-flex"
            >
              <li class="operation-item" @click="collectionVisible = false">
                <span
                  class="operation-circle circle-middle-btn btn-light-color bluebg quxiao"
                ><i
                  class="iconfont iconquxiao"
                /></span>
                <span class="operation-text">{{ $t("comm.cancel") }}</span>
              </li>
              <li class="operation-item" @click="handleCollection()">
                <span
                  class="operation-circle circle-middle-btn btn-light-color bluebg"
                ><i
                  class="iconfont iconqueren"
                /></span>
                <span class="operation-text">{{ $t("comm.certain") }}</span>
              </li>
            </ul>
          </div>
          <i
            slot="reference"
            class="collection-icon el-icon-star-off"
            title="收藏此页面"
          />
        </el-popover>
      </div>
      <div class="userInfo">
        <el-dropdown trigger="click" @command="handleChangeOrg">
          <span class="el-dropdown-link userinfo-inner">
            <span class="circle-btn avatar-icon btn-light-color">
              <i class="iconfont icontouxiang" />
            </span>
            <span class="name">{{ userInfo.orgFullName }}</span>
            <span class="down-icon">
              <i class="iconfont iconai-arrow-down" />
            </span>
          </span>
          <el-dropdown-menu
            slot="dropdown"
            class="organizationDropDwon"
            :class="theme == 'Light' ? 'blueDwon' : ' '"
          >
            <el-dropdown-item
              v-for="item in userInfo.orgList"
              :key="item.orgId"
              style="text-align: left"
              :command="item.orgId"
            >
              {{ item.orgFullName }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="userInfo">
        <el-dropdown trigger="click" placement="bottom">
          <span class="el-dropdown-link userinfo-inner">
            <span class="circle-btn avatar-icon btn-light-color">
              <i class="iconfont icontouxiang" />
            </span>
            <span class="name">{{ userInfo.nickName }}</span>
            <span class="down-icon">
              <i class="iconfont iconai-arrow-down" />
            </span>
          </span>
          <el-dropdown-menu
            slot="dropdown"
            class="userDropDwon"
            :class="theme == 'Light' ? 'blueDwon' : ' '"
          >
            <el-dropdown-item @click.native="handleChangePasswordOpenClick">
              <i class="iconfont iconxiugaimima" />
              <span>{{ $t("comm.changePassword") }}</span>
            </el-dropdown-item>

            <el-dropdown-item class="logout" @click.native="logout">
              <i class="iconfont icontuichu4" />
              <span>{{ $t("comm.logout") }}</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <!-- <div class="theme-info">
        <el-dropdown trigger="click" placement="bottom">
          <span class="el-dropdown-link circle-btn btn-light-color theme-icon">
            <i class="iconfont iconyanse" />
          </span>
          <el-dropdown-menu slot="dropdown" class="themeDropDwon" :class="theme=='Light'? 'blueDwon':' '">
            <el-dropdown-item @click.native="onchangeTheme('Light')">
              白底
            </el-dropdown-item>
            <el-dropdown-item @click.native="onchangeTheme('Dark')">
              黑底
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div> -->
    </div>
    <div class="main">
      <transition name="fade" mode="out-in">
        <el-scrollbar class="scroll-left home_scrollvar" style="height: 100%">
          <router-view />
        </el-scrollbar>
      </transition>
    </div>
    <el-backtop
      target=".scroll-left .el-scrollbar__wrap"
      :bottom="140"
      :right="30"
    >
      <div class="circle-big-btn btn-light-color">
        <i class="iconfont iconicon3" />
      </div>
    </el-backtop>
    <!-- 变更密码 -->
    <change-user-password
      :is-show="resetDialog"
      @onClose="resetDialog = false"
    />
    <!-- 目标部门、基础部门 一览页面通用-->
    <dict-select v-show="false" dict-type-id="TARGETORG" />
    <dict-select v-show="false" dict-type-id="Dept" />
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import { saveActiveMenu } from '@/utils/storage'
import MenuTree from '@/components/MenuTree'
import MenuTreeBlue from '@/components/MenuTreeBlue'
import ChangeUserPassword from '@/views/comm/ChangeUserPassword'
import { formValidator } from '@/mixins/form-validator.js'
import * as types from '@/store/mutation-type'

export default {
  name: 'Home',
  inject: ['reload'],
  components: {
    MenuTree,
    MenuTreeBlue,
    ChangeUserPassword
  },
  mixins: [formValidator],
  data() {
    return {
      theme: 'Light',
      logo: require('@/assets/images/logo.png'),
      logo2: require('@/assets/images/logo2.png'),
      language: 'Cn',
      openeds: [],
      resetDialog: false,
      // 收藏菜单
      collectionVisible: false,
      // 菜单折起状态
      isCollapse: false,
      breadcrumbItems: [],
      // 默认选中菜单
      activeIndex: '',
      // 切换收藏菜单
      isCollectionMenu: false,
      activeCollectionIndex: '',
      collectionName: ''
    }
  },
  computed: {
    favorites: function() {
      if (this.userInfo.attrs && this.userInfo.attrs.favorites) {
        return this.userInfo.attrs.favorites
      } else {
        return []
      }
    },
    ...mapGetters([
      'userInfo',
      // 'userOrgList',
      'menuList'
    ])
  },
  watch: {
    $route(newValue, oldValue) {
      if (newValue) {
        const routeNew = { resName: newValue.name, resUrl: newValue.path }
        this.routeNew = routeNew
        if (newValue.path === '/') {
          this.breadcrumbItems = []
        }
      }
    }
  },
  created() {},
  mounted() {
    // // console.log('this.$route.router', this.$route)
    this.theme = localStorage.getItem('theme') || 'Light'
    const menuIndex = window.sessionStorage.getItem('activeMenu')
    document.getElementById('app').setAttribute('data-theme', this.theme)
    // this.setThemeDeploy()
    if (menuIndex) {
      this.activeIndex = menuIndex
      this.breadcrumbItems = []
      const seqNo = menuIndex.split(':')
      this.getSelectedMenus(this.menuList, seqNo)
      this.reURL = menuIndex
    }
  },
  methods: {
    handleChangeOrg(val) {
      if (this.userInfo.orgId !== val) {
        const newOrg = this.userInfo.orgList.find((item) => item.orgId === val)
        if (newOrg) {
          saveActiveMenu(null)
          this.$store.dispatch('changeOrgAction', val)
          this.$router.go(0)
        }
      }
    },
    // 切换主题
    onchangeTheme(item) {
      document.getElementById('app').setAttribute('data-theme', item)
      localStorage.setItem('theme', item)
      // this.changeSkin(item)
      this.$router.go(0)
      this.reload()
    },
    changeSkin(item) {
      // 节流防止疯狂点击
      if (change) {
        clearTimeout(change)
      }
      const change = setTimeout(() => {
        document.head
          .querySelector('#skin')
          .setAttribute('href', `/skin/theme${item}.css`)
      }, 100)
    },
    onchangeLanguage(item) {
      this.language = item
    },
    // 改变菜单状态
    changeCollapse() {
      this.isCollapse = !this.isCollapse
    },
    handOpen() {
      this.isCollapse = false
    },
    handleopen() {
      // // console.log('a')
      this.isCollapse = false
    },
    handleselect(menuIndex) {
      const arr = menuIndex.split(':')
      let menuItem = ''
      for (let i = 0; i < arr.length; i++) {
        const str = arr[i]
        if (i === 0) {
          menuItem = this.menuList.find(menu => (arr.length - 1 === i ? menu.description : true) && menu.id === str)
        } else if (i === 1) {
          if (!menuItem) break
          menuItem && (menuItem = menuItem.children.find(menu => (arr.length - 1 === i ? menu.description : true) && menu.id === str))
        } else if (i === 2) {
          if (!menuItem) break
          menuItem && (menuItem = menuItem.children.find(menu => (arr.length - 1 === i ? menu.description : true) && menu.id === str))
        } else if (i === 3) {
          if (!menuItem) break
          menuItem && (menuItem = menuItem.children.find(menu => menu.description && menu.id === str))
        }
      }
      if (menuItem) {
        window.open(menuItem.description, '_blank')
        return
      }
      saveActiveMenu(menuIndex)
      this.activeIndex = menuIndex
      this.breadcrumbItems = []
      const seqNo = menuIndex.split(':')
      this.getSelectedMenus(this.menuList, seqNo)
    },
    getSelectedMenus(menuList, seqNo) {
      const id = seqNo.shift()
      if (!id || id === 'null') {
        return
      }
      const menu = menuList.filter((menu) => menu.id === id)
      if (menu[0]) {
        this.breadcrumbItems.push(menu[0])
        this.collectionName = menu[0].resName
        this.getSelectedMenus(menu[0].children, seqNo)
      }
    },
    // 显示收藏菜单
    handleCollectionChange(bool) {
      this.isCollectionMenu = bool
    },
    // 收藏菜单——路由跳转
    handleCollectionMenuRoute(item) {
      const resUrl =
        item.resUrl.substring(0, 1) === '/' ? item.resUrl : '/' + item.resUrl
      if (this.$route.path !== resUrl) {
        //  清空查询条件
        this.$store.dispatch('saveSearchParam', {
          path: resUrl,
          searchParam: null
        })
        this.activeCollectionIndex = item.id
        this.breadcrumbItems = []
        const copyitem = { ...item }
        copyitem.resUrl = ''
        this.breadcrumbItems.push(copyitem)
        this.collectionName = copyitem.resName
        this.$router.push(resUrl)
      }
    },
    // 收藏菜单——删除
    async handleCollectionDel(item) {
      const favorites = [...this.userInfo.attrs.favorites]
      favorites.some((favorite, i) => {
        if (favorite.id === item.id) {
          favorites.splice(i, 1)
          return true
        }
      })

      const res = await this.addFavoritesAction({ favorites })
      if (res.success) {
        this.$message({
          type: 'success',
          message: '删除成功'
        })
      }
    },
    // 加入或取消收藏
    async handleCollection() {
      const item = this.breadcrumbItems[this.breadcrumbItems.length - 1]
      const favoritesStore = this.userInfo.attrs && this.userInfo.attrs.favorites && this.userInfo.attrs.favorites || []
      if (favoritesStore.some(favorite => favorite.id === item.id)) {
        this.$message({
          type: 'info',
          message: '菜单已存在'
        })
        this.collectionVisible = false
        return
      }
      const favorites = [...favoritesStore, {
        id: item.id,
        resUrl: item.resUrl,
        resName: this.collectionName
      }]
      const res = await this.addFavoritesAction({ favorites })
      if (res.success) {
        this.$message({
          type: 'success',
          message: '收藏成功'
        })
      }
      this.collectionVisible = false
    },
    handleHomeClick() {
      this.breadcrumbItems = []
    },
    handleChangePasswordOpenClick() {
      this.oldPassword = ''
      this.newPassword = ''
      this.reNewPassword = ''
      this.$nextTick(function() {
        this.clearErrorMessage()
      })
      this.resetDialog = true
    },

    // 退出登录
    logout() {
      this.$confirm(this.$t('home.tip1'), this.$t('comm.tips'), {
        confirmButtonText: this.$t('comm.certain'),
        cancelButtonText: this.$t('comm.cancel'),
        type: 'warning',
        iconClass: 'iconfont icongantanhao_icon',
        customClass: 'css-message-box'
      })
        .then(async() => {
          // 配置了单点登录
          if (process.env.VUE_APP_CAS_SERVER_LOGIN_URL) {
            const casServerLogoutUrl =
              process.env.VUE_APP_CAS_SERVER_LOGOUT_URL
            const casClientUrl = encodeURIComponent(
              process.env.VUE_APP_CAS_CLIENT_URL
            )
            this.$store.commit(types.SET_LOGIN_STATUS, 'no')
            window.location.href = `${casServerLogoutUrl}?service=${casClientUrl}`
          } else {
            const res = await this.logoutAction()
            if (res && res.success) {
              window.sessionStorage.clear()
              this.$message({
                type: 'success',
                message: this.$t('home.msg4'),
                iconClass: 'iconfont iconqueren',
                customClass: 'css-el-message'
              })
            } else {
              this.$message({
                type: 'error',
                message: res.message,
                iconClass: 'iconfont icongantanhao_icon',
                customClass: 'css-el-message'
              })
            }
            this.$router.go(0)
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: this.$t('home.msg5')
          })
        })
    },
    ...mapMutations({
      setCollapse: 'CHANGE_COLLAPSE'
    }),
    ...mapActions([
      'logoutAction',
      'loginInfoAction',
      'refreshDictAndClearStore',
      'addFavoritesAction'
    ])
  }
}
</script>
<style lang="scss">
html,
body {
  height: 100%;
  width: 100%;
}
.languageDropDwon {
  img {
    width: 14px;
    height: 14px;
    margin-right: 5px;
  }
}

.home {
  width: 100%;
  height: 100%;
  aside {
    position: fixed;
    // top: 0;
    // left: 0;
    width: 280px;
    height: 100vh;
    padding: 7px 0 30px 0;
    transition: all 0.2s linear;
    // background: linear-gradient(
    //   180deg,
    //   rgba(52, 57, 63, 1) 0%,
    //   rgba(22, 23, 27, 1) 100%
    // );
    box-shadow: 0px 0px 30px 0px rgba(0, 0, 0, 0.5);
    border-width: 1px 1px 1px 0;
    border-style: solid;
    border-color: #44474e;
    border-radius: 0 30px 30px 0;
    z-index: 999;
    &.collapse {
      width: 60px;
      overflow: hidden;
      .logo {
        width: 40px;
        height: 118px;
        padding: 46px 0;
        background: linear-gradient(
          129deg,
          rgba(47, 52, 58, 1) 0%,
          rgba(30, 34, 37, 1) 100%
        );
        box-shadow: 0px 0px 10px 7px rgba(112, 112, 112, 0.05),
          0px 0px 6px 1px rgba(0, 0, 0, 0.7);
        border-radius: 20px;
        img {
          height: 24px;
        }
      }
      .menu {
        padding-left: 0;
      }
    }
    .collapse {
      width: 100%;
      height: 64px;
      line-height: 64px;
      padding-right: 30px;
      text-align: right;
      cursor: pointer;
      span {
        .iconfont {
          color: #888888;
        }
      }
    }
    .iscollapse {
      padding-right: 0;
      text-align: center;
    }
    .logo {
      width: 200px;
      height: 118px;
      padding: 28px 0;
      margin: 0 auto 10px;
      text-align: center;
      background: linear-gradient(
        129deg,
        rgba(47, 52, 58, 1) 0%,
        rgba(30, 34, 37, 1) 100%
      );
      box-shadow: 0px 0px 10px 7px rgba(112, 112, 112, 0.05),
        0px 0px 6px 1px rgba(0, 0, 0, 0.7);
      border-radius: 20px;
      transition: all 0.2s linear;
      cursor: pointer;
      img {
        width: auto;
        height: 66px;
        vertical-align: top;
        transition: all 0.2s linear;
      }
    }
    .menu {
      width: 100%;
      height: 100%;
      padding-left: 10px;
      overflow: hidden;
      .el-menu {
        border: none;
        background-color: transparent;
        padding-bottom: 10px;
      }
      .el-submenu .el-menu-item {
        min-width: 0 !important;
      }
    }
  }
  .header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 1;
    left: 280px;
    width: calc(100% - 280px);
    min-width: 800px;
    height: 74px;
    padding: 0 20px;
    background-color: #eef2f6;
    display: flex;
    align-items: center;

    .home-icon {
      margin-right: 8px;
    }
    .collapse {
      box-sizing: border-box;
      padding: 4px 15px 0 10px;
      cursor: pointer;
      transition: all 0.2s linear;
      .iconfont {
        font-size: 26px;
      }
      &.iscollapse {
        transform: rotate(-90deg);
      }
    }
    .path {
      flex: 1;
      .el-breadcrumb {
        float: left;
      }
      .collection-icon {
        line-height: 34px;
        font-size: 17px;
        margin-left: 11px;
        cursor: pointer;
      }
    }
    .userInfo {
      // width: 200px;
      height: 60px;
      box-sizing: border-box;
      padding-right: 20px;
      line-height: 60px;
      cursor: pointer;

      .userinfo-inner {
        display: block;
        box-sizing: border-box;
        line-height: 60px;
        display: flex;
        align-items: center;
        height: 60px;
        img {
          display: block;
          height: 46px;
          width: 46px;
          cursor: pointer;
        }
        .avatar-icon {
          margin-right: 8px;
          .iconfont {
            font-size: 20px;
          }
        }
        span {
          display: block;
        }
        .name {
          margin-right: 10px;
        }
      }
    }
    .down-icon i {
      font-size: 12px;
    }

    .language-info {
      height: 60px;
      box-sizing: border-box;
      line-height: 60px;
      margin-right: 20px;
      cursor: pointer;
      align-items: center;
      .language-icon {
        align-items: center;
        font-size: 12px;
        font-family: "微软雅黑";
        color: #ffffff;
        span {
          margin: auto;
        }
      }
    }
    .theme-info {
      height: 60px;
      box-sizing: border-box;
      line-height: 60px;
      margin-right: 10px;
      align-items: center;
      .theme-icon {
        align-items: center;
        .iconfont {
          font-size: 16px;
          margin: auto;
        }
      }
    }
    // .iconB{
    //   font-size: 15px;
    // }
  }

  .main {
    display: flex;
    flex-direction: column;
    width: calc(100% - 280px);
    height: 100%;
    padding-top: 52px;
    margin-left: 280px;
    overflow: initial;
    transition: all 0.3s;
    box-sizing: border-box;

    section {
      flex: 1;
      width: 100%;
      box-sizing: border-box;
      padding: 10px;
      overflow: auto;
      & > div {
        height: 100%;
        width: 100%;
        border: 1px solid #eaeaea;
        overflow: hidden;
        .search .btns {
          padding: 10px 10px 0 0;
          box-sizing: border-box;
          width: 100%;
          display: flex;
          text-align: right;
          & > div {
            width: 50%;
          }
          .left {
            text-align: left;
          }
        }
      }
    }
  }
}
#app[data-theme="Light"] .home .header .language-info .language-icon {
  display: flex;
}
#app[data-theme="Light"] .home .header .theme-info .theme-icon {
  display: flex;
}
</style>
