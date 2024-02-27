<template>
  <div class="index" />
</template>
<script>
import { mapActions } from 'vuex'
import { loadPreUrl } from '@/utils/storage'

export default {
  data() {
    return {
    }
  },
  created: async function() {
    const res = await this.loginByTokenAction({ userId: this.$route.query.userId, token: this.$route.query.token })
    if (res.success) {
      var redirect = loadPreUrl() || '/'
      console.log('redirect:' + redirect)
      // 替换当前路由，即在history中替换login的路由，避免浏览器回退时再回到登录页面
      this.$router.replace({ path: redirect })
    } else {
      this.$router.push('/login')
    }
  },
  methods: {
    ...mapActions([
      'loginByTokenAction'
    ])
  }
}
</script>
