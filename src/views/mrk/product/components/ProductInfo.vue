<template>
  <!-- 编辑画面 -->
  <div class="summary">
    <div class="detail">
      <!-- <div class="pagetitle">
        <span v-if="writeoff.identiferNum" class="pagespan">清账编号: {{ writeoff.identiferNum }}</span>
      </div> -->
      <el-collapse v-model="activeNames">
        <el-collapse-item name="1">
          <span slot="title" class="collapse-title">产品信息</span>
          <div class="input_box">
            <div class="flex3">
              <div class="title must">
                产品名称
              </div>
              <div class="input">
                <el-input v-model="writeoff.productName" :disabled="true" />
              </div>
            </div>
            <div class="flex3">
              <div class="title must">
                JAN CODE
              </div>
              <div class="input">
                <el-input v-model="writeoff.janCode" :disabled="true" />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                有效标志
              </div>
              <div class="input">
                <el-radio v-model="writeoff.productFlag" label="0" :disabled="disabled">
                  无效
                </el-radio>
                <el-radio v-model="writeoff.productFlag" label="1" :disabled="disabled">
                  有效
                </el-radio>
              </div>
            </div>
          </div>
          <div class="input_box">
            <div class="flex1">
              <div class="title">
                关联部门
              </div>
              <div class="input">
                <el-input
                  v-model="writeoff.deptRel"
                  type="textarea"
                  :rows="3"
                  height="200px"
                  :disabled="disabled"
                />
              </div>
            </div>
          </div>
          <div class="input_box">
            <div class="flex1">
              <div class="title">
                排除费目
              </div>
              <div class="input">
                <el-input
                  v-model="writeoff.accountRel"
                  type="textarea"
                  :rows="3"
                  height="200px"
                  :disabled="disabled"
                />
              </div>
            </div>
          </div>
          <div class="input_box">
            <div class="flex3">
              <div class="title">
                有无条码
              </div>
              <div class="input">
                <el-radio v-model="writeoff.eanFlag" label="0" :disabled="disabled">
                  有条码
                </el-radio>
                <el-radio v-model="writeoff.eanFlag" label="1" :disabled="disabled">
                  无条码
                </el-radio>
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                单包手续费
              </div>
              <div class="input">
                <!-- <el-input v-model="writeoff.bagCharge" clearable :disabled="disabled" /> -->
                <milli-input v-model="writeoff.bagCharge" :disabled="disabled" to-fixed-num="2" />
              </div>
              <!-- <span style="margin-left:20px;">%</span> -->
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item name="2">
          <span slot="title" class="collapse-title">计量规格</span>
          <div class="input_box">
            <div class="flex3">
              <div class="title">
                片-包
              </div>
              <div class="input">
                <milli-input v-model="writeoff.bagSpec" :disabled="true" />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                包-箱
              </div>
              <div class="input">
                <milli-input v-model="writeoff.cartonSpec" :disabled="true" />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                箱-吨
              </div>
              <div class="input">
                <milli-input v-model="writeoff.tonSpec" :disabled="true" />
              </div>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item name="3">
          <span slot="title" class="collapse-title">产品分类</span>
          <div class="input_box">
            <div class="flex3">
              <div class="title">
                品类
              </div>
              <div class="input">
                <el-input v-model="writeoff.category" :disabled="true" />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                一般促销费用分类
              </div>
              <div class="input">
                <el-input v-model="writeoff.feeType" :disabled="true" />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                费用输入分类
              </div>
              <div class="input">
                <el-input v-model="writeoff.feeInputType" :disabled="true" />
              </div>
            </div>
          </div>
          <div class="input_box">
            <div class="flex3">
              <div class="title">
                1级分类-类目
              </div>
              <div class="input">
                <el-input v-model="writeoff.category1" :disabled="true" />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                2级分类-系列
              </div>
              <div class="input">
                <el-input v-model="writeoff.category2" :disabled="true" />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                3级分类-类型
              </div>
              <div class="input">
                <el-input v-model="writeoff.category3" :disabled="true" />
              </div>
            </div>
          </div>
          <div class="input_box">
            <div class="flex3">
              <div class="title">
                4级分类-规格
              </div>
              <div class="input">
                <el-input v-model="writeoff.category4" :disabled="true" />
              </div>
            </div>
            <div class="flex3">
              <div class="title">
                渠道分类
              </div>
              <div class="input">
                <el-input v-model="writeoff.category5" :disabled="true" />
              </div>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { formValidator } from '@/mixins/form-validator.js'
import { names } from '@/mixins/names.js'
import { permission } from '@/mixins/permission-mixin.js'
import { dict } from '@/mixins/dict'
import { numFormat } from '@/mixins/num-format.js'
import { getDetail } from '@/api/mrk/productaccountrel.js'
export default {
  name: 'ProductInfo',
  mixins: [names, formValidator, permission, dict, numFormat],
  props: {
    // id: {
    //   type: String,
    //   required: true
    // },
    type: {
      type: String,
      default: 'detail'
    }
  },
  data() {
    return {
      disabled: false,
      isLoading: true,
      historyDialog: false,
      activeNames: ['1', '2', '3', '4', '5'],
      writeoff: {
        checked: true,
        radio: '1',
        radioCode: '1'
      }
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ]),
    orgRootId: function() {
      return this.userInfo.orgSeqNo.split('.')[1]
    }
  },
  watch: {
  },
  async created() {
    if (this.type === 'info') {
      this.disabled = true
    }
    this.fetchData()
  },
  methods: {
    async fetchData() {
      // 获取产品主数据详细
      const res = await getDetail(this.$route.query.id)
      if (res && res.success) {
        this.writeoff = res.datas.productinfo
      }
      this.isLoading = false
    },
    handleBack() {
      this.$router.go(-1)
    },
    getSummaries(param) {
      const { columns, data } = param
      const sums = []
      console.log(columns)
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '合计'
          return
        }
        if (index === 3 || index === 4 || index === 5 || index === 7) {
          const values = data.map(item => Number(item[column.property]))
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr)
              if (!isNaN(value)) {
                return prev + curr
              } else {
                return prev
              }
            }, 0)
            sums[index]
          } else {
            sums[index] = 'N/A'
          }
        }
      })
      return sums
    }

  }
}
</script>
