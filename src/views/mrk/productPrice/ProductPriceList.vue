<template>
  <div class="apply">
    <div class="search-left-box search-left-box-light">
      <div class="search-title">
        {{ $t("comm.queryCriteria") }}
      </div>
      <el-scrollbar>
        <el-form
          ref="form"
          class="search-form default-input"
          label-position="left"
          :model="searchParam.params"
        >
          <el-form-item>
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                价格体系:
              </el-col>
              <el-col :span="16">
                <el-select v-model="searchParam.params.seriesNo" placeholder="请选择" clearable>
                  <!-- <el-option label="经销商" value="0" />
                  <el-option label="孩子王" value="1" /> -->
                  <el-option
                    v-for="item in seriesNoList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                品类:
              </el-col>
              <el-col :span="16">
                <el-input v-model="searchParam.params.category" clearable />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                类目:
              </el-col>
              <el-col :span="16">
                <el-input v-model="searchParam.params.category1" clearable />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                系列:
              </el-col>
              <el-col :span="16">
                <el-input v-model="searchParam.params.category2" clearable />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                类型:
              </el-col>
              <el-col :span="16">
                <el-input v-model="searchParam.params.category3" clearable />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                规格:
              </el-col>
              <el-col :span="16">
                <el-input v-model="searchParam.params.category4" clearable />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                渠道:
              </el-col>
              <el-col :span="16">
                <el-input v-model="searchParam.params.category5" clearable />
              </el-col>
            </el-row>
          </el-form-item>
        </el-form>
      </el-scrollbar>
      <div class="search-btn-box">
        <div class="reset-box" @click="reset">
          <p>{{ $t("comm.reset") }}</p>
          <span
            class="circle-larger-btn btn-default-color"
          ><i
            class="iconfont iconrefresh"
          /></span>
        </div>
        <div class="search-box" @click="search">
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
      <ul class="operation-box" />
      <div class="table-bg-box search-list-table borderTable">
        <div ref="tables" style="height: 100%">
          <el-table
            ref="table"
            v-loading="isLoading"
            class="bi-table"
            :data="WriteoffList"
            stripe
            border
            height="100%"
            :header-cell-style="{ 'text-align': 'center' }"
          >
            <el-table-column
              label="提示警告"
              min-width="70"
              align="center"
            >
              <template slot-scope="scope">
                <el-popover
                  v-if="scope.row.priceChangeDesc"
                  placement="top-start"
                  trigger="hover"
                  :content="scope.row.priceChangeDesc"
                >
                  <div slot="reference">
                    <span class="el-icon-warning" style="font-size:20px;color:orange;" />
                  </div>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column :prop="'janCode'" :label="'JAN编码'" width="130" align="center" show-overflow-tooltip />
            <el-table-column :prop="'seriesName'" :label="'价格体系'" min-width="120" align="center" />
            <el-table-column :prop="'productName'" :label="'产品名称'" min-width="320" align="left" />
            <el-table-column :prop="'category'" :label="'品类'" min-width="120" align="left" />
            <el-table-column :prop="'category1'" :label="'类目'" min-width="120" align="left" />
            <el-table-column :prop="'category2'" :label="'系列'" min-width="120" align="left" />
            <el-table-column :prop="'category3'" :label="'类型'" min-width="120" align="left" />
            <el-table-column :prop="'category4'" :label="'规格'" min-width="120" align="center" />
            <el-table-column :prop="'category5'" :label="'渠道'" min-width="120" align="center" />
            <el-table-column :prop="'price'" :label="'价格'" min-width="120" align="right">
              <template slot-scope="scope">
                {{ scope.row.price |numFormat(2) }}
              </template>
            </el-table-column>
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
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { search } from '@/mixins/search-params'
import { names } from '@/mixins/names.js'
import { permission } from '@/mixins/permission-mixin.js'
import { numFormat } from '@/mixins/num-format.js'
import { getProductPriceList } from '@/api/mrk/productprice.js'
export default {
  name: 'ProductPriceList',
  mixins: [search, names, permission, numFormat],
  data() {
    return {
      isLoading: false,
      multipleSelection: [],
      WriteoffList: [],
      deparsDialogShow: false,
      // 分页插件数据
      searchParam: {
        paging: true,
        pageNo: 1, // 当前页码
        pageSize: 10, // 每页条数
        totalRecord: null, // 总条数
        params: {
          seriesNo: '',
          category: '',
          category1: '',
          category2: '',
          category3: '',
          category4: '',
          category5: ''
        }

      },
      seriesNoList: [{
        value: '0',
        label: '经销商'
      }, {
        value: '1',
        label: '孩子王'
      }]
    }
  },
  computed: {
    ...mapGetters(['userInfo']),
    orgRootId: function() {
      return this.userInfo.orgSeqNo.split('.')[1]
    }
  },
  created() {
    this.fetchData()
    console.log(this.WriteoffList)
  },
  methods: {
    async fetchData() {
      this.isLoading = true
      // 查询产品价格一览信息
      const res = await getProductPriceList(this.searchParam)
      if (res && res.success) {
        const { totalRecord, results } = res.datas.searchResult
        this.searchParam.totalRecord = totalRecord
        this.WriteoffList = results
      }
      this.isLoading = false
    }
  }
}
</script>
<style >
.bi-table .el-table__body{
      border-bottom: 1px solid #ddd;
}
.bi-table tbody tr:last-child td{
  border-bottom: 0 !important;
}
</style>
