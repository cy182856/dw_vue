<template>
  <div class="apply">
    <formDesign :formdata="data" @save="saveform" @compositeData="compositeData" />
    <div>
      <el-dialog
        class="content-dialog-box  search-light"
        :close-on-click-modal="false"
        custom-class="dialog-drag dialog-drag-heightAuto fixed-search-btn-box"
        top="0"
        :title="$t('comm.save')"
        :visible.sync="showDialog"
        width="40%"
        center
      >
        <div class="display: flex;flex-direction: column;height: 100%;">
          <div class="middle-box">
            <div class="input_box">
              <div class="flex2">
                <div class="title must">
                  页面ID
                </div>
                <div class="input">
                  <el-input v-model="pageData.configId" :disabled="isDisabide" class="input" />
                  <span ref="configId" data-roles="required" :data-value="pageData.configId" class="message" />
                </div>
              </div>
              <div class="flex2">
                <div class="title must">
                  页面名称
                </div>
                <div class="input">
                  <el-input v-model="pageData.value1" class="input" />
                  <span ref="value1" data-roles="required" :data-value="pageData.value1" class="message" />
                </div>
              </div>
            </div>
          </div>
          <ul class="operation-box dialog-btn-box fixed-btn-box end-content-flex">
            <li class="operation-item" @click="handleSave">
              <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconqueren" /></span>
              <span class="operation-text">{{ $t('comm.certain') }}</span>
            </li>
          </ul>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { savePageConfig } from '@/api/admin/pageConfig-api'
export default {
  name: 'PageConfigEdit',
  components: {},
  data() {
    return {
      showDialog: false,
      isDisabide: false,
      pageData: {
        value1: '',
        configId: '',
        value10: ''
      },
      data: {

      },
      defaultData: {
        name: 1,
        age: 2
      }
    }
  },
  created() {
    var pageData = this.$route.query.pageData
    if (pageData !== undefined) {
      this.isDisabide = true
      this.pageData.configId = pageData.configId
      this.pageData.value1 = pageData.value1
      if (pageData.value10 !== undefined && pageData.value10 !== null) {
        this.data.forms = this.sortData(pageData.value10)
      }
    }
  },
  methods: {
    sortData(data) {
      var form = []
      var json = JSON.parse(data)
      console.log(json)
      json.forEach(item => {
        if (item.formType === 'ElCollapseItem') {
          var module = item
          // if (item.elCollapseItemType === undefined) {
          //   module.elCollapseItemType = 'config'
          // }
          // if (module.showFrom.indexOf('elCollapseItemType') === -1) {
          //   module.showFrom.push('elCollapseItemType')
          // }
          // if (module.showFrom.indexOf('showName') === -1) {
          //   module.showFrom.push('showName')
          // }
          // if (module.showFrom.indexOf('showName') !== 0) {
          //   module.showFrom[module.showFrom.indexOf('showName')] = module.showFrom[0]
          //   module.showFrom[0] = 'showName'
          // }
          // if (module.showFrom.indexOf('i18nLabelKey') !== 1) {
          //   module.showFrom[module.showFrom.indexOf('i18nLabelKey')] = module.showFrom[1]
          //   module.showFrom[1] = 'i18nLabelKey'
          // }
          // if (module.showFrom.indexOf('fieldName') !== 2) {
          //   module.showFrom[module.showFrom.indexOf('fieldName')] = module.showFrom[2]
          //   module.showFrom[2] = 'fieldName'
          // }
          form.push(module)
          // if (item.columns !== []) {
          //   item.columns.forEach(item1 => {
          //     form.push(item1)
          //   })
          // }
          if (item.fields !== undefined && item.fields !== []) {
            item.fields.forEach(item1 => {
              // if (item1.formType === 'ColumnsLayout' && item1.columns !== []) {
              //   item1.columns.forEach(item2 => {
              //     if (item2.formType !== '') {
              //       if (item2.showFrom.indexOf('showName') === -1) {
              //         item2.showFrom.push('showName')
              //       }
              //       if (item2.showFrom.indexOf('showName') !== 0) {
              //         item2.showFrom[item2.showFrom.indexOf('showName')] = item2.showFrom[0]
              //         item2.showFrom[0] = 'showName'
              //       }
              //       if (item2.showFrom.indexOf('i18nLabelKey') !== 1) {
              //         item2.showFrom[item2.showFrom.indexOf('i18nLabelKey')] = item2.showFrom[1]
              //         item2.showFrom[1] = 'i18nLabelKey'
              //       }
              //       if (item2.showFrom.indexOf('fieldName') !== 2) {
              //         item2.showFrom[item2.showFrom.indexOf('fieldName')] = item2.showFrom[2]
              //         item2.showFrom[2] = 'fieldName'
              //       }
              //     }
              //   })
              // } else {
              //   if (item1.showFrom.indexOf('showName') === -1) {
              //     item1.showFrom.push('showName')
              //   }
              //   if (item1.showFrom.indexOf('showName') !== 0) {
              //     item1.showFrom[item1.showFrom.indexOf('showName')] = item1.showFrom[0]
              //     item1.showFrom[0] = 'showName'
              //   }
              //   if (item1.showFrom.indexOf('i18nLabelKey') !== 1) {
              //     item1.showFrom[item1.showFrom.indexOf('i18nLabelKey')] = item1.showFrom[1]
              //     item1.showFrom[1] = 'i18nLabelKey'
              //   }
              //   if (item1.showFrom.indexOf('fieldName') !== 2) {
              //     item1.showFrom[item1.showFrom.indexOf('fieldName')] = item1.showFrom[2]
              //     item1.showFrom[2] = 'fieldName'
              //   }
              // }
              // if (item1.formType === 'Input') {
              //   if (item1.showFrom.indexOf('clearable') === -1) {
              //     item1.showFrom.push('clearable')
              //     item1.clearable = true
              //   }
              // }
              // if (item1.formType === 'ColumnsLayout' && item1.columns !== []) {
              //   item1.columns.forEach(item2 => {
              //     if (item2.formType !== '') {
              //       if (item2.formType === 'Input') {
              //         if (item2.showFrom.indexOf('clearable') === -1) {
              //           item2.showFrom.push('clearable')
              //           item2.clearable = true
              //         }
              //       }
              //     }
              //   })
              // }
              form.push(item1)
            })
          }
        } else {
          form.push(item)
        }
      })
      return form
    },
    saveform(data) {
      this.data = data
      this.showDialog = true
    },
    compositeData(data) {
      var newData = {}
      return newData
    },
    async handleSave() {
      if (this.pageData.configId === '' || this.pageData.value1 === '') {
        this.$message({
          type: 'error',
          message: this.$t('comm.msg24')
        })
        return false
      }
      var values = []
      var index = 0
      this.data.forms.forEach(item => {
        if (item.formType === 'ElCollapseItem') {
          item.catagoryName = index + 1
          item.catagoryLabelKey = item.i18nLabelKey ? item.i18nLabelKey : item.showName
          item.fields = []
          values.push(item)
          index = index + 1
        } else {
          var field = item
          // Object.keys(field).map((item) => {
          //   if (field[item] === '') {
          //     delete field[item]
          //   }
          //   return true
          // })
          // field.formType = item.formType
          // field.fieldName = item.fieldName
          // field.i18nLabelKey = item.i18nLabelKey
          // field.id = item.id
          // field.showFrom = item.showFrom
          // field.name = item.name
          values[(index - 1)].fields.push(field)
        }
      })
      var value10 = JSON.stringify(values)
      this.pageData.value10 = value10
      this.pageData.type = 'PageConfig'
      await savePageConfig(this.pageData).then(() => {
        this.$router.push({ path: '/admin/pageConfig' })
      })
      this.showDialog = false
    },
    save(data) {
      // 通过校验时 返回 用户提交的表单数据  未通过时 返回false
      if (data) {
        console.log(data)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.cont {
  width: 800px;
  margin: 20px auto;
}
</style>
