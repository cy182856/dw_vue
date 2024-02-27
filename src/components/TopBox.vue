<template>
  <div class="summary">
    <div class="topBtnBox">
      <div v-for="(value, key) in relationInfoMap" :key="key">
        <div v-if="key === 'contact'">
          <div v-if="value === 0" class="swiper-slide item outlightgrey">
            <div class="num">
              {{ value }}
            </div>
            <div class="fr">
              <span class="icon icon1" />
              <p>
                联系人
              </p>
            </div>
          </div>
          <div v-else>
            <a href="javascript:;" @click="handleToSearch('/mrk/contactList', relationInfoMap['relationIdentifierNum'])">
              <div class="swiper-slide item">
                <div class="num">
                  {{ value }}
                </div>
                <div class="fr">
                  <span class="icon icon1" />
                  <p>
                    联系人
                  </p>
                </div>
              </div>
            </a>
          </div>
        </div>
        <div v-if="key === 'salesopportunity'">
          <div v-if="value === 0" class="swiper-slide item outlightgrey">
            <div class="num">
              {{ value }}
            </div>
            <div class="fr">
              <span class="icon icon1" />
              <p>
                销售机会
              </p>
            </div>
          </div>
          <div v-else>
            <a href="javascript:;" @click="handleToSearch('/sale/salesopportunityList', relationInfoMap['relationIdentifierNum'])">
              <div class="swiper-slide item">
                <div class="num">
                  {{ value }}
                </div>
                <div class="fr">
                  <span class="icon icon1" />
                  <p>
                    销售机会
                  </p>
                </div>
              </div>
            </a>
          </div>
        </div>
        <div v-if="key === 'quote'">
          <div v-if="value === 0" class="swiper-slide item outlightgrey">
            <div class="num">
              {{ value }}
            </div>
            <div class="fr">
              <span class="icon icon1" />
              <p>
                报价
              </p>
            </div>
          </div>
          <div v-else>
            <a href="javascript:;" @click="handleToSearch('/sale/quoteList', relationInfoMap['relationIdentifierNum'])">
              <div class="swiper-slide item">
                <div class="num">
                  {{ value }}
                </div>
                <div class="fr">
                  <span class="icon icon1" />
                  <p>
                    报价
                  </p>
                </div>
              </div>
            </a>
          </div>
        </div>
        <div v-if="key === 'salesorder'">
          <div v-if="value === 0" class="swiper-slide item outlightgrey">
            <div class="num">
              {{ value }}
            </div>
            <div class="fr">
              <span class="icon icon1" />
              <p>
                销售订单
              </p>
            </div>
          </div>
          <div v-else>
            <a href="javascript:;" @click="handleToSearch('/sale/salesorderList', relationInfoMap['relationIdentifierNum'])">
              <div class="swiper-slide item">
                <div class="num">
                  {{ value }}
                </div>
                <div class="fr">
                  <span class="icon icon1" />
                  <p>
                    销售订单
                  </p>
                </div>
              </div>
            </a>
          </div>
        </div>
        <div v-if="key === 'task'">
          <div v-if="value === 0" class="swiper-slide item outlightgrey">
            <div class="num">
              {{ value }}
            </div>
            <div class="fr">
              <span class="icon icon1" />
              <p>
                活动
              </p>
            </div>
          </div>
          <div v-else>
            <a href="javascript:;" @click="handleToSearch('/schedule/list', relationInfoMap['relationIdentifierNum'])">
              <div class="swiper-slide item">
                <div class="num">
                  {{ value }}
                </div>
                <div class="fr">
                  <span class="icon icon1" />
                  <p>
                    活动
                  </p>
                </div>
              </div>
            </a>
          </div>
        </div>
        <div v-if="key === 'targetpolicy'">
          <div v-if="value === 0" class="swiper-slide item outlightgrey">
            <div class="num">
              {{ value }}
            </div>
            <div class="fr">
              <span class="icon icon1" />
              <p>
                返利
              </p>
            </div>
          </div>
          <div v-else>
            <a href="javascript:;" @click="handleToRebateDefStrategy('/rebate/targetpolicyList', relationInfoMap['relSalesorderId'])">
              <div class="swiper-slide item">
                <div class="num">
                  {{ value }}
                </div>
                <div class="fr">
                  <span class="icon icon1" />
                  <p>
                    返利
                  </p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'TopBox',
  components: {
  },
  props: {
    relationInfoMap: {
      type: null,
      default: ''
    }
  },
  data() {
    return {
    }
  },
  created() {
  },
  methods: {
    handleToSearch(path, identiferNum) {
      this.$router.push({ path: path, query: { relFuncNum: identiferNum }})
    },
    handleToRebateDefStrategy(path, relSalesorderId) {
      this.$router.push({ path: path, query: { relSalesorderId: relSalesorderId }})
    }
  }
}
</script>
<style lang="scss" scoped>
.topBtnBox {
  padding-left: 48px !important;
}
</style>
