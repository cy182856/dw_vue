<template>
  <div class="mergeDialog">
    <el-dialog
      :class="'content-dialog-box ' + themeClass "
      :close-on-click-modal="false"
      custom-class="dialog-drag fixed-search-btn-box"
      :visible.sync="isShow"
      :before-close="handleCancelClick"
      :title=" $t('comm.merge')"
      width="80%"
      top="0"
      center
      @open="handleOpen"
    >
      <div class="item-box">
        <div class="dialog-table-box">
          <div class="input_box">
            <div class="content_div">
              <span class="ide-item-name">{{ $t(`comm.${funcDiv}IdentiferNum`) }}</span>
              <el-radio-group v-model="radioArray['identiferNum']" class="radio-group" @change="handleChangeNum">
                <el-radio lable="left" class="radio-left">
                  {{ '' }}
                </el-radio>
                <div class="input-div">
                  <input v-model="leftObj['identiferNum']" disabled="disabled" class="el-input__inner ide-item">
                </div>
                <el-radio label="right" class="radio-right">
                  {{ '' }}
                </el-radio>
                <div class="input-div">
                  <input v-model="rightObj['identiferNum']" disabled="disabled" class="el-input__inner ide-item">
                </div>
              </el-radio-group>
            </div>
          </div>
        </div>
      </div>
      <div class="footer-box" style="height:420px">
        <div class="dialog-table-box foldScroll">
          <el-collapse v-model="activeNames">
            <el-collapse-item v-for="(item) in pageConfig" :key="item.catagoryName" :name="item.catagoryName">
              <span slot="title" class="collapse-title">{{ $t(item.catagoryLabelKey) }}</span>
              <div class="input_box">
                <template v-for="(field,index2) in item.fields">
                  <div :key="index2" class="row-div">
                    <span class="item-name">{{ $t(field.i18nLabelKey) }}</span>
                    <el-radio-group v-if="unSelectItem.indexOf(field.fieldName)===-1" v-model="radioArray[field.fieldName]" class="radio-group">
                      <el-radio lable="left" class="radio-left" />
                      <div class="input-div">
                        <input v-if="field.formType === 'DictSelect'" :class="field.append?'el-input__inner input-item-suffix':'el-input__inner input-item'" :value="(field.isAddAttr? leftObj.attrs[field.fieldName]:leftObj[field.fieldName]) | dictName(field.dictTypeId)" :disabled="true">
                        <input v-if="field.formType === 'Input'" :class="field.append?'el-input__inner input-item-suffix':'el-input__inner input-item'" :value="(field.isAddAttr? leftObj.attrs[field.fieldName]:leftObj[field.fieldName])" :disabled="true">
                        <textarea v-if="field.formType ==='Textarea'" :rows="4" class="input-item" :value="(field.isAddAttr? leftObj.attrs[field.fieldName]:leftObj[field.fieldName])" :disabled="true" />
                        <input v-if="field.formType === 'UserSelect'" :class="field.append?'el-input__inner input-item-suffix':'el-input__inner input-item'" :value="(field.isAddAttr? leftObj.attrs[field.fieldName]:leftObj[field.fieldName]) | userName" :disabled="true">
                        <input v-if="field.formType === 'RelFuncSelect'" :class="field.append?'el-input__inner input-item-suffix':'el-input__inner input-item'" :value="(field.isAddAttr? leftObj.attrs[field.fieldName]:leftObj[field.fieldName]) | funcName(field.relFunc)" :disabled="true">
                        <input v-if="field.formType === 'MilliInput'" :class="field.append?'el-input__inner input-item-suffix':'el-input__inner input-item'" style="text-align:right !important" :value="(field.isAddAttr? leftObj.attrs[field.fieldName]:leftObj[field.fieldName])|numFormat(field.toFixedNum)" :disabled="true">
                        <input v-if="field.formType === 'DatePicker'" :class="field.append?'el-input__inner input-item-suffix':'el-input__inner input-item'" :value="(field.isAddAttr? leftObj.attrs[field.fieldName]:leftObj[field.fieldName]) | dateTimeFormat" :disabled="true">
                        <span v-if="field.append" class="suffix">{{ field.append }}</span>
                      </div>
                      <el-radio label="right" class="radio-right">
                        {{ '' }}
                      </el-radio>
                      <div class="input-div">
                        <input v-if="field.formType === 'DictSelect'" :class="field.append?'el-input__inner input-item-suffix':'el-input__inner input-item'" :value="(field.isAddAttr? rightObj.attrs[field.fieldName]:rightObj[field.fieldName]) | dictName(field.dictTypeId)" :disabled="true">
                        <input v-if="field.formType === 'Input'" :class="field.append?'el-input__inner input-item-suffix':'el-input__inner input-item'" :value="(field.isAddAttr? rightObj.attrs[field.fieldName]:rightObj[field.fieldName])" :disabled="true">
                        <textarea v-if="field.formType ==='Textarea'" :rows="4" class="input-item" :value="(field.isAddAttr? rightObj.attrs[field.fieldName]:rightObj[field.fieldName])" :disabled="true" />
                        <input v-if="field.formType === 'UserSelect'" :class="field.append?'el-input__inner input-item-suffix':'el-input__inner input-item'" :value="(field.isAddAttr? rightObj.attrs[field.fieldName]:rightObj[field.fieldName]) | userName" :disabled="true">
                        <input v-if="field.formType === 'RelFuncSelect'" :class="field.append?'el-input__inner input-item-suffix':'el-input__inner input-item'" :value="(field.isAddAttr? rightObj.attrs[field.fieldName]:rightObj[field.fieldName]) | funcName(field.relFunc)" :disabled="true">
                        <input v-if="field.formType === 'MilliInput'" :class="field.append?'el-input__inner input-item-suffix':'el-input__inner input-item'" style="text-align:right !important" :value="(field.isAddAttr? rightObj.attrs[field.fieldName]:rightObj[field.fieldName])|numFormat(field.toFixedNum)" :disabled="true">
                        <input v-if="field.formType === 'DatePicker'" :class="field.append?'el-input__inner input-item-suffix':'el-input__inner input-item'" :value="(field.isAddAttr? rightObj.attrs[field.fieldName]:rightObj[field.fieldName]) | dateTimeFormat" :disabled="true">
                        <span v-if="field.append" class="suffix">{{ field.append }}</span>
                      </div>
                    </el-radio-group>
                    <div v-if="unSelectItem.indexOf(field.fieldName)>=0" style="width:75%">
                      <div class="input-div unSelectItem-left" style="margin-left: 24px; padding-left:1%">
                        <input v-if="field.formType === 'DictSelect'" :class="field.append?'el-input__inner input-item-suffix':'el-input__inner input-item'" :value="(field.isAddAttr? leftObj.attrs[field.fieldName]:leftObj[field.fieldName]) | dictName(field.dictTypeId)" :disabled="true">
                        <input v-if="field.formType === 'Input'" :class="field.append?'el-input__inner input-item-suffix':'el-input__inner input-item'" :value="(field.isAddAttr? leftObj.attrs[field.fieldName]:leftObj[field.fieldName])" :disabled="true">
                        <textarea v-if="field.formType ==='Textarea'" :rows="4" class="input-item" :value="(field.isAddAttr? leftObj.attrs[field.fieldName]:leftObj[field.fieldName])" :disabled="true" />
                        <input v-if="field.formType === 'UserSelect'" :class="field.append?'el-input__inner input-item-suffix':'el-input__inner input-item'" :value="(field.isAddAttr? leftObj.attrs[field.fieldName]:leftObj[field.fieldName]) | userName" :disabled="true">
                        <input v-if="field.formType === 'RelFuncSelect'" :class="field.append?'el-input__inner input-item-suffix':'el-input__inner input-item'" :value="(field.isAddAttr? leftObj.attrs[field.fieldName]:leftObj[field.fieldName]) | funcName(field.relFunc)" :disabled="true">
                        <input v-if="field.formType === 'MilliInput'" :class="field.append?'el-input__inner input-item-suffix':'el-input__inner input-item'" style="text-align:right !important" :value="(field.isAddAttr? leftObj.attrs[field.fieldName]:leftObj[field.fieldName])|numFormat(field.toFixedNum)" :disabled="true">
                        <input v-if="field.formType === 'DatePicker'" :class="field.append?'el-input__inner input-item-suffix':'el-input__inner input-item'" :value="(field.isAddAttr? leftObj.attrs[field.fieldName]:leftObj[field.fieldName]) | dateTimeFormat" :disabled="true">
                        <span v-if="field.append" class="suffix">{{ field.append }}</span>
                      </div>
                      <div class="input-div unSelectItem-right" style="margin-left: 24px; padding-left:4%">
                        <input v-if="field.formType === 'DictSelect'" :class="field.append?'el-input__inner input-item-suffix':'el-input__inner input-item'" :value="(field.isAddAttr? rightObj.attrs[field.fieldName]:rightObj[field.fieldName]) | dictName(field.dictTypeId)" :disabled="true">
                        <input v-if="field.formType === 'Input'" :class="field.append?'el-input__inner input-item-suffix':'el-input__inner input-item'" :value="(field.isAddAttr? rightObj.attrs[field.fieldName]:rightObj[field.fieldName])" :disabled="true">
                        <textarea v-if="field.formType ==='Textarea'" :rows="4" class="input-item" :value="(field.isAddAttr? rightObj.attrs[field.fieldName]:rightObj[field.fieldName])" :disabled="true" />
                        <input v-if="field.formType === 'UserSelect'" :class="field.append?'el-input__inner input-item-suffix':'el-input__inner input-item'" :value="(field.isAddAttr? rightObj.attrs[field.fieldName]:rightObj[field.fieldName]) | userName" :disabled="true">
                        <input v-if="field.formType === 'RelFuncSelect'" :class="field.append?'el-input__inner input-item-suffix':'el-input__inner input-item'" :value="(field.isAddAttr? rightObj.attrs[field.fieldName]:rightObj[field.fieldName]) | funcName(field.relFunc)" :disabled="true">
                        <input v-if="field.formType === 'MilliInput'" :class="field.append?'el-input__inner input-item-suffix':'el-input__inner input-item'" style="text-align:right !important" :value="(field.isAddAttr? rightObj.attrs[field.fieldName]:rightObj[field.fieldName])|numFormat(field.toFixedNum)" :disabled="true">
                        <input v-if="field.formType === 'DatePicker'" :class="field.append?'el-input__inner input-item-suffix':'el-input__inner input-item'" :value="(field.isAddAttr? rightObj.attrs[field.fieldName]:rightObj[field.fieldName]) | dateTimeFormat" :disabled="true">
                        <span v-if="field.append" class="suffix">{{ field.append }}</span>
                      </div>
                    </div>
                  </div>
                </template>
              </div>
            </el-collapse-item>
          </el-collapse>
        </div>
      </div>
      <ul class="operation-box dialog-btn-box fixed-btn-box end-content-flex">
        <li class="operation-item" @click="handleCancelClick">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconquxiao" /></span>
          <span class="operation-text">{{ $t('comm.cancel') }}</span>
        </li>
        <li class="operation-item" @click="handleMergeClick">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="el-icon-download" /></span>
          <span class="operation-text">{{ $t('comm.merge') }}</span>
        </li>
      </ul>
    </el-dialog>
  </div>
</template>
<script>
import { getMergeData, mergeData } from '@/api/base.js'
import { names } from '@/mixins/names.js'
import { numFormat } from '@/mixins/num-format.js'
import { niceScroll } from '@/mixins/nice-scroll.js'
export default {
  name: 'IvMergeDialog',
  filters: {
    dateTimeFormat(val) {
      // yyyy-MM-dd HH:mm:ss 转为 yyyy-MM-dd
      return val ? val.substring(0, 10) : val
    }
  },
  mixins: [names, numFormat, niceScroll],
  props: {
    funcDiv: {
      type: String,
      default: ''
    },
    isShow: {
      type: Boolean,
      default: false
    },
    searchParam: {
      type: Map,
      default: () => { return new Map() }
    },
    unSelectItem: {
      type: Array,
      default: () => { return [] }
    }
  },
  data() {
    return {
      themeClass: localStorage.getItem('theme') !== 'Dark' ? 'search-light' : '',
      activeNames: [],
      pageConfig: [
        {
          catagoryName: '1',
          catagoryLabelKey: 'comm.essentialInformation',
          fields: []
        }
      ],
      leftObj: {},
      rightObj: {},
      radioArray: {}, // 保存radio点击的项目
      requestMap: new Map()
    }
  },
  methods: {
    handleOpen() {
      this.__getList()
    },
    async __getList() {
      const res = await getMergeData(this.funcDiv, this.searchParam)
      if (res && res.success) {
        if (res.datas.pageConfig) {
          this.pageConfig = JSON.parse(res.datas.pageConfig)
          this.activeNames = this.pageConfig.map(item => item.catagoryName)
        }
        if (res.datas.left) {
          this.leftObj = res.datas.left
        }
        if (res.datas.right) {
          this.rightObj = res.datas.right
        }
        // 将画面上要显示的项目名添加到请求map里
        const fields = this.pageConfig.map(item => item.fields)
        fields.forEach((value, index) => {
          value.forEach((v, i) => {
            this.$set(this.requestMap, v.fieldName, 'left')
            this.$set(this.radioArray, v.fieldName)
          })
        })
        this.$set(this.requestMap, 'identiferNum', 'left')
      }
      this.handleOpenedFold()
    },
    handleCancelClick() {
      this.$emit('close')
    },
    handleChangeNum() {
      const div = this.radioArray['identiferNum']
      for (var item in this.radioArray) {
        this.$set(this.radioArray, item, div)
      }
    },
    handleMergeClick() {
      this.$confirm(this.$t('comm.tip9'), this.$t('comm.tips'), {
        confirmButtonText: this.$t('comm.certain'),
        cancelButtonText: this.$t('comm.cancel'),
        type: 'warning'
      }).then(async() => {
        // 根据画面选择的radio，重新设置请求map
        // 注：通过this.$set方法设置map时，不能通过this.requestMap.forEach((value, index)进行遍历
        for (var key in this.requestMap) {
          const value = this.radioArray[key] === 'right' ? 'right' : 'left'
          this.$set(this.requestMap, key, value)
        }
        for (var k in this.searchParam) {
          if (k !== 'left' && k !== 'right') {
            this.$set(this.requestMap, this.searchParam[k], this.requestMap[k])
          }
        }
        this.$set(this.requestMap, 'leftId', this.leftObj.id)
        this.$set(this.requestMap, 'rightId', this.rightObj.id)
        this.$set(this.requestMap, 'leftUpdateTimeStamp', this.leftObj.updateTimeStamp)
        this.$set(this.requestMap, 'rightUpdateTimeStamp', this.rightObj.updateTimeStamp)
        const res = await mergeData(this.funcDiv, this.requestMap)
        if (res && res.success) {
          this.$emit('saved')
        }
      }).catch(err => {
        this.$message({
          type: 'info',
          message: this.$t('comm.msg1')
        })
        console.log(err)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.mergeDialog{
  .footer {
    text-align: right;
    padding-top: 20px;
    padding-right: 70px;
  }
  .foldScroll{
    height:400px;
    overflow: auto;
  }
  .content_div {
    margin-top:1px;
    width:100%
  }

  .ide-item-name {
    width:15%;
    color: #53C6EA !important;
    font-size: 14px;
    // margin-left:1%
  }
  .item-name {
    width:15%;
    font-size: 12px;
  }
  .radio-group {
    width:75%;
  }
  .radio-left{
    margin-right:1%;
  }
  // .ide-radio-left{
  //   margin-left:3%;
  //   margin-right:1%;
  // }
  .radio-right{
    margin-left:3%;
    margin-right:1%
  }
  .input-item {
    width:42%;
    font-size: 12px;
    border-radius: 5px;
  }
  .input-item,
  .el-input__inner{
    background-color: #eee;
  }
  .input-item-suffix {
    width:36%;
    font-size: 12px;
    background-color: #eee;
    border-radius: 5px;
  }
  .ide-item {
    width:42%;
  }
  .suffix {
    margin-left: 7px;
    font-size: 12px;
    display: inline-block;
    width: 5%;
  }
  .row-div {
    margin-top:1px;
    width:100%
  }
  .input-div {
    display: inline;
  }
}
</style>
