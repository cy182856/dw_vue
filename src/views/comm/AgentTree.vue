<template>
  <div>
    <el-input v-model="filterText" placeholder="输入关键字进行过滤" />
    <div class="tree_box" style="height:280px;overflow-x:auto;background:#fff">
      <el-tree
        ref="accountTree"
        default-expand-all
        :data="accounts"
        show-checkbox
        node-key="id"
        :default-checked-keys="csaccount"
        :filter-node-method="filterNode"
        @check-change="handleCheckChange"
      />
    </div>
  </div>
</template>

<script>
import { treeListCustomer } from '@/api/est/tree.js'

export default {
  props: {
    submitOrg: {
      type: String,
      default: ''
    },
    csaccount: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      accounts: [{
        id: 0,
        label: '全选',
        children: []
      }
      ],
      filterText: ''
    }
  },
  watch: {
    submitOrg(newVal) {
      this.customerList1(newVal)
    },
    filterText(val) {
      this.$refs.accountTree.filter(val)
    }
  },
  created() {
    this.customerList1(this.submitOrg)
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    handleCheckChange() {
      const data = { custCode: [], num: '' }
      data.custCode = this.$refs['accountTree'].getCheckedKeys().filter(ele => ele.length > 3)
      data.num = data.custCode.length > 0 ? data.custCode.length : ''
      this.$emit('handleCheckChange', data)
    },
    async customerList1(id) {
      if (!id) return
      const res = await treeListCustomer(id)
      if (res && res.success) {
        const results = res.datas.list
        if (results.length > 0) {
          const lastcust = this.getTreeList(results, 'area1', 'area2', 'custName', 'custCode')
          this.accounts[0].children = lastcust
        }
      }
    },
    unique(arr) {
      return Array.from(new Set(arr))
    },
    getTreeList(list, name1, name2, name3, code3) {
      let area1 = []
      const newList = []
      for (let s = 0; s < list.length; s++) {
        const area1lie = list[s][name1]
        area1.push(area1lie)
      }
      area1 = this.unique(area1)
      let area1Id = 0
      let area2Id = 10
      for (let s = 0; s < area1.length; s++) {
        area1Id++
        const lie = area1[s]
        const listlie = { 'id': area1Id, 'label': lie, 'children': [] }
        newList.push(listlie)
        const attr = []
        for (let i = 0; i < list.length; i++) {
          const parent = list[i][name1]
          if (parent === lie) {
            area2Id++
            const lietwo = list[i][name2]
            const listlietwo = { 'id': area2Id, 'label': lietwo, 'children': [] }
            if (attr.indexOf(lietwo) === -1) {
              listlie['children'].push(listlietwo)
              attr.push(lietwo)
            }
            for (let y = 0; y < list.length; y++) {
              const lastchild = list[y][name2]
              if (lastchild === lietwo && parent === list[y][name1]) {
                const liethree = list[y][name3]
                const liethreecode = list[y][code3]
                const listliethree = { 'id': liethreecode, 'label': liethree }
                listlietwo['children'].push(listliethree)
              }
            }
          }
        }
      }
      return newList
    }
  }
}
</script>

<style>

</style>
