<template>
  <div id="account">
    <el-dialog
      class="content-dialog-box  search-light"
      :close-on-click-modal="false"
      custom-class="dialog-drag dialog-drag-heightAuto fixed-search-btn-box"
      top="0"
      :title=" '代理商选择'"
      :visible.sync="isShow"
      :before-close="handleCancelClick"
      width="80%"
      append-to-body
      @open="handleOpen"
    >
      <div style="display: flex;flex-direction: column;height: 100%;">
        <div class="app-pop-wrapper">
          <div class="app-pop-cons app-pop-table">
            <div class="middle-box">
              <div class="dialog-search-box middle-input">
                <el-form ref="searchForm" :model="searchParam.params" label-width="80px" label-position="left">
                  <el-row type="flex" justify="space-between">
                    <el-col :span="7">
                      <el-input v-model="searchParam.params.custCode" clearable placeholder="代理商编号" />
                    </el-col>
                    <el-col :span="7">
                      <el-input v-model="searchParam.params.custName" clearable placeholder="代理商名称" />
                    </el-col>
                    <el-col :span="7">
                      <el-input v-model="searchParam.params.area1" clearable placeholder="大区" />
                    </el-col>
                  </el-row>
                  <el-form-item style="margin-bottom:0 !important">
                    <ul class="operation-box end-content-flex mcbtn">
                      <li class="operation-item" @click="search">
                        <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconrefresh" /></span>
                        <span class="operation-text">{{ $t('comm.query') }}</span>
                      </li>
                      <li class="operation-item" @click="reset">
                        <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconsousuo" /></span>
                        <span class="operation-text"> {{ $t('comm.reset') }}</span>
                      </li>
                    </ul>
                  </el-form-item>
                </el-form>
              </div>
            </div>
            <div class="footer-box">
              <div class="dialog-table-box">
                <el-table
                  ref="table"
                  v-loading="isLoading"
                  :data="dataList"
                  border
                  stripe
                  height="200"
                  @selection-change="handleSelectionChange"
                >
                  <el-table-column type="selection" fixed width="55" />
                  <el-table-column prop="custCode" :label="'代理商编号'" min-width="120" />
                  <el-table-column prop="custName" :label="'代理商名称'" min-width="200" show-overflow-tooltip />
                  <el-table-column prop="area1" :label="'大区'" min-width="150" />
                </el-table>
              </div>
              <div class="pagination-box">
                <el-pagination
                  class="page-left"
                  :current-page.sync="searchParam.pageNo"
                  :page-size="searchParam.pageSize"
                  layout="total,sizes"
                  :total="searchParam.totalRecord"
                  popper-class="blueDL"
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                />
                <el-pagination
                  class="page-right"
                  :current-page.sync="searchParam.pageNo"
                  :page-size="searchParam.pageSize"
                  layout="prev,pager,next,slot,jumper"
                  :total="searchParam.totalRecord"
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                >
                  <span class="iconfont iconjiantou-youzhi page-last-page" @click="toLastPage" />
                </el-pagination>
                <el-pagination class="page-right  page-first" layout="slot">
                  <span class="iconfont iconjiantou-zuozhi page-first-page" @click="toFirstPage" />
                </el-pagination>
              </div>
            </div>
          </div>
          <div v-if="multiple" class="app-pop-cons app-pop-multi">
            <div class="app-pop-multi-selected">
              <p class="app-pop-title">
                已选择
              </p>
              <div class="app-pop-multi-tag">
                <el-tag
                  v-for="(item,index) in myTagsPop"
                  :key="index"
                  closable
                  type="info"
                  @close="closeTags(index)"
                >
                  {{ item.tag }}
                </el-tag>
              </div>
            </div>
          </div>
        </div>
        <ul class="operation-box dialog-btn-box fixed-btn-box end-content-flex">
          <li v-if="isSelectAll" style="margin-right: auto !important;" class="operation-item" @click="handleSelectAllClick">
            <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconquxiao" /></span>
            <span class="operation-text">全选</span>
          </li>
          <li class="operation-item" @click="handleCancelClick">
            <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconquxiao" /></span>
            <span class="operation-text">{{ $t('comm.cancel') }}</span>
          </li>
          <li class="operation-item" @click="handleClearClick">
            <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconquxiao" /></span>
            <span class="operation-text">{{ $t('comm.clear') }}</span>
          </li>
          <li class="operation-item" @click="handleOkClick">
            <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconqueren" /></span>
            <span class="operation-text">{{ $t('comm.certain') }}</span>
          </li>
        </ul>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { search } from '@/mixins/search-params'
import { getPopList, getPopList2 } from '@/api/mrk/customer.js'
import { names } from '@/mixins/names.js'
import { formValidator } from '@/mixins/form-validator.js'
import { popSelect } from '@/mixins/pop-select.js'
export default {
  name: 'AccountPop',
  mixins: [names, search, formValidator, popSelect],
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    isSelectAll: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isLoading: false,
      activeNames: ['1'],
      selectUserDialog: false,
      dataList: [],
      multipleSelection: [],
      exportSelectDilog: false,
      salesOffice: [{
        value: '1',
        label: '所在大区 - EC'
      }, {
        value: '2',
        label: '华东地区'
      }, {
        value: '3',
        label: '华南地区'
      }, {
        value: '4',
        label: '西南地区'
      }, {
        value: '5',
        label: '华北地区'
      }],
      // 分页插件数据
      searchParam: {
        paging: true,
        pageNo: 1, // 当前页码
        pageSize: 10, // 每页条数
        totalRecord: null, // 总条数
        params: {
          custCode: '',
          custName: '',
          area1: ''
        }
      }
    }
  },
  methods: {
    async fetchData() {
      this.isLoading = true
      let res

      if (this.multiple) {
        console.log(this.multiple, 111)
        res = await getPopList(this.searchParam)
      } else {
        console.log(this.multiple, 222)
        res = await getPopList2(this.searchParam)
      }
      // const res = await getPopList(this.searchParam)
      if (res && res.success) {
        const { results, pageNo, totalRecord } = res.datas.searchResult
        this.dataList = results
        this.searchParam.pageNo = pageNo
        this.searchParam.totalRecord = totalRecord
        if (this.multiple) {
          const that = this
          this.dataList.forEach(item => {
            const arr = this.myTagsPop.filter(item2 => item2.id === item.id)
            if (arr.length > 0) {
              setTimeout(function() {
                that.toggleSelection(item, true)
              }, 500)
            } else {
              that.toggleSelection(item, false)
            }
          })
        }
      }
      this.tableDolayout(this.$refs['table'])
      this.isLoading = false
    }
  }
}
</script>
<style lang="scss" scoped>
.account {
  .editDilog {
    h5 {
      font-size: 16px;
      line-height: 30px;
      height: 30px;
      .add_row {
        position: absolute;
        right: 25px;
        border-radius: 6px;
        cursor: pointer;
        font-size: 12px;
        width: 100px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        background-image: linear-gradient(rgb(52, 165, 248), rgb(8, 142, 240));
        color: #fff;
        &:hover {
          background-image: linear-gradient(rgb(42, 155, 238), rgb(8, 142, 240));
        }
      }
    }
  }
}
.pagination {
  position: relative;
  .select_header {
    position: absolute;
    top: 26px;
    left: 0;
  }
  .el-icon-menu {
    color: skyblue;
    font-size: 18px;
    cursor: pointer;
  }
  .check_box_item {
    padding-top: 15px;
    border-top: 1px solid #666;
  }
}
</style>
<style lang="scss">
</style>
