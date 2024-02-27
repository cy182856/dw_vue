<template>
  <div class="login-container" />
</template>

<script>
import qs from 'qs'
import { mapActions } from 'vuex'
import { loginByCasTicket } from '@/api/login.js'

export default {
  name: 'CasLogin',
  data() {
    return {
      casServerLoginUrl: process.env.VUE_APP_CAS_SERVER_LOGIN_URL,
      casClientUrl: encodeURIComponent(process.env.VUE_APP_CAS_CLIENT_LOGIN_URL)
    }
  },
  created() {
    this.getCas()
  },
  methods: {
    async getCas() {
      const url = window.location.href
      const queryUrl = url.indexOf('?') >= 0 ? qs.parse(url.split('?')[1].split('#')[0]) : ''
      console.log({ url: url, queryUrl: queryUrl })
      const ticket = queryUrl.ticket
      console.log('ticket = ' + ticket)
      if (ticket) {
        // const params = { 'ticket': ticket }
        try {
          // 提交ticket，成功后后台会重定向
          loginByCasTicket(ticket)
        } catch (error) {
          console.log(error)
        }
      } else {
        console.log(this.casServerLoginUrl, this.casClientUrl)
        window.location.href = `${this.casServerLoginUrl}?service=${this.casClientUrl}`
      }
    },
    ...mapActions(['loginByCasAction'])
  }
}
</script>
