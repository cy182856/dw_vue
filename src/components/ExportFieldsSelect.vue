<template>
  <div class="display: flex;flex-direction: column;height: 100%;">
    <div class="middle-box">
      <el-transfer v-model="selectedFields" :titles="[$t('comm.unSelectFields'),$t('comm.selectedFields')]" target-order="push" :data="fields" />

    <!-- <div class="footer">
      <span>
        <el-button type="primary" @click="handleExportClick">{{ $t('comm.export') }}</el-button>
      </span>
    </div> -->
    </div>
    <ul class="operation-box dialog-exportbtn-box fixed-btn-box end-content-flex">
      <li class="operation-item" @click="handleExportClick">
        <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="el-icon-download" /></span>
        <span class="operation-text">{{ $t('comm.export') }}</span>
      </li>
    </ul>
  </div>
</template>
<script>
import { getExportItems, exportData } from '@/api/base'
import { niceScroll } from '@/mixins/nice-scroll.js'
export default {
  name: 'IvExportFieldsSelect',
  mixins: [niceScroll],
  props: {
    funcDiv: {
      type: String,
      default: ''
    },
    searchParam: {
      type: Object,
      default: () => { return {} }
    },
    fileType: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      fields: [],
      selectedFields: [],
      exportParam: []
    }
  },
  created() {
    this.__getList()
  },
  methods: {
    async __getList() {
      const res = await getExportItems(this.funcDiv)
      // console.log(res)
      const { success, datas } = res
      if (success && datas.fields) {
        this.fields = datas.fields.map(item => {
          return {
            ...item,
            key: item.fieldName,
            label: this.$t(item.i18nLabelKey) || item.label
          }
        })
        const defaultFields = this.fields.filter(item => item.isDefaultColumn === '1')
        if (defaultFields) {
          this.selectedFields = defaultFields.map(item => item.key)
        }
      } else {
        this.fields = []
      }

      this.exportParam = this.searchParam
      const _this = this
      setTimeout(function() {
        _this.handleOpenedTransfer()
      }, 100)
    },
    handleExportClick() {
      this.exportParam.params.fields = this.selectedFields
      exportData(this.funcDiv, this.fileType || 'xlsx', this.exportParam)
    }
  }
}
</script>
<style lang="scss" scoped >
.el-transfer-panel__list{
  overflow:hidden !important;
}
.fixed-btn-box{
  position: relative !important;
}

.exportFields{
  .el-transfer{
    font-size: 12px;
    .el-checkbox {
      display: inline-block;
      position: relative;
      white-space: nowrap;
      width: 100%;
    }
  }
  .footer {
    // text-align: right;
    padding-top: 20px;
    padding-right: 70px;
  }
}
</style>
