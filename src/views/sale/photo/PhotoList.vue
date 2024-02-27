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
                {{ $t("calendar.startTime") }}:
              </el-col>
              <el-col :span="16">
                <el-input clearable />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t("calendar.endTime") }}:
              </el-col>
              <el-col :span="16">
                <el-input clearable />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t("sale.photo.reportType") }}:
              </el-col>
              <el-col :span="16">
                <el-select v-model="searchParam.params.goodsGroup" filterable>
                  <el-option value="0" label="全部" />
                  <el-option value="1" label="进店拍照" />
                  <el-option value="2" label="出店拍照" />
                  <el-option value="3" label="陈列拍照" />
                  <el-option value="4" label="铺货拍照" />
                  <el-option value="5" label="促销牌照" />
                  <el-option value="6" label="价格拍照" />
                  <el-option value="7" label="竞品拍照" />
                </el-select>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t("sale.photo.reportType") }}:
              </el-col>
              <el-col :span="16">
                <el-select v-model="searchParam.params.goodsGroup" filterable>
                  <el-option value="0" label="全部" />
                  <el-option value="1" label="固定架" />
                  <el-option value="2" label="端架" />
                  <el-option value="3" label="TG" />
                </el-select>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t("sale.workreport.brand") }}:
              </el-col>
              <el-col :span="16">
                <el-select
                  v-model="searchParam.params.goodsGroup"
                  filterable
                  placeholder="请选择"
                >
                  <el-option value="1" label="品牌1" />
                  <el-option value="2" label="品牌2" />
                  <el-option value="3" label="品牌3" />
                </el-select>
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
                {{ $t("sale.shop.district") }}:
              </el-col>
              <el-col :span="16">
                <el-select
                  v-model="searchParam.params.district"
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
                  v-model="searchParam.params.province"
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
                  v-model="searchParam.params.city"
                  dict-type-id="City"
                  :parent-id="searchParam.params.province"
                />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                客户(快速搜索):
              </el-col>
              <el-col :span="16">
                <el-input clearable />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                人员(快速搜索):
              </el-col>
              <el-col :span="16">
                <el-input clearable />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                门店(快速搜索):
              </el-col>
              <el-col :span="16">
                <el-input clearable />
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
        <li class="operation-item">
          <span
            class="operation-circle circle-middle-btn btn-light-color bluebg"
          ><i
            class="el-icon-download"
          /></span>
          <span class="operation-text">{{ $t("comm.export") }}</span>
        </li>
        <li class="operation-item">
          <span
            class="operation-circle circle-middle-btn btn-light-color bluebg"
          ><i
            class="el-icon-download"
          /></span>
          <span class="operation-text">{{ $t("comm.print") }}</span>
        </li>
      </ul>
      <div class="table-bg-box search-list-table">
        <div class="photo-viewer">
          <viewer
            ref="viewer"
            class="photo-viewer-list"
            :images="photo"
            @inited="inited"
          >
            <div
              v-for="(item, index) in dataList"
              :key="index"
              class="photo-viewer-item"
            >
              <div class="photo-viewer-cons">
                <div class="photo-viewer-pic">
                  <img :src="require('@/assets/testimgs/' + item.photo)">
                  <p v-if="item.type === '1'" class="photo-viewer-tag">
                    进店
                  </p>
                  <p v-if="item.type === '2'" class="photo-viewer-tag green">
                    出店
                  </p>
                  <p v-if="item.type === '3'" class="photo-viewer-tag yellow">
                    陈列
                  </p>
                </div>
                <p class="photo-viewer-info photo-viewer-name">
                  {{ item.salesBear }}
                </p>
                <p class="photo-viewer-info photo-viewer-shop">
                  {{ item.shop }}
                </p>
                <p class="photo-viewer-info photo-viewer-time">
                  2021-02-25 08:05:57
                </p>
              </div>
            </div>
          </viewer>
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
import 'viewerjs/dist/viewer.css'
import Viewer from 'v-viewer/src/component.vue'
import { search } from '@/mixins/search-params'
import { names } from '@/mixins/names.js'
import UserSelect from '@/components/UserSelect.vue'
import { permission } from '@/mixins/permission-mixin.js'
export default {
  name: 'PhotoList',
  components: { UserSelect, Viewer },
  mixins: [search, names, permission],
  data() {
    return {
      dataList: [
        {
          photo: '1.png',
          type: '3',
          shop: '沃尔玛南京虹悦城店',
          salesBear: '王斌'
        },
        {
          photo: '2.png',
          type: '2',
          shop: '沃尔玛南京虹悦城店',
          salesBear: '王斌'
        },
        {
          photo: '2.png',
          type: '1',
          shop: '大润发连云港店',
          salesBear: '张三'
        },
        {
          photo: '1.png',
          type: '3',
          shop: '大润发连云港店',

          salesBear: '张三'
        },
        {
          photo: '2.png',
          type: '2',
          shop: '沃尔玛南京虹悦城店'
        },
        {
          photo: '2.png',
          type: '1',
          shop: '农工商上海38龙华店',
          salesBear: '王斌'
        },
        {
          photo: '1.png',
          type: '3',
          shop: '沃尔玛南京虹悦城店',
          salesBear: '李四'
        },
        {
          photo: '2.png',
          type: '2',
          shop: '大润发连云港店',
          salesBear: '王斌'
        },
        {
          photo: '2.png',
          type: '1',
          shop: '沃尔玛南京虹悦城店',
          salesBear: '李四'
        },
        {
          photo: '1.png',
          type: '3',
          shop: '大润发连云港店',
          salesBear: '王斌'
        },
        {
          photo: '2.png',
          type: '2',
          shop: '农工商上海38龙华店',
          salesBear: '王五'
        },
        {
          photo: '2.png',
          type: '1',
          shop: '沃尔玛南京虹悦城店',
          salesBear: '王斌'
        },
        {
          photo: '1.png',
          type: '3',
          shop: '沃尔玛南京虹悦城店',
          salesBear: '王斌'
        },
        {
          photo: '2.png',
          type: '2',
          shop: '农工商上海38龙华店',
          salesBear: '李二'
        },
        {
          photo: '2.png',
          type: '1',
          shop: '沃尔玛南京虹悦城店',
          salesBear: '王斌'
        },
        {
          photo: '1.png',
          type: '3',
          shop: '大润发连云港店',
          salesBear: '王斌'
        },
        {
          photo: '2.png',
          type: '2',
          shop: '农工商上海38龙华店',
          salesBear: '王斌'
        },
        {
          photo: '2.png',
          type: '1',
          shop: '沃尔玛南京虹悦城店',
          salesBear: '王斌'
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
    inited(viewer) {
      this.$viewer = viewer
    }
  }
}
</script>
<style scoped>
.apply .content-light .table-bg-box {
  background-color: #f6f6f6;
  overflow-y: auto;
}
</style>
