<template>
  <div class="online">
    <h3>
      {{ $t('admin.onlineUser.onlineUser') }}
      <div v-if="hasPermission('admin.changeUser')" class="changeUser-item">
        <span>切换至用户：</span>
        <user-select class="changeUser" @change="changeUserTo" />
      </div>
    </h3>
    <div>
      <el-table ref="table" v-loading="isLoading" :data="onlineUsers" border stripe style="width: 100%; margin: 5px;">
        <el-table-column label="SessionID" prop="sessionId" />
        <el-table-column prop="userId" :label="$t('admin.onlineUser.userId')" />
        <el-table-column prop="nickName" :label="$t('admin.onlineUser.nickName')" />
        <el-table-column prop="loginTime" :label="$t('admin.onlineUser.loginTime')" />
        <el-table-column prop="lastAccsessTime" :label="$t('admin.onlineUser.lastAccsessTime')" />
        <el-table-column prop="loginIp" :label="$t('admin.onlineUser.loginIp')" />
        <el-table-column :label="$t('comm.operation')">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click.prevent="handleLogoutClick(scope.row.sessionId)">
              {{ $t('admin.onlineUser.offline') }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { onlineUsers, kickOut, changeUser } from '@/api/admin/online-user-api.js'
import { permission } from '@/mixins/permission-mixin.js'
import { niceScroll } from '@/mixins/nice-scroll.js'
import UserSelect from '@/components/UserSelect.vue'

export default {
  name: 'OnlineUsers',
  components: { UserSelect },
  mixins: [niceScroll, permission],
  data: function() {
    return {
      isLoading: false,
      onlineUsers: []
    }
  },
  created: function() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      const res = await onlineUsers()
      this.isLoading = true
      if (res && res.success) {
        this.onlineUsers = res.datas.onlineUserList
      }
      this.tableDolayout(this.$refs['table'])
      this.scroll()
      this.isLoading = false
    },
    handleLogoutClick(sessionId) {
      this.$confirm(this.$t('comm.tip6'), this.$t('comm.tips'), {
        confirmButtonText: this.$t('comm.certain'),
        cancelButtonText: this.$t('comm.cancel'),
        type: 'warning'
      }).then(async() => {
        const param = { sessionId }
        const res = await kickOut(param)
        if (res && res.success) {
          this.fetchData()
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: this.$t('comm.msg1')
        })
      })
    },
    async changeUserTo(userId) {
      const res = await changeUser(userId)
      if (res && res.success) {
        this.$router.push('/')
        location.reload()
      }
    },
    // 出现纵向滚动条时，防止表头行错位
    tableDolayout(refTable) {
      setTimeout(() => {
        if (refTable) refTable.doLayout()
      },
      1000)
    }
  }
}
</script>

<style lang="scss" scoped>
.online {
  background-color: #fff;
  padding: 20px 40px;
  border-radius: 6px;
  h3 {
    height: 35px;
    line-height: 35px;
    font-size: 18px;
    color: rgb(50, 50, 50);
    border-bottom: 1px dashed #ccc;
    margin-bottom: 10px;
    position: relative;
  }
  a {
    text-decoration:underline;
    cursor:pointer;
    color:rgb(14, 90, 221);
  }
}
#app[data-theme=Dark] .online{
  background-color:#26272c;
  h3 {
    color: rgb(255, 254, 254);
    border-bottom: 1px dashed #ccc;
  }
}
.changeUser-item {
  float: right;
  font-size: 14px;
}
.changeUser {
  display: inline-block;
  right: 0;
  bottom: 10px;
  border-radius: 6px;
  // border: 1px solid #ccc;
  // cursor: pointer;
  font-size: 12px;
  width: 100px;
  height: 30px;
  line-height: 30px;
  text-align: left;
  background-image: linear-gradient(rgb(52, 165, 248), rgb(8, 142, 240));
  color: #fff;
  &:hover {
    background-image: linear-gradient(rgb(42, 155, 238), rgb(8, 142, 240));
  }
}

</style>
