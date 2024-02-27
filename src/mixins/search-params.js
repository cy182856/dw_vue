import { mapGetters } from 'vuex'
import { finAccountType } from '@/api/est/strategy.js'
import { finAccount } from '@/api/bgt/feeconfig.js'

export const search = {
  computed: {
    ...mapGetters([
      'searchParams',
      'userInfo'
    ]),
    orgIdCom() {
      const d = new Date()
      let filterYear = d.getFullYear()
      if (this.happenYear) {
        filterYear = this.happenYear
      }
      const deptList = this.$store.getters.dictList.Dept.filter(item => item.filter2.indexOf(filterYear) >= 0)
      const targetList = this.$store.getters.dictList.TARGETORG.filter(item => item.filter1.indexOf(filterYear) >= 0)
      let item
      let list = []
      if (deptList && targetList) {
        list = targetList.filter((target) => deptList.filter((dept) => target.dictName === dept.dictId))
        item = list.find((ele) => this.userInfo.orgSeqNo.indexOf(ele.dictId) !== -1)
      }
      return this.userInfo.roleList.includes('ROLE_WF_MARKET') || this.userInfo.roleList.includes('ROLE_STRATEGY_SECTION_APPLY') ? '' : item ? item.dictName : ''
    }
  },
  created: function() {
    if (this.searchParams.get(this.$route.path)) {
      this.searchParam = this.searchParams.get(this.$route.path)
    }
  },
  methods: {
    clear() {
      if (this.writeoffList) {
        this.writeoffList = []
      }
      if (this.WriteoffList) {
        this.WriteoffList = []
      }
      if (this.dataList) {
        this.dataList = []
      }
      if (this.PromotionList) {
        this.PromotionList = []
      }
      if (this.strategyList) {
        this.strategyList = []
      }
      if (this.fixedList) {
        this.fixedList = []
      }
      if (this.rebateRateList) {
        this.rebateRateList = []
      }
      if (this.rateLimitList) {
        this.rateLimitList = []
      }
      if (this.deductList) {
        this.deductList = []
      }
      if (this.assignList) {
        this.assignList = []
      }
      if (this.rulesList) {
        this.rulesList = []
      }
      if (this.costFinanceList) {
        this.costFinanceList = []
      }
      if (this.terminalList) {
        this.terminalList = []
      }
      if (this.customerPriceList) {
        this.customerPriceList = []
      }
      if (this.customerList) {
        this.customerList = []
      }
      if (this.runningList) {
        this.runningList = []
      }
      if (this.finishedList) {
        this.finishedList = []
      }
      if (this.tableData) {
        this.tableData = []
      }
      if (this.userList) {
        this.userList = []
      }
      if (this.dictList) {
        this.dictList = []
      }
      if (this.resourcesList) {
        this.resourcesList = []
      }
      if (this.i18nList) {
        this.i18nList = []
      }
      if (this.dacList) {
        this.dacList = []
      }
    },
    reset() {
      this.clear()
      if (this.searchParam.params === undefined) {
        for (const item in this.searchParam) {
          if (item !== 'targetOrg' || this.deptSelect() === '') {
            this.searchParam[item] = ''
          }
        }
      } else {
        for (const item in this.searchParam.params) {
          if ((item !== 'deptCode' && item !== 'submitOrg') || this.deptSelect() === '') {
            this.searchParam.params[item] = ''
          }
        }
      }
    },
    search() {
      this.clear()
      if (this.isLoading === false) {
        this.searchParam.pageNo = 1
        this.$store.dispatch('saveSearchParam', { path: this.$route.path, searchParam: this.searchParam })
        this.fetchData()
      }
    },
    handleSizeChange(pageSize, ref) {
      this.searchParam.pageNo = 1
      this.searchParam.pageSize = pageSize
      this.$store.dispatch('saveSearchParam', { path: this.$route.path, searchParam: this.searchParam })
      this.fetchData()
      if (ref && this.$refs[ref]) {
        this.$refs[ref].doLayout()
      }
    },
    handleCurrentChange(currentPage) {
      this.searchParam.pageNo = currentPage
      this.$store.dispatch('saveSearchParam', { path: this.$route.path, searchParam: this.searchParam })
      this.fetchData()
    },
    // 出现纵向滚动条时，防止表头行错位
    tableDolayout(refTable = this.$refs['table']) {
      setTimeout(() => {
        if (refTable) refTable.doLayout()
      },
      1000)
    },
    toFirstPage() {
      this.handleCurrentChange(1)
    },
    toLastPage() {
      this.searchParam.pageNo = Math.ceil(this.searchParam.totalRecord / this.searchParam.pageSize)
      this.handleCurrentChange(this.searchParam.pageNo)
    },
    getWarningArr(str) {
      const arr = str.split('；')
      arr.splice(arr.length - 1, 1)

      return arr.map((str, index) => index === arr.length - 1 ? str + '。' : str + '；')
    }
  }
}

export const finSubjects = {
  methods: {
    // 费目 1-g固，2-变
    async getSecondFinSubjects(val) {
      if (!this.searchParam.params.submitOrg || !val) {
        return false
      }
      this.fees2 = []
      const res = await finAccountType(this.searchParam.params.submitOrg, val)
      if (res && res.success) {
        const results = res.datas.list
        this.fees2 = results
        if (Number(val) === 2) {
          this.fees3 = results
        } else {
          this.fees4 = results
        }
      }
    },
    // 二级费目——全
    async getHoldFinSubjects() {
      if (!this.searchParam.params.submitOrg) {
        return false
      }
      this.fees1 = []
      const res = await finAccount(this.searchParam.params.submitOrg)
      if (res && res.success) {
        const results = res.datas.list
        this.fees1 = results
      }
    }
  }
}
export const progressLoading = {
  data() {
    return {
      progressVisible: false,
      percentageNum: 0,
      percentageSetIntervalId: null
    }
  },
  beforeRouteLeave(to, from, next) {
    this.handleClearInterval()
    next()
  },
  methods: {
    handleSetInterval(len) {
      this.progressVisible = true
      const _that = this
      const num = 100 / (len / 100)
      const maxPercent = Number(Math.random().toString().substring(0, 3)) + 99
      this.percentageSetIntervalId = setInterval(function() {
        if (_that.percentageNum >= 100) {
          _that.handleClearInterval()
        }
        const min = num > 100 ? 100 : num - 1
        const percent = (_that.percentageNum + Number((Math.random() * min + (num - min)) / 40)) > 98 ? maxPercent : _that.percentageNum + Number((Math.random() * min + (num - min)) / 40)
        _that.percentageNum = percent.toString().indexOf('.') > -1 ? Number(percent.toString().substring(0, percent.toString().indexOf('.') + 3)) : percent
      }, 500)
    },
    handleClearInterval() {
      this.progressVisible = false
      clearInterval(this.percentageSetIntervalId)
      this.percentageSetIntervalId = null
      this.percentageNum = 0
    }
  }
}
// 搜索pop多选
export const searchPopMultiple = {
  data() {
    return {
      defaultTags: []
    }
  },
  methods: {
    handleSelectedChange(data) {
      this.defaultTags = data.data
      this.setSearchVal(data)
    },
    setSearchVal(data) {
      const arr = data.valueName.split('.')
      if (arr.length === 1) {
        this[arr[0]] = data.value
      } else if (arr.length === 2) {
        this[arr[0]][arr[1]] = data.value
      } else if (arr.length === 3) {
        this[arr[0]][arr[1]][arr[2]] = data.value
      } else if (arr.length === 4) {
        this[arr[0]][arr[1]][arr[2]][arr[3]] = data.value
      }
    }
  }
}
