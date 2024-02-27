export const popSelect = {
  props: {
    relFunc: {
      type: String,
      default: ''
    },
    isShow: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: false
    },
    cleardata: {
      type: Boolean,
      default: false
    },
    isSaveLastdata: {
      type: Boolean,
      default: true
    },
    canResetParams: {
      type: Boolean,
      default: true
    },
    itemName: {
      type: String,
      default: ''
    },
    isSeparateStr: {
      type: [String, Boolean],
      default: ''
    },
    separator: {
      type: String,
      default: ' - '
    },
    myTags: {
      type: Array,
      default: () => []
    },
    tagName: {
      type: Object,
      default: () => {}
    },
    params: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      myTagsPop: [],
      searchParam: {
        paging: true,
        pageNo: 1, // 当前页码
        pageSize: 10, // 每页条数
        totalRecord: null, // 总条数
        params: {}
      }
    }
  },
  watch: {
    myTagsPop(newVal) {
      newVal.forEach(item => {
        item.tag = this.formatTag(item)
      })
    }
  },
  methods: {
    handleOpen() {
      if (!this.cleardata) {
        this.myTagsPop = [...this.myTags]
      } else {
        this.reset()
        this.myTagsPop = []
      }
      Object.assign(this.searchParam.params, this.params)
      this.fetchData()
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
      if (this.multiple) {
        this.dataList.forEach(item => {
          const arr1 = this.myTagsPop.filter(item2 => item2[this.tagName[this.relFunc][0]] === item[this.tagName[this.relFunc][0]])
          const arr2 = val.filter(item2 => item2[this.tagName[this.relFunc][0]] === item[this.tagName[this.relFunc][0]])
          let index = ''
          if (arr1.length > 0) {
            for (let i = 0; i < this.myTagsPop.length; i++) {
              const item = this.myTagsPop[i]
              if (item[this.tagName[this.relFunc][0]] === arr1[0][this.tagName[this.relFunc][0]]) {
                index = i
              }
            }
          }
          if (arr1.length > 0 && arr2.length < 1) { // 在已选中，不在表格val中，删掉
            this.myTagsPop.splice(index, 1)
          } else if (arr1.length < 1 && arr2.length > 0) { // 未选中，在表格val中，加入
            this.myTagsPop.push(item)
          }
        })
      } else {
        this.myTagsPop = val
      }
    },
    search() {
      this.searchParam.pageNo = 1
      if (!this.canResetParams) {
        Object.assign(this.searchParam.params, this.params)
      }
      this.fetchData()
    },
    reset() {
      for (const item in this.searchParam.params) {
        if (Array.isArray(this.searchParam.params[item])) {
          this.searchParam.params[item] = []
        } else {
          this.searchParam.params[item] = ''
        }
      }
      if (!this.canResetParams) {
        Object.assign(this.searchParam.params, this.params)
      }
    },
    handleSizeChange(pageSize, ref) {
      this.searchParam.pageNo = 1
      this.searchParam.pageSize = pageSize
      this.fetchData()
      if (ref && this.$refs[ref]) {
        this.$refs[ref].doLayout()
      }
    },
    handleCurrentChange(currentPage) {
      this.searchParam.pageNo = currentPage
      this.fetchData()
    },
    // 出现纵向滚动条时，防止表头行错位
    tableDolayout(refTable = this.$refs['table']) {
      setTimeout(() => {
        if (refTable) refTable.doLayout()
      },
      1000)
    },
    handleCancelClick() {
      this.multipleSelection = []
      try {
        this.$refs.table.clearSelection()
      } catch (error) {
        console.log('skip')
      }
      this.searchParam.pageNo = 1
      this.reset()
      // 向外分发选中事件
      this.$emit('cancel')
    },
    handleClearClick() {
      this.multipleSelection = []
      if (!this.multiple) {
        this.$refs.table.clearSelection()
      }
      // 向外分发选中事件
      this.$emit('clear')
      this.$emit('cancel')
    },
    handleOkClick() {
      this.$emit('select', this.myTagsPop)
      if (!this.multiple) {
        this.$refs.table.clearSelection()
      }
    },
    handleSelectAllClick() {
      this.$emit('select', 'ALL')
      this.$emit('cancel')
    },
    // 多选用方法（closeTags、toggleSelection、formatTag）
    closeTags(index) {
      const delItem = this.myTagsPop[index]
      this.myTagsPop.splice(index, 1)
      const arr = this.dataList.filter(item => item[this.tagName[this.relFunc][0]] === delItem[this.tagName[this.relFunc][0]])
      if (arr.length > 0) {
        this.toggleSelection(arr[0], false)
      }
    },
    toggleSelection(row, bool) {
      this.$refs['table'].toggleRowSelection(row, bool)
    },
    formatTag(value) {
      if (this.isSeparateStr) {
        let str = ''
        if (typeof this.isSeparateStr === 'boolean') {
          this.tagName[this.relFunc].forEach((item, index) => {
            str += value[item] + (index < this.tagName[this.relFunc].length - 1 ? this.separator : '')
          })
        } else {
          const indexArr = this.isSeparateStr.split(',')
          indexArr.forEach((item, index) => {
            str += value[item] + (index < indexArr.length - 1 ? this.separator : '')
          })
        }
        return str
      } else {
        if (!!this.itemName && value[this.itemName]) {
          return value[this.itemName]
        } else if (this.relFunc) {
          return this.tagName[this.relFunc] ? value[this.tagName[this.relFunc][0]] : ''
        }
        return ''
      }
    }
  }
}
