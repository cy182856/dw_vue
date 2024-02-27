<template>
  <div class="apply">
    <div class="search-left-box search-left-box-light">
      <div class="search-title">
        {{ $t("comm.queryCriteria") }}<search-condition />
      </div>
      <el-scrollbar>
        <el-form
          ref="form"
          class="search-form default-input"
          label-position="left"
        >
          <el-form-item prop="">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t("sale.shop.shopNo") }}:
              </el-col>
              <el-col :span="16">
                <el-input clearable />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t("sale.shop.shopName") }}:
              </el-col>
              <el-col :span="16">
                <el-input clearable />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t("sale.shop.shopAbbr") }}:
              </el-col>
              <el-col :span="16">
                <el-input clearable />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t("sale.workplan.salesBear") }}:
              </el-col>
              <el-col :span="16">
                <user-select />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t("sale.salesandshops.goodsGroup") }}:
              </el-col>
              <el-col :span="16">
                <el-select
                  v-model="searchKey.goodsGroup"
                  filterable
                  placeholder="请选择"
                >
                  <el-option value="1" label="铺货组1" />
                  <el-option value="2" label="铺货组2" />
                  <el-option value="3" label="铺货组3" />
                </el-select>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t("sale.shop.shopStatus") }}:
              </el-col>
              <el-col :span="16">
                <el-select
                  v-model="searchKey.shopStatus"
                  filterable
                  placeholder="请选择"
                >
                  <el-option value="1" label="正常" />
                  <el-option value="2" label="暂停营业" />
                </el-select>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t("sale.shop.shopLevel") }}:
              </el-col>
              <el-col :span="16">
                <el-select
                  v-model="searchKey.shopLevel"
                  filterable
                  placeholder="请选择"
                >
                  <el-option value="1" label="A" />
                  <el-option value="2" label="B" />
                </el-select>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t("sale.shop.customerNo") }}:
              </el-col>
              <el-col :span="16">
                <el-input clearable />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t("sale.shop.belongCustomer") }}:
              </el-col>
              <el-col :span="16">
                <el-select
                  v-model="searchKey.belongCustomerValue"
                  filterable
                  placeholder="请选择"
                >
                  <el-option value="1" label="沃尔玛" />
                  <el-option value="2" label="家乐福" />
                </el-select>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t("sale.shop.district") }}:
              </el-col>
              <el-col :span="16">
                <el-select
                  v-model="searchKey.district"
                  filterable
                  placeholder="请选择"
                >
                  <el-option value="1" label="华东大区" />
                  <el-option value="2" label="华中大区" />
                </el-select>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t("sale.shop.province") }}:
              </el-col>
              <el-col :span="16">
                <dict-select
                  v-model="searchKey.province"
                  dict-type-id="Province"
                  parent-id="153"
                />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t("sale.shop.city") }}:
              </el-col>
              <el-col :span="16">
                <dict-select
                  v-model="searchKey.city"
                  dict-type-id="City"
                  :parent-id="searchKey.province"
                />
              </el-col>
            </el-row>
          </el-form-item>
        </el-form>
      </el-scrollbar>
      <div class="search-btn-box">
        <div class="reset-box">
          <p>{{ $t("comm.reset") }}</p>
          <span
            class="circle-larger-btn btn-default-color"
          ><i
            class="iconfont iconrefresh"
          /></span>
        </div>
        <div class="search-box">
          <p>{{ $t("comm.query") }}</p>
          <span
            class="circle-larger-btn btn-light-color bluebg"
          ><i
            class="iconfont iconsousuo"
          /></span>
        </div>
      </div>
    </div>
    <div class="content content-light">
      <ul class="operation-box">
        <li class="operation-item" @click="toAdd">
          <span
            class="operation-circle circle-middle-btn btn-light-color bluebg"
          ><i
            class="iconfont iconxinjian"
          /></span>
          <span class="operation-text">{{ $t("comm.newlyBuild") }}</span>
        </li>
        <li class="operation-item" @click="toEdit">
          <span
            class="operation-circle circle-middle-btn btn-light-color bluebg"
          ><i
            class="iconfont iconbianji"
          /></span>
          <span class="operation-text">{{ $t("comm.edit") }}</span>
        </li>
        <li class="operation-item">
          <span
            class="operation-circle circle-middle-btn btn-light-color bluebg"
          ><i
            class="el-icon-upload2"
          /></span>
          <span class="operation-text"> {{ $t("comm.batchImport") }}</span>
        </li>
        <li class="operation-item">
          <span
            class="operation-circle circle-middle-btn btn-light-color bluebg"
          ><i
            class="el-icon-delete"
          /></span>
          <span class="operation-text"> {{ $t("comm.batchDeletion") }}</span>
        </li>
        <li class="operation-item" @click="distribute">
          <span
            class="operation-circle circle-middle-btn btn-light-color bluebg"
          ><i
            class="iconfont iconxinjian"
          /></span>
          <span class="operation-text">{{ $t("comm.distribute") }}</span>
        </li>
        <li class="operation-item" @click="distributeClear">
          <span
            class="operation-circle circle-middle-btn btn-light-color bluebg"
          ><i
            class="el-icon-delete"
          /></span>
          <span class="operation-text"> {{ $t("comm.clearDistribute") }}</span>
        </li>
        <li class="operation-item">
          <span
            class="operation-circle circle-middle-btn btn-light-color bluebg"
          ><i
            class="el-icon-download"
          /></span>
          <span class="operation-text">{{ $t("comm.export") }}</span>
        </li>
      </ul>
      <div class="table-bg-box search-list-table">
        <div ref="tables" style="height: 100%">
          <el-table
            ref="table"
            :data="shopList"
            stripe
            border
            height="100%"
            :header-cell-style="{ 'text-align': 'left' }"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="55" />
            <el-table-column
              prop="shopNo"
              :label="$t('sale.shop.shopNo')"
              width="200"
              show-overflow-tooltip
            />
            <el-table-column
              prop="shopName"
              :label="$t('sale.shop.shopName')"
              min-width="150"
            >
              <template slot-scope="scope">
                <router-link to="/sale/shop/info?id=1">
                  {{ scope.row.shopName }}
                </router-link>
              </template>
            </el-table-column>
            <el-table-column
              prop="businessPre"
              :label="$t('sale.workplan.salesBear')"
            />
            <el-table-column
              prop="goodsGroup"
              :label="$t('sale.salesandshops.goodsGroup')"
            />
            <el-table-column
              prop="shopStatus"
              :label="$t('sale.shop.shopStatus')"
              min-width="80"
            />
            <el-table-column
              prop="shopLevel"
              :label="$t('sale.shop.shopLevel')"
              width="80"
            />
            <el-table-column
              prop="shopAbbr"
              :label="$t('sale.shop.shopAbbr')"
              width="120"
            />
            <el-table-column
              prop="district"
              :label="$t('sale.shop.district')"
              width="80"
            />
            <el-table-column
              prop="province"
              :label="$t('sale.shop.province')"
              show-overflow-tooltip
            />
            <el-table-column
              prop="city"
              :label="$t('sale.shop.city')"
              show-overflow-tooltip
            />
            <el-table-column
              prop="customerNo"
              :label="$t('sale.shop.customerNo')"
              show-overflow-tooltip
            />
            <el-table-column
              prop="belongCustomer"
              :label="$t('sale.shop.belongCustomer')"
              show-overflow-tooltip
            />
            <el-table-column
              prop="address"
              :label="$t('sale.shop.address')"
              width="200"
              show-overflow-tooltip
            />
          </el-table>
        </div>
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
          class="page-right blueDR"
          :current-page.sync="searchParam.pageNo"
          :page-size="searchParam.pageSize"
          layout="prev,pager,next,slot,jumper"
          :total="searchParam.totalRecord"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        >
          <span
            class="iconfont iconjiantou-youzhi page-last-page"
            @click="toLastPage"
          />
        </el-pagination>
        <el-pagination class="page-right page-first" layout="slot">
          <span
            class="iconfont iconjiantou-zuozhi page-first-page"
            @click="toFirstPage"
          />
        </el-pagination>
      </div>
    </div>
    <!-- 人员分配 -->
    <el-dialog
      title="人员分配"
      custom-class="content-dialog-userSelect"
      width="33%"
      height="150px"
      :close-on-click-modal="false"
      :visible.sync="userDistributionDialogVisible"
    >
      <user-distribution />
    </el-dialog>
  </div>
</template>
<script>
import { search } from '@/mixins/search-params'
import { names } from '@/mixins/names.js'
import UserSelect from '@/components/UserSelect.vue'
import UserDistribution from './components/UserDistribution.vue'
import { permission } from '@/mixins/permission-mixin.js'
export default {
  name: 'ShopList',
  components: { UserSelect, UserDistribution },
  mixins: [search, UserSelect, names, permission],
  data() {
    return {
      multipleSelection: [],
      searchKey: {
        shopStatus: '',
        shopLevel: '',
        goodsGroup: '',
        province: '',
        city: '',
        district: ''
      },
      userDistributionDialogVisible: false,
      shopList: [
        {
          id: 1,
          shopNo: 'ZB-R63-021-010',
          shopName: '7-11上海总部店',
          shopStatus: '正常',
          shopLevel: 'A',
          shopAbbr: '—',
          district: '华东地区',
          province: '上海市',
          city: '上海市',
          customerNo: 'AV01R63',
          belongCustomer: '百望达',
          businessPre: '',
          goodsGroup: '铺货组1',
          address: '上海市天山西路568号'
        },
        {
          id: 2,
          shopNo: 'ZB-R63-021-025',
          shopName: 'OLE华东总部',
          shopStatus: '正常',
          shopLevel: '—',
          shopAbbr: '—',
          district: '华东地区',
          province: '上海市',
          city: '上海市',
          customerNo: 'AV01R59',
          belongCustomer: 'OLE(华东)',
          businessPre: '叶敏华',
          goodsGroup: '铺货组1',
          address: '上海市花木路1378'
        },
        {
          id: 1,
          shopNo: 'ZB-R63-021-010',
          shopName: '7-11上海总部店',
          shopStatus: '正常',
          shopLevel: 'A',
          shopAbbr: '—',
          district: '华东地区',
          province: '上海市',
          city: '上海市',
          customerNo: 'AV01R63',
          belongCustomer: '百望达',
          businessPre: '张强',
          goodsGroup: '铺货组1',
          address: '上海市天山西路568号'
        },
        {
          id: 2,
          shopNo: 'ZB-R63-021-025',
          shopName: 'OLE华东总部',
          shopStatus: '正常',
          shopLevel: '—',
          shopAbbr: '—',
          district: '华东地区',
          province: '上海市',
          city: '上海市',
          customerNo: 'AV01R59',
          belongCustomer: 'OLE(华东)',
          businessPre: '叶敏华',
          goodsGroup: '铺货组2',
          address: '上海市花木路1378'
        },
        {
          id: 3,
          shopNo: 'ZB-R63-021-010',
          shopName: '7-11上海总部店',
          shopStatus: '正常',
          shopLevel: 'A',
          shopAbbr: '—',
          district: '华东地区',
          province: '上海市',
          city: '上海市',
          customerNo: 'AV01R63',
          belongCustomer: '百望达',
          businessPre: '张强',
          goodsGroup: '铺货组2',
          address: '上海市天山西路568号'
        },
        {
          id: 4,
          shopNo: 'ZB-R63-021-025',
          shopName: 'OLE华东总部',
          shopStatus: '正常',
          shopLevel: '—',
          shopAbbr: '—',
          district: '华东地区',
          province: '上海市',
          city: '上海市',
          customerNo: 'AV01R59',
          belongCustomer: 'OLE(华东)',
          businessPre: '叶敏华',
          goodsGroup: '铺货组2',
          address: '上海市花木路1378'
        },
        {
          id: 6,
          shopNo: 'ZB-R63-021-010',
          shopName: '7-11上海总部店',
          shopStatus: '正常',
          shopLevel: 'A',
          shopAbbr: '—',
          district: '华东地区',
          province: '上海市',
          city: '上海市',
          customerNo: 'AV01R63',
          belongCustomer: '百望达',
          businessPre: '张强',
          goodsGroup: '铺货组2',
          address: '上海市天山西路568号'
        },
        {
          id: 6,
          shopNo: 'ZB-R63-021-025',
          shopName: 'OLE华东总部',
          shopStatus: '正常',
          shopLevel: '—',
          shopAbbr: '—',
          district: '华东地区',
          province: '上海市',
          city: '上海市',
          customerNo: 'AV01R59',
          belongCustomer: 'OLE(华东)',
          businessPre: '叶敏华',
          goodsGroup: '铺货组2',
          address: '上海市花木路1378'
        },
        {
          id: 7,
          shopNo: 'ZB-R63-021-010',
          shopName: '7-11上海总部店',
          shopStatus: '正常',
          shopLevel: 'A',
          shopAbbr: '—',
          district: '华东地区',
          province: '上海市',
          city: '上海市',
          customerNo: 'AV01R63',
          belongCustomer: '百望达',
          businessPre: '张强',
          goodsGroup: '铺货组2',
          address: '上海市天山西路568号'
        },
        {
          id: 8,
          shopNo: 'ZB-R63-021-025',
          shopName: 'OLE华东总部',
          shopStatus: '正常',
          shopLevel: '—',
          shopAbbr: '—',
          district: '华东地区',
          province: '上海市',
          city: '上海市',
          customerNo: 'AV01R59',
          belongCustomer: 'OLE(华东)',
          businessPre: '叶敏华',
          goodsGroup: '铺货组2',
          address: '上海市花木路1378'
        }
      ],
      // 分页插件数据
      searchParam: {
        paging: true,
        pageNo: 1, // 当前页码
        pageSize: 10, // 每页条数
        totalRecord: 98, // 总条数
        params: {}
      }
    }
  },
  methods: {
    toAdd() {
      this.$router.push({ path: '/sale/shop/edit' })
    },
    toEdit() {
      if (this.multipleSelection.length <= 0) {
        this.$message({
          type: 'info',
          message: this.$t('comm.msg3')
        })
      } else if (this.multipleSelection.length > 1) {
        this.$message({
          type: 'info',
          message: this.$t('comm.msg40')
        })
      } else {
        this.$router.push({ path: '/sale/shop/edit?id=1' })
      }
    },
    distribute() {
      if (this.multipleSelection.length <= 0) {
        this.$message({
          type: 'info',
          message: this.$t('comm.msg3')
        })
      } else {
        this.userDistributionDialogVisible = true
      }
    },
    distributeClear() {
      if (this.multipleSelection.length > 0) {
        this.$confirm('确定解除分配么？', this.$t('comm.tips'), {
          confirmButtonText: this.$t('comm.certain'),
          cancelButtonText: this.$t('comm.cancel'),
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '操作成功!'
          })
        })
      } else {
        this.$message({
          type: 'info',
          message: this.$t('comm.msg3')
        })
      }
    },
    handleSaveUser() {
      this.$message({
        type: 'success',
        message: '人员分配成功'
      })
      this.userDistributionDialogVisible = false
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    }
  }
}
</script>
<style lang="scss">
.user-distribution .el-dialog__body .tree_box {
  background-color: #fff;
}
</style>
