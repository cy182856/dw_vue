<template>
  <!-- 编辑画面 -->
  <div class="summary">
    <div class="detail">
      <div class="pagetitle">
        <span v-if="withdraw.identiferNum" class="pagespan">{{ $t("pay.pre.motion.identiferNum") }}:    {{ withdraw.identiferNum }}</span>
      </div>
      <el-collapse v-model="activeNames">
        <el-collapse-item name="1">
          <span slot="title" class="collapse-title">{{ $t("comm.essentialInformation") }}</span>
          <div class="input_box">
            <div class="flex2">
              <div class="title must">
                分类名称
              </div>
              <div class="input">
                <el-input v-model="withdraw.promotionName" :disabled="disabled" maxlength="100" @blur="validator('promotionName')" />
                <span ref="promotionName" data-roles="required" :data-value="withdraw.promotionName" class="message" />
              </div>
            </div>
            <div class="flex2">
              <div class="title must">
                对象产品
              </div>
              <div class="input">
                <!-- <el-input v-model="withdraw.sku" readonly type="text" :disabled="disabled" @focus="customersDialogShow = true" /> -->
                <el-input v-model="withdraw.sku" readonly type="text" :disabled="disabled" @focus="loadDialogShow()" @blur="validator('sku')" />
                <span ref="sku" data-roles="required" :data-value="withdraw.sku" class="message" />
              </div>
            </div>
          </div>
          <div class="input_box">
            <div class="flex2">
              <div class="title must">
                上限
              </div>
              <div class="input">
                <el-input v-model="withdraw.maxRate" :disabled="disabled" maxlength="25" @blur="validator('maxRate')" />
                <span ref="maxRate" data-roles="required" :data-value="withdraw.maxRate" class="message" />
              </div>
            </div>
            <!-- <div class="flex2">
              <div class="title must">
                适用期间
              </div>
              <div class="input">
                <el-date-picker
                  v-model="withdraw.dateYM"
                  type="monthrange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :disabled="disabled"
                  value-format="yyyy-MM"
                  format="yyyy-MM"
                  @blur="validator('dateYM')"
                />
                <span ref="dateYM" data-roles="required" :data-value="withdraw.dateYM" class="message" />
              </div>
            </div> -->
            <div class="flex2">
              <div class="title must">
                适用期间
              </div>
              <div class="input">
                <el-date-picker
                  v-model="withdraw.fromYm"
                  type="month"
                  placeholder="开始日期"
                  value-format="yyyy-MM"
                  :picker-options="pickerOptions0"
                  :disabled="disabled"
                  @blur="validator('fromYm')"
                />
                <span :ref="'fromYm'" data-roles="required" :data-value="withdraw.fromYm" class="message" />
              </div>
              <span style="margin:0 20px;">至</span>
              <div class="input">
                <el-date-picker
                  v-model="withdraw.toYm"
                  type="month"
                  placeholder="结束日期"
                  value-format="yyyy-MM"
                  :picker-options="pickerOptions1"
                  :disabled="disabled"
                  @blur="validator('toYm')"
                />
                <span ref="toYm" data-roles="required" :data-value="withdraw.toYm" class="message" />
              </div>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item v-show="type != 'add'" name="2">
          <span slot="title" class="collapse-title">其他信息</span>
          <div class="input_box">
            <div class="flex2">
              <div class="title">
                创建时间
              </div>
              <el-date-picker
                v-model="withdraw.createTime"
                type="datetime"
                :disabled="true"
                placeholder="选择创建时间"
              />
            </div>
            <div class="flex2">
              <div class="title">
                创建者
              </div>
              <div class="input">
                <user-select
                  v-model="withdraw.createBy"
                  :root-org-id="orgRootId"
                  :disabled="true"
                />
              </div>
            </div>
          </div>
          <div class="input_box">
            <div class="flex2">
              <div class="title">
                最后修改时间
              </div>
              <el-date-picker
                v-model="withdraw.updateTime"
                type="datetime"
                :disabled="true"
                placeholder="选择创建时间"
              />
            </div>
            <div class="flex2">
              <div class="title">
                最后修改者
              </div>
              <div class="input">
                <user-select
                  v-model="withdraw.updateBy"
                  :root-org-id="orgRootId"
                  :disabled="true"
                />
              </div>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
      <ul class="operation-box dialog-btn-box dialog-btn-box-detail">
        <!-- 保存 -->
        <li v-if="!disabled" class="operation-item" @click="handleSubmit">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg">
            <i class="iconfont iconbaocun" />
          </span>
          <span class="operation-text">{{ $t("comm.save") }}</span>
        </li>
        <!-- 返回 -->
        <li class="operation-item" @click="handleBack">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg">
            <i class="iconfont iconquxiao" />
          </span>
          <span class="operation-text">{{ $t("comm.return") }}</span>
        </li>
      </ul>
    </div>

    <div>
      <el-dialog
        title="系列或SKU选择"
        :visible.sync="customersDialogShow"
        :close-on-click-modal="false"
        custom-class="content-dialog-userSelect"
        width="33%"
        height="150px"
        center
      >
        <div class="tree_box" style="height:340px;overflow-x:auto">
          <el-tree
            ref="customerTree"
            default-expand-all
            :data="customers"
            show-checkbox
            node-key="id"
          />
        </div>
        <ul class="operation-box dialog-btn-box fixed-btn-box end-content-flex">
          <li class="operation-item" @click="handleCancelClick">
            <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconquxiao" /></span>
            <span class="operation-text">{{ $t('comm.cancel') }}</span>
          </li>
          <li class="operation-item" @click="handleOkClick">
            <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconqueren" /></span>
            <span class="operation-text">{{ $t('comm.certain') }}</span>
          </li>
        </ul>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { formValidator } from '@/mixins/form-validator.js'
import { names } from '@/mixins/names.js'
import { permission } from '@/mixins/permission-mixin.js'
import { dict } from '@/mixins/dict'
// import RelFuncSelect from '@/components/RelFuncSelect.vue'
// import UserOrgTree from '@/components/UserOrgTree.vue'
import UserSelect from '@/components/UserSelect.vue'
import { getPromotionMonthDetail, createPromotionMonth, savePromotionMonth } from '@/api/est/promotion.js'
import { treeListProduct } from '@/api/est/tree.js'
export default {
  name: 'EstClassifiedEdit',
  components: { UserSelect },
  mixins: [names, formValidator, permission, dict],
  data() {
    return {
      disabled: false,
      isLoading: true,
      customersDialogShow: false,
      historyDialog: false,
      processDialog: false,
      selectDepartmentDialog: false,
      activeNames: ['1', '2', '3', '4', '5'],
      withdraw: {
        promotionName: '',
        skuIds: '',
        sku: '',
        // dateYM: '',
        fromYm: '',
        toYm: '',
        maxRate: '',
        createTime: '',
        createBy: '',
        updateTime: '',
        updateBy: ''
      },
      fileList: [],
      relFunc: '',
      customers: [],
      searchParam: {
        params: {
        }
      },
      loadSkuFlag: false,
      pickerOptions0: {
        disabledDate: (time) => {
          if (!this.withdraw.toYm) { return time.getTime() < new Date('2021').getTime() }
          return time.getTime() > new Date(this.withdraw.toYm.replace(/-/g, '/')).getTime() || time.getTime() < new Date('2021').getTime()
        }
      },
      pickerOptions1: {
        disabledDate: (time) => {
          if (!this.withdraw.fromYm) { return time.getTime() < new Date('2021').getTime() }
          return time.getTime() < new Date(this.withdraw.fromYm.replace(/-/g, '/')).getTime() || time.getTime() < new Date('2021').getTime()
        }
      }
    }
  },
  computed: {
    ...mapGetters(['userInfo']),
    orgRootId: function() {
      return this.userInfo.orgSeqNo
    },
    taskId: function() {
      return this.$route.query.taskId
    },
    processInstId: function() {
      return this.$route.query.processInstId
    },
    id: function() {
      return this.$route.query.id || this.$route.query.businessKey
    },
    type: function() {
      return this.$route.query.type
    }
  },
  watch: {},
  async created() {
    if (this.id) {
      this.fetchData()
    } else {
      this.disabled = false
    }
    console.log('type:' + this.type)
    if (this.type === 'info') {
      this.disabled = true
    }
  },
  methods: {
    async fetchData() {
      this.isLoading = true
      // 编辑和详细画面获取详细数据
      const res = await getPromotionMonthDetail(this.id)
      if (res && res.success) {
        this.withdraw = res.datas.promotionMonthinfo
        // if (this.withdraw.skuNames) {
        //   const skuNames = JSON.parse(this.withdraw.skuNames)
        //   this.withdraw.sku = skuNames.join(',    ')
        // }
        if (res.datas.promotionMonthinfo.saveSkuList) {
          const skunames = []
          for (let i = 0; i < res.datas.promotionMonthinfo.saveSkuList.length; i++) {
            skunames.push(res.datas.promotionMonthinfo.saveSkuList[i].name)
          }
          this.withdraw.saveSkuList = res.datas.promotionMonthinfo.saveSkuList
          // this.withdraw.sku = skunames.join(',    ')
          this.withdraw.sku = res.datas.promotionMonthinfo.categoryCount + '个品类，' + res.datas.promotionMonthinfo.feeInputTypeCount + '个系列，' + res.datas.promotionMonthinfo.productNameCount + '个SKU'
        }
        // const dateFromTo = []
        // dateFromTo.push(this.withdraw.fromYm)
        // dateFromTo.push(this.withdraw.toYm)
        // this.withdraw.dateYM = dateFromTo
      }
      this.isLoading = false
    },
    async loadDialogShow() {
      console.log('loadDialogShow')
      this.customersDialogShow = true
      if (!this.loadSkuFlag) {
        // const res = await getSkuList(this.searchParam)
        // if (res && res.success) {
        //   const children = []
        //   const resultList = res.datas.searchResult.results
        //   resultList.forEach(item => {
        //     const skuItem = {
        //       id: item.janCode,
        //       label: item.productName
        //     }
        //     children.push(skuItem)
        //   })
        //   const skuList = [
        //     {
        //       id: 'ALL',
        //       label: '全选',
        //       children: children
        //     }
        //   ]
        //   this.customers = skuList
        // }
        // this.productList(this.userInfo.orgId)
        console.log('部门：' + this.userInfo.orgId)
        const targetList = this.$store.getters.dictList.TARGETORG
        let targetorg = ''
        if (targetList) {
          for (let s = 0; s < targetList.length; s++) {
            if (this.userInfo.orgSeqNo.indexOf(targetList[s].dictId) !== -1) {
              targetorg = targetList[s].dictName
            }
          }
        }
        console.log('TARGETORG：' + targetorg)
        this.productList(targetorg)
        this.loadSkuFlag = true
      }
    },
    async productList(id) {
      if (!id) {
        return false
      }
      this.isLoading = true
      const res = await treeListProduct(id)
      if (res && res.success) {
        const results = res.datas.list
        const lastproduct = this.getTreeList(results, 'category', 'feeInputType', 'productName', 'janCode')
        this.customers = lastproduct
        this.$nextTick(() => {
          if (this.withdraw.saveSkuList) {
            const checkKeys = []
            for (let i = 0; i < this.withdraw.saveSkuList.length; i++) {
              if (this.withdraw.saveSkuList[i].type === '1') {
                console.log('type:1===>' + this.withdraw.saveSkuList[i].name)
                for (let j = 0; j < this.customers.length; j++) {
                  if (this.customers[j].label === this.withdraw.saveSkuList[i].name) {
                    console.log('type:1===>id:' + this.customers[j].id)
                    checkKeys.push(this.customers[j].id)
                  }
                }
              } else if (this.withdraw.saveSkuList[i].type === '2') {
                console.log('type:2===>' + this.withdraw.saveSkuList[i].name)
                for (let k = 0; k < this.customers.length; k++) {
                  for (let n = 0; n < this.customers[k].children.length; n++) {
                    if (this.customers[k].children[n].label === this.withdraw.saveSkuList[i].name) {
                      console.log('type:2===>id:' + this.customers[k].children[n].id)
                      checkKeys.push(this.customers[k].children[n].id)
                    }
                  }
                }
              } else {
                console.log('type:3')
                checkKeys.push(this.withdraw.saveSkuList[i].id)
              }
            }
            this.$refs.customerTree.setCheckedKeys(checkKeys)
          }
        })
        this.isLoading = false
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
          if (s === 0 && name2 === 'feeInputType') {
            // console.log(parent, '一级类目')
          }

          if (parent === lie) {
            area2Id++
            const lietwo = list[i][name2]
            const listlietwo = { 'id': area2Id, 'label': lietwo, 'children': [] }
            if (name2 === 'feeInputType') {
              // console.log(parent, '一级类目', attr, 'attr', lietwo, 'lietwo')
            }
            if (attr.indexOf(lietwo) === -1) {
              listlie['children'].push(listlietwo)
              attr.push(lietwo)
            }
            if (name2 === 'feeInputType') {
              console.log(list, lietwo, 999, parent, lie)
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
    },
    async handleSubmit() {
      console.log('handleSubmit')
      console.log(this.withdraw.dateYM)
      console.log(this.validatorAll())
      if (!this.validatorAll()) {
        return false
      }
      this.withdraw.skuIds = JSON.stringify(this.withdraw.skuIds)
      this.withdraw.skuNames = JSON.stringify(this.withdraw.skuNames)
      this.withdraw.dateYM = JSON.stringify(this.withdraw.dateYM)
      if (this.id) {
        const res = await savePromotionMonth(this.id, this.withdraw)
        if (res && res.success) {
          this.$router.push('/est/classified')
          res.messages.message
        }
      } else {
        const res = await createPromotionMonth(this.withdraw)
        if (res && res.success) {
          this.$router.push('/est/classified')
          res.messages.message
        }
      }
      this.isLoading = false
    },
    handleBack() {
      this.$router.go(-1)
    },
    handleTreeSelect(data) {
      this.withdraw.department = data.text
      this.selectDepartmentDialog = false
    },
    handleTreeClear() {
      this.withdraw.department = ''
      this.selectDepartmentDialog = false
    },
    openSelect() {
      this.selectDepartmentDialog = true
    },
    handleOkClick() {
      this.loadSkuFlag = false
      const skunames = []
      const skuids = []
      const skipId = []
      const saveSkuList = []
      let index = 0
      let categoryCount = 0
      let feeInputTypeCount = 0
      let productNameCount = 0
      // this.$refs.customerTree.getCheckedNodes(false, true).forEach((item) => {
      this.$refs.customerTree.getCheckedNodes().forEach((item) => {
        console.log(item)
        // if (item.id !== 'ALL') {
        //   skunames[index] = item.label
        //   // const sku = {
        //   //   id: item.id,
        //   //   name: item.label
        //   // }
        //   // skuids.push(sku)
        //   skuids[index] = item.id
        //   index++
        // }

        if (item.children) {
          for (let i = 0; i < item.children.length; i++) {
            if (item.children[i].children) {
              console.log('品类')
              if (skuids.indexOf(item.id) === -1) {
                skuids[index] = item.id
                skunames[index] = item.label
                index++
                const saveSkuItem = {
                  id: item.id,
                  name: item.label,
                  type: '1'
                }
                saveSkuList.push(saveSkuItem)
                categoryCount++
              }
              skipId.push(item.children[i].id)
              for (let j = 0; j < item.children[i].children.length; j++) {
                skipId.push(item.children[i].children[j].id)
              }
            } else {
              if (skipId.indexOf(item.id) !== -1) {
                break
              }
              console.log('费用输入分类')
              skuids[index] = item.id
              skunames[index] = item.label
              index++
              skipId.push(item.id)
              for (let k = 0; k < item.children.length; k++) {
                skipId.push(item.children[k].id)
              }
              const saveSkuItem = {
                id: item.id,
                name: item.label,
                type: '2'
              }
              saveSkuList.push(saveSkuItem)
              feeInputTypeCount++
            }
          }
        } else {
          if (skipId.indexOf(item.id) === -1) {
            console.log('产品名称')
            skuids[index] = item.id
            skunames[index] = item.label
            index++
            const saveSkuItem = {
              id: item.id,
              name: item.label,
              type: '3'
            }
            saveSkuList.push(saveSkuItem)
            productNameCount++
          }
        }
      })
      this.withdraw.skuIds = skuids
      this.withdraw.skuNames = skunames
      this.withdraw.saveSkuList = saveSkuList
      // this.withdraw.sku = skunames.join(',    ')
      this.withdraw.sku = categoryCount + '个品类，' + feeInputTypeCount + '个系列，' + productNameCount + '个SKU'
      if (this.withdraw.sku) {
        this.clearErrorMessage('sku')
      }
      this.customersDialogShow = false
      this.$refs.customerTree.setCheckedKeys([])
    },
    handleCancelClick() {
      console.log('handleCancelClick')
      this.loadSkuFlag = false
      this.customersDialogShow = false
      this.$refs.customerTree.setCheckedKeys([])
    }
  }
}
</script>
