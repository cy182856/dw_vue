<template>
  <!-- 编辑画面 -->
  <div class="summary">
    <div class="detail">
      <el-collapse v-model="activeNames">
        <el-collapse-item name="1">
          <span slot="title" class="collapse-title">代理商费用科目报表</span>
          <div>
            <iframe
              style="border:none"
              width="100%"
              :height="searchTableHeight"
              :src="reportUrl"
            />
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
    <!-- 门店选择弹窗 -->
    <div>
      <el-dialog
        title="Brand选择"
        :visible.sync="brandDialogShow"
        custom-class="content-dialog-userSelect"
        width="33%"
        height="150px"
        :close-on-click-modal="false"
        center
      >
        <div class="tree_box" style="height:340px;overflow-x:auto">
          <el-tree
            ref="tree"
            default-expand-all
            :data="brands"
            show-checkbox
            node-key="id"
          />
        </div>
        <ul class="operation-box dialog-btn-box fixed-btn-box end-content-flex">
          <li class="operation-item" @click="handleCancelClick">
            <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconquxiao" /></span>
            <span class="operation-text">{{ $t('comm.cancel') }}</span>
          </li>
          <!-- <li class="operation-item" @click="handleClearClick">
            <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconrefresh" /></span>
            <span class="operation-text">{{ $t('comm.clear') }}</span>
          </li> -->
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

import { formValidator } from '@/mixins/form-validator.js'
import { names } from '@/mixins/names.js'
import { dict } from '@/mixins/dict'
export default {
  name: 'EstReport',
  mixins: [names, formValidator, dict],
  data() {
    return {
      isLoading: true,
      activeNames: ['1', '2'],
      reportUrl: '',
      searchTableHeight: 0,
      searchTableWidth: 0,
      brandDialogShow: false,
      searchParam: {
        paging: false,
        params: {
          brands: ''
        }
      },
      brands: [{
        id: 0,
        label: '产品组',
        children: [
          {
            id: 1,
            label: 'MERRIES',
            children: [
              {
                id: 11,
                label: 'MERRIES PANTS'
              },
              {
                id: 12,
                label: 'MERRIES S-PREMIUM'
              }
            ]
          },
          {
            id: 2,
            label: 'Biore',
            children: [
              {
                id: 21,
                label: 'Biore_sub1'
              },
              {
                id: 22,
                label: 'Biore_sub2'
              }
            ]
          }
        ]
      }
      ]
    }
  },
  computed: {
  },
  watch: {

  },
  created() {
    this.reportUrl = process.env.VUE_APP_BI_URL + '/decision/v10/entry/access/85e6874d-bbed-4b67-a763-58325b3c2b5f?preview=true'
  },
  mounted() {
    window.onresize = () => {
      this.widthHeight() // 自适应高宽度
    }
    this.$nextTick(function() {
      this.widthHeight()
    })
  },
  methods: {
    widthHeight() {
      this.searchTableHeight = window.innerHeight - 146
      this.searchTableWidth = window.innerWidth - 280
    },
    search() {
      this.isLoading = true
    },
    async fetchData() {
      // const res = await getDetail(this.id)
      // if (res && res.success) {
      //   this.decision = res.datas.decision
      // }
      this.isLoading = false
    },
    handleClearClick() {
      this.searchParam.params.brands = ''
      this.$refs.tree.setCheckedKeys([])
      this.brandDialogShow = false
    },
    handleOkClick() {
      const names = this.$refs.tree.getCheckedNodes().map((item) => item.label)
      this.searchParam.params.brands = names.join('    ')
      this.brandDialogShow = false
      this.$refs.tree.setCheckedKeys([])
    },
    handleCancelClick() {
      this.brandDialogShow = false
      this.$refs.tree.setCheckedKeys([])
    },
    handleResetParams() {
      this.searchParam.params.brands = ''
    }

  }
}
</script>
<style lang="scss" scoped>
.col_input_box {
  height: auto;
}
</style>
<style lang="scss" scoped>
.editbtn {
  background-color:rgb(102, 206, 188);
  color: white;
  margin-left: 50%;
  border: 0px solid #DCDFE6;
}
</style>
