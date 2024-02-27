<template>
  <!-- 编辑画面 -->
  <div class="summary">
    <div class="detail">
      <el-collapse v-model="activeNames">
        <el-collapse-item name="1">
          <el-button size="nomal" type="primary" style="margin-left:40%" @click.stop="shopDialogShow=true">
            Brand查询
          </el-button>
        </el-collapse-item>
        <el-collapse-item name="2">
          <div>
            <iframe
              style="border:none"
              :width="searchTableWidth"
              :height="searchTableHeight"
              :src="reportUrl"
            />
            <!-- <iframe
              style="border:none"
              width="100%"
              height="100%"
              src="http://47.100.14.91:37799/webroot/decision/v5/design/report/share/2a8f4cc4a6b0439cbcf16ac4d3cf2f26?link=eyJhbGciOiJIUzI1NiJ9.eyJyZXBvcnRJZCI6IjJhOGY0Y2M0YTZiMDQzOWNiY2YxNmFjNGQzY2YyZjI2IiwidXNlcklkIjoiYjVmMGMyZWUtNjQwZi00MDM5LWE0ZDQtOTE4YjU1MzU0ODk4IiwianRpIjoiand0In0.gdkHfDuGRhfJ6WI28cnk4AzUGGwSGrQD9EJ4-KUVekg"
            /> -->
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
    <!-- 门店选择弹窗 -->
    <div>
      <el-dialog
        title="Brand选择"
        :visible.sync="shopDialogShow"
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
            :data="dataShop"
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
  //   components: { DecisionPop },
  // components: { FormElement, ColumnElement },
  mixins: [names, formValidator, dict],
  data() {
    return {
      isLoading: true,
      activeNames: ['1', '2'],
      reportUrl: '',
      searchTableHeight: 0,
      searchTableWidth: 0,
      shopDialogShow: false,
      dataShop: [
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
  },
  computed: {
  },
  watch: {

  },
  created() {
    this.reportUrl = process.env.VUE_APP_BI_URL + '/decision/v5/design/report/share/2a8f4cc4a6b0439cbcf16ac4d3cf2f26?link=eyJhbGciOiJIUzI1NiJ9.eyJyZXBvcnRJZCI6IjJhOGY0Y2M0YTZiMDQzOWNiY2YxNmFjNGQzY2YyZjI2IiwidXNlcklkIjoiYjVmMGMyZWUtNjQwZi00MDM5LWE0ZDQtOTE4YjU1MzU0ODk4IiwianRpIjoiand0In0.gdkHfDuGRhfJ6WI28cnk4AzUGGwSGrQD9EJ4-KUVekg'
    // this.reportUrl = 'https://www.baidu.com/'
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
    async fetchData() {
      // const res = await getDetail(this.id)
      // if (res && res.success) {
      //   this.decision = res.datas.decision
      // }
      this.isLoading = false
    },
    handleClearClick() {
      this.shopDialogShow = false
    },
    handleOkClick() {
      this.shopDialogShow = false
    },
    handleCancelClick() {
      this.shopDialogShow = false
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
