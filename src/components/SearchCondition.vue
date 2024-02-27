<template>
  <div class="search-data-wrapper">
    <span class="tag" @click="openDialog"><i class="el-icon-s-tools" /></span>
    <!-- 查询条件弹窗 -->
    <el-dialog
      title="查询条件"
      custom-class="content-dialog-userSelect"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      width="800px"
    >
      <div class="search-data-content">
        <div class="col-cons">
          <el-form :inline="true">
            <el-form-item label-width="60px" class="search-name" label="名称">
              <el-input />
            </el-form-item>
            <el-form-item>
              <el-button class="search-btn-save">
                保存页面当前条件
              </el-button>
            </el-form-item>
          </el-form>
          <el-row class="search-list">
            <el-col :span="12" class="list first">
              <el-row class="search-list-title">
                <el-col
                  :span="14"
                >
                  <el-checkbox
                    v-model="myValueAll"
                    :indeterminate="isIndeterminateMyValue"
                    label="我的"
                    @change="myAllChange"
                  />
                </el-col>
                <el-col :span="6">
                  创建时间
                </el-col>
                <el-col :span="4">
                  操作
                </el-col>
              </el-row>
              <el-checkbox-group v-model="myValue" @change="myChange">
                <el-row
                  v-for="(item, index) in dataList"
                  :key="index"
                  class="search-item"
                >
                  <el-col :span="14">
                    <el-checkbox :label="item.id">
                      {{ item.label }}
                    </el-checkbox>
                  </el-col>
                  <el-col :span="6">
                    2021-09-09
                  </el-col>
                  <el-col :span="4">
                    <span class="search-btn">应用</span>
                  </el-col>
                </el-row>
              </el-checkbox-group>
            </el-col>
            <el-col :span="12" class="list second">
              <el-row class="search-list-title">
                <el-col
                  :span="14"
                >
                  <el-checkbox
                    v-model="otherValueAll"
                    label="分享给我的"
                    :indeterminate="isIndeterminateOtherValue"
                    @change="otherAllChange"
                  />
                </el-col>
                <el-col :span="6">
                  分享时间
                </el-col>
                <el-col :span="4">
                  操作
                </el-col>
              </el-row>
              <el-checkbox-group v-model="otherValue" @change="otherChange">
                <el-row
                  v-for="(item, index) in otherDataList"
                  :key="index"
                  class="search-item"
                >
                  <el-col :span="14">
                    <el-checkbox :label="item.id">
                      {{ item.label }}
                    </el-checkbox>
                  </el-col>
                  <el-col :span="6">
                    2021-01-01
                  </el-col>
                  <el-col :span="4">
                    <span class="search-btn">应用</span>
                  </el-col>
                </el-row>
              </el-checkbox-group>
            </el-col>
          </el-row>
        </div>
      </div>
      <ul class="operation-box dialog-btn-box fixed-btn-box end-content-flex">
        <li class="operation-item" @click="dialogVisible = false">
          <span
            class="operation-circle circle-middle-btn btn-light-color bluebg"
          ><i
            class="iconfont iconquxiao"
          /></span>
          <span class="operation-text">{{ $t("comm.cancel") }}</span>
        </li>
        <li class="operation-item" @click="handleDel">
          <span
            class="operation-circle circle-middle-btn btn-light-color bluebg"
          ><i
            class="el-icon-delete"
          /></span>
          <span class="operation-text">{{ $t("comm.delete") }}</span>
        </li>
        <li class="operation-item" @click="handleShare">
          <span
            class="operation-circle circle-middle-btn btn-light-color bluebg"
          ><i
            class="el-icon-share"
          /></span>
          <span class="operation-text">{{ $t("comm.share") }}</span>
        </li>
      </ul>
    </el-dialog>
    <!-- 选择分享人员 -->
    <el-dialog
      title="人员分享"
      custom-class="content-dialog-userSelect"
      width="33%"
      height="150px"
      :close-on-click-modal="false"
      :visible.sync="userDistributionDialogVisible"
    >
      <user-distribution :multiple="true" @cancel="userCancel" />
    </el-dialog>
  </div>
</template>

<script>
import UserDistribution from '@/views/sale/shop/components/UserDistribution.vue'
export default {
  name: 'SearchCondition',
  components: { UserDistribution },
  data() {
    return {
      myValueAll: false,
      myValue: [],
      isIndeterminateMyValue: false,
      otherValueAll: false,
      otherValue: [],
      isIndeterminateOtherValue: false,
      dialogVisible: false,
      userDistributionDialogVisible: false,
      saveSearchVisible: false,
      saveSearchName: '',
      value: [],
      dataList: [
        {
          label: '查询条件1',
          id: 1
        },
        {
          label: '查询条件2',
          id: 2
        },
        {
          label: '查询条件3',
          id: 3
        },
        {
          label: '查询条件4',
          id: 4
        },
        {
          label: '查询条件5',
          id: 5
        }
      ],
      otherDataList: [
        {
          label: '查询条件1',
          id: 1
        },
        {
          label: '查询条件2',
          id: 2
        },
        {
          label: '查询条件3',
          id: 3
        },
        {
          label: '查询条件4',
          id: 4
        },
        {
          label: '查询条件5',
          id: 5
        }
      ]
    }
  },
  methods: {
    openDialog() {
      this.dialogVisible = true
    },
    handleShare() {
      this.userDistributionDialogVisible = true
    },
    handleDel() {},
    userCancel() {
      this.userDistributionDialogVisible = false
    },
    myAllChange(val) {
      this.myValue = val ? [1, 2, 3, 4, 5] : []
      this.isIndeterminateMyValue = false
    },
    myChange(vals) {
      const checkedNLength = vals.length
      const length = this.dataList.length
      this.myValueAll = checkedNLength === length
      this.isIndeterminateMyValue = checkedNLength > 0 && !this.myValueAll
    },
    otherAllChange(val) {
      this.otherValue = val ? [1, 2, 3, 4, 5] : []
      this.isIndeterminateOtherValue = false
    },
    otherChange(vals) {
      const checkedNLength = vals.length
      const length = this.otherDataList.length
      this.otherValueAll = checkedNLength === length
      this.isIndeterminateOtherValue = checkedNLength > 0 && !this.otherValueAll
    }
  }
}
</script>

