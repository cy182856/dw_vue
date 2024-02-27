<template>
  <div style="width:100%;" class="pop-multiple" :class="consClassCom" @click="disabled?'':appendBtn?'':selectDialog=true">
    <template v-if="relFuncStyle === 'write'">
      {{ value|funcNameByCode(relFunc) }}
    </template>
    <template v-else>
      <el-tooltip class="item iswidth" effect="dark" :disabled="!value||!isDisplayTip" :content="toolTip" placement="top">
        <template v-if="relFuncStyle === 'input'">
          <div align="center">
            <template v-if="multiple">
              <div class="pop-multiple-cons">
                <div v-if="collapseTags" class="tag-list">
                  <el-tag v-if="myTags.length>0" type="info" size="mini" :closable="IsCloseCom" @close="closeTags(0)">
                    {{ myTags[0].tag }}
                  </el-tag>
                </div>
                <div v-else class="tag-list">
                  <template v-for="(item,index) in myTags">
                    <el-tag :key="index" type="info" size="mini" :closable="IsCloseCom" @close="closeTags(index)">
                      {{ item.tag }}
                    </el-tag>
                  </template>
                </div>
              </div>
              <div class="pop-multiple-cons pop-multiple-position">
                <div v-if="collapseTags" class="tag-list">
                  <el-tag v-if="myTags.length>0" type="info" size="mini" :closable="IsCloseCom" @close="closeTags(0)">
                    {{ myTags[0].tag }}
                  </el-tag>
                </div>
                <div v-else class="tag-list">
                  <template v-for="(item,index) in myTags">
                    <el-tag :key="index" type="info" size="mini" :closable="IsCloseCom" @close="closeTags(index)">
                      {{ item.tag }}
                    </el-tag>
                  </template>
                </div>
              </div>
            </template>
            <template v-else-if="isSeparateStr">
              <div class="pop-multiple-cons pop-multiple-none">
                <p v-if="myTags.length>0" :class="isBreak?'break':'ellipsis'">
                  {{ myTags[0].tag }}
                </p>
              </div>
              <div class="pop-multiple-cons pop-multiple-single">
                <p v-if="myTags.length>0" :class="isBreak?'break':'ellipsis'">
                  {{ myTags[0].tag }}
                </p>
              </div>
            </template>
            <el-tag v-if="collapseTags&&myTags.length>1" class="collapse-tag" type="info" size="mini">
              +{{ myTags.length }}
            </el-tag>
            <el-input v-if="isGetName" :class="multiple||isSeparateStr?'nocolor':'txt'" :value="value|funcNameByCode(relFunc)" :disabled="disabled" :placeholder="placeholder" size="small" suffix-icon="el-icon-search" @clear.native="handleSelectClear" @click.native="selectDialog=disabled?false:true" />
            <el-input v-else-if="appendBtn" class="txt" :value="myValue" :disabled="disabled" :placeholder="placeholder" size="small" @input="handleInput">
              <el-button slot="append" type="primary" icon="el-icon-search" size="small" @click="!disabled?selectDialog=true:''" />
            </el-input>
            <el-input v-else :class="multiple||isSeparateStr?'nocolor':'txt'" :value="value" :disabled="disabled" :placeholder="placeholder" size="small" suffix-icon="el-icon-search" @clear.native="handleSelectClear" @click.native="selectDialog=disabled?false:true" />
          </div>
        </template>
        <template v-else-if="relFuncStyle === 'button'">
          <div align="center">
            <el-button :class="btnOptionCom.classStr" :size="btnOptionCom.size" :icon="btnOptionCom.icon" :type="btnOptionCom.type" @click.native="selectDialog=disabled?false:true">
              {{ btnOptionCom.text }}
            </el-button>
          </div>
        </template>
        <template v-else-if="relFuncStyle === 'icon'">
          <div align="center">
            <el-button :class="btnOptionCom.classStr" :size="btnOptionCom.size" :icon="btnOptionCom.icon" :type="btnOptionCom.type" @click.native="selectDialog=disabled?false:true">
              {{ btnOptionCom.text }}
            </el-button>
          </div>
        </template>
        <template v-else-if="relFuncStyle === 'customize'">
          <div align="center">
            <el-button :class="btnOptionCom.classStr" :size="btnOptionCom.size" :icon="btnOptionCom.icon" :type="btnOptionCom.type" @click.native="selectDialog=disabled?false:true">
              {{ btnOptionCom.text }}
            </el-button>
          </div>
        </template>
      </el-tooltip>
      <account-pop
        v-if="relFunc==='account' || relFunc===''"
        :rel-func="relFunc"
        :is-show="selectDialog"
        :params="params"
        :can-reset-params="canResetParams"
        :multiple="multiple"
        :cleardata="cleardata"
        :is-save-lastdata="isSaveLastdata"
        :item-name="itemNameCom"
        :is-separate-str="isSeparateStr"
        :separator="separator"
        :my-tags="myTags"
        :tag-name="tagName"
        @cancel="selectDialog=false"
        @clear="handleSelectClear"
        @select="handleSelected"
      />
      <lead-pop v-if="relFunc==='lead'" :is-show="selectDialog" @cancel="selectDialog=false" @clear="handleSelectClear" @select="handleSelected" />
      <contact-pop v-if="relFunc==='contact'" :is-show="selectDialog" @cancel="selectDialog=false" @clear="handleSelectClear" @select="handleSelected" />
      <quote-pop v-if="relFunc==='quote'" :is-show="selectDialog" @cancel="selectDialog=false" @clear="handleSelectClear" @select="handleSelected" />
      <salesopportunity-pop v-if="relFunc==='salesopportunity'" :is-show="selectDialog" @cancel="selectDialog=false" @clear="handleSelectClear" @select="handleSelected" />
      <pricebook-pop v-if="relFunc==='pricebook'" :is-show="selectDialog" :row="row" @cancel="selectDialog=false" @clear="handleSelectClear" @select="handleSelected" />
      <supplier-pop v-if="relFunc==='supplier'" :is-show="selectDialog" :row="row" @cancel="selectDialog=false" @clear="handleSelectClear" @select="handleSelected" />
      <salesorder-pop v-if="relFunc==='salesorder'" :is-show="selectDialog" @cancel="selectDialog=false" @clear="handleSelectClear" @select="handleSelected" />
      <contract-pop v-if="relFunc==='contract'" :is-show="selectDialog" @cancel="selectDialog=false" @clear="handleSelectClear" @select="handleSelected" />
      <decision-pop v-if="relFunc==='decision'" :is-show="selectDialog" @cancel="selectDialog=false" @clear="handleSelectClear" @select="handleSelected" />
      <product-pop v-if="relFunc==='product'" :is-show="selectDialog" @cancel="selectDialog=false" @clear="handleSelectClear" @select="handleSelected" />
      <motion-pop v-if="relFunc==='motion'" :is-show="selectDialog" @cancel="selectDialog=false" @clear="handleSelectClear" @select="handleSelected" />
    </template>
  </div>
</template>
<script>
import { formValidator } from '@/mixins/form-validator.js'
import { names } from '@/mixins/names.js'
import AccountPop from '@/views/mrk/customer/components/CustomerPop.vue'
import LeadPop from '@/views/mrk/lead/components/LeadPop.vue'
import SupplierPop from '@/views/mrk/supplier/components/SupplierPop.vue'
import ContactPop from '@/views/mrk/contact/components/ContactPop.vue'
import QuotePop from '@/views/sale/quote/components/QuotePop.vue'
import SalesopportunityPop from '@/views/sale/salesopportunity/components/SalesopportunityPop.vue'
import PricebookPop from '@/views/mdm/pricebook/components/PricebookPop.vue'
import SalesorderPop from '@/views/sale/salesorder/components/SalesorderPop.vue'
import ProductPop from '@/views/mdm/product/components/ProductPop.vue'
import ContractPop from '@/views/mgt/contract/components/ContractPop.vue'
import DecisionPop from '@/views/mgt/decision/components/DecisionPop.vue'
import MotionPop from '@/views/fee/promotion/components/MotionPop.vue'
export default {
  name: 'RelFuncSelect',
  components: {
    AccountPop, LeadPop, SupplierPop, ContactPop, QuotePop, SalesopportunityPop, PricebookPop, SalesorderPop, ContractPop, DecisionPop, ProductPop, MotionPop
  },
  mixins: [formValidator, names],
  props: {
    value: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    relFunc: {
      type: String,
      default: 'account'
    },
    isSelectDialog: {
      type: Boolean,
      default: false
    },
    // 搜索条件
    params: {
      type: Object,
      default: () => {}
    },
    canResetParams: {
      type: Boolean,
      default: false
    },
    // 组件类型样式，输入框——input，按钮——button，只显示icon——icon，通过code获取名称——write，自定义——customize
    relFuncStyle: {
      type: String,
      default: 'input',
      validator(value) {
        return ['input', 'fuzzy-button', 'button', 'icon', 'write', 'customize'].indexOf(value) !== -1
      }
    },
    appendBtn: {
      type: Boolean,
      default: false
    },
    // 是否显示tooltip
    isDisplayTip: {
      type: Boolean,
      default: false
    },
    // tooltip显示字段，默认取【tagName】中第一个
    tipName: {
      type: String,
      default: ''
    },
    // 是否获取相应name
    isGetName: {
      type: Boolean,
      default: false
    },
    // 是否显示可清空按钮
    isClose: {
      type: Boolean,
      default: true
    },
    // 按钮（依赖【relFuncStyle】为 button ）——配置项默认见【btnDefaultOption】
    btnOption: {
      type: Object,
      default: () => {}
    },
    // 当前rel组件所在表格的行序号
    rowIndex: {
      type: Number,
      default: 0
    },
    row: {
      type: Object,
      default: () => {}
    },
    // 读取列表的value值,未设置时，默认取【tagName】中第一个
    itemName: {
      type: String,
      default: ''
    },
    /** 数据显示的值，多个值用逗号隔开，连接字符可用【separator】自定义
     * 为 true 则取【tagName】中以pop名称为key的数组
     * 若为 false 或者【tagName】中未设，则取【itemName】为显示值
     */
    isSeparateStr: {
      type: [String, Boolean],
      default: ''
    },
    // 标签分隔符（设置了【isSeparateStr】或【tagName】才会生效）
    separator: {
      type: String,
      default: ' - '
    },
    // 是否开启多选
    multiple: {
      type: Boolean,
      default: false
    },
    cleardata: {
      type: Boolean,
      default: false
    },
    // 是否保留上次所选值
    isSaveLastdata: {
      type: Boolean,
      default: true
    },
    // 单选时，显示文字是否换行,可配合【isDisplayTip】使用
    isBreak: {
      type: Boolean,
      default: true
    },
    // 多选（依赖【multiple】）——默认值数组
    defaultTags: {
      type: Array,
      default: () => []
    },
    // 多选（依赖【multiple】）——是否折叠选值
    collapseTags: {
      type: Boolean,
      default: false
    },
    // 自定义组件内容class名
    consClass: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      myValue: this.value,
      selectDialog: false,
      toolTip: '',
      myTags: [],
      // 按钮形式默认参数值
      btnDefaultOption: {
        size: 'mini',
        icon: 'el-icon-search',
        type: 'primary',
        text: '',
        classStr: ''
      },
      // tag中显示名称字段设置
      tagName: {
        account: ['custCode', 'custName']
      },
      // 分页插件数据
      searchParam: {
        paging: true,
        pageNo: 1, // 当前页码
        pageSize: 50, // 每页条数
        totalRecord: null, // 总条数
        params: {
        }
      }
    }
  },
  computed: {
    consClassCom() {
      const hasList = this.$route.fullPath.toLowerCase().indexOf('list') > -1 || ['/writeoff/other'].includes(this.$route.fullPath)
      const str = hasList ? ' list-pop ' : ' detail-pop '
      const collapse = this.collapseTags ? ' collapse-pop ' : ' '
      const hasSelected = this.myTags.length > 0 ? ' hasSelected ' : ' '
      const isWrite = this.myTags.length > 0 ? ' write-pop ' : ' '
      return this.consClass + str + collapse + hasSelected + isWrite + (this.disabled ? ' disabled' : '')
    },
    btnOptionCom() {
      return Object.assign(this.btnDefaultOption, this.btnOption)
    },
    IsCloseCom() {
      return this.isClose && !this.disabled
    },
    itemNameCom() {
      return this.itemName ? this.itemName : this.tagName[this.relFunc] ? this.tagName[this.relFunc][0] : 'custCode'
    }
  },
  watch: {
    value(newVal) {
      if (this.isGetName) {
        this.myValue = this.handleFuncNameByCode(newVal, this.relFunc)
      } else {
        this.myValue = newVal
      }
    },
    defaultTags(newVal) {
      this.handleMyTags(newVal)
    }
  },
  created() {
    this.selectDialog = this.isSelectDialog
    this.handleMyTags(this.defaultTags)
  },
  methods: {
    handleMyTags(tags) {
      this.myTags = tags
      this.myTags.forEach(item => {
        item.tag = this.formatTag(item)
      })
      this.toolTip = this.getDisplayTip()
    },
    handleSelectClear() {
      this.handleSelected([], true)
    },
    handleSelected(data, tag) {
      if (!tag && !this.multiple && (!data || data.length !== 1)) {
        this.$message({
          type: 'error',
          message: '请选择一条记录'
        })
        return
      }
      this.handleMyTags(data)
      if (this.isSeparateStr) {
        this.$emit('input', this.getValueNameVal(data))
      } else {
        this.$emit('input', data[0] ? data[0][this.itemNameCom] : '')
      }
      if (this.multiple) {
        this.$emit('data', { data: data, rowIndex: this.rowIndex, value: this.getValueNameVal(data), tags: this.myTags })
      } else {
        data.rowIndex = this.rowIndex
        data.value = this.getValueNameVal(data)
        this.$emit('data', data)
      }
      this.selectDialog = false
    },
    handleInput(val) {
      this.$emit('input', val)
    },
    closeTags(index) {
      this.myTags.splice(index, 1)
      this.handleSelected(this.myTags, true)
    },
    getDisplayTip() {
      return this.myTags.map(item => item[this.tipName]).toString()
    },
    getValueNameVal(data) {
      if (!this.multiple && this.isGetName) {
        return this.value
      } else {
        return data.map(item => item[this.itemNameCom]).toString()
      }
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
        return value[this.itemNameCom] ? value[this.itemNameCom] : this.tagName[this.relFunc] ? value[this.tagName[this.relFunc][0]] : ''
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  .RelFuncSelect {
    width: 100%;
  }
  .iswidth{
    width:100% !important;
  }
</style>
<style lang="scss">
.pop-multiple .el-input-group__append{
  padding: 0;
}
.pop-multiple .el-input-group__append button.el-button.el-button--primary{
  height: 100%;
  background-color: #409EFF;
  border-color: #409EFF;
  margin: 0;
  padding: 0 15px;
  i{
    color: #fff;
  }
}
</style>

