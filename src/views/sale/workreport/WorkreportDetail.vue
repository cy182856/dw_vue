<template>
  <!-- 编辑画面 -->
  <div class="summary">
    <div style="display: none">
      <viewer ref="viewer" :images="photo" @inited="inited">
        <img
          v-for="(src, index) in photo"
          :key="index"
          :src="require('@/assets/testimgs/' + src)"
          width="40"
        >
      </viewer>
    </div>
    <div class="detail">
      <el-collapse v-model="activeNames">
        <el-collapse-item name="1">
          <span slot="title" class="collapse-title">{{
            $t("sale.workreport.displayReport")
          }}</span>
          <el-table ref="table" :data="display.list" border stripe>
            <el-table-column
              prop="brand"
              :label="$t('sale.workreport.brand')"
              min-width="100"
            />
            <el-table-column
              prop="position"
              :label="$t('sale.workreport.position')"
              min-width="100"
            />
            <el-table-column
              prop="shelvesNo"
              :label="$t('sale.workreport.shelvesNo')"
              min-width="100"
            />
            <el-table-column
              prop="shelvesNoMy"
              :label="$t('sale.workreport.shelvesNoMy')"
              min-width="100"
            />
            <el-table-column
              prop="ratio"
              :label="$t('sale.workreport.ratio')"
              min-width="100"
            />
            <el-table-column
              prop="competitorLeft"
              :label="$t('sale.workreport.competitorLeft')"
              min-width="80"
            />
            <el-table-column
              prop="competitorRight"
              :label="$t('sale.workreport.competitorRight')"
              min-width="80"
            />
            <el-table-column
              prop="photoBefor"
              :label="$t('sale.workreport.photoBefor')"
              min-width="100"
            >
              <p class="photo-viewer">
                <i class="el-icon-view" @click="showViewerPhoto" />
              </p>
            </el-table-column>
            <el-table-column
              prop="photoAfter"
              :label="$t('sale.workreport.photoAfter')"
              min-width="100"
            >
              <p class="photo-viewer">
                <i class="el-icon-view" @click="showViewerPhoto" />
              </p>
            </el-table-column>
            <el-table-column
              prop="photoDisplay"
              :label="$t('sale.workreport.photoDisplay')"
              min-width="110"
            >
              <p class="photo-viewer">
                <i class="el-icon-view grey" />
              </p>
            </el-table-column>
          </el-table>
        </el-collapse-item>
        <el-collapse-item name="2">
          <span slot="title" class="collapse-title">{{
            $t("sale.workreport.distribution")
          }}</span>
          <div class="input_box">
            <div class="flex1">
              <div class="title">
                {{ $t("sale.workreport.distributionRate") }}：
              </div>
              <div class="input">
                1/2
              </div>
            </div>
          </div>

          <el-table
            ref="table"
            style="margin-bottom: 20px"
            :data="price.list"
            border
            stripe
          >
            <el-table-column
              prop="productName"
              :label="$t('mdm.product.productName')"
              min-width="100"
            />
            <el-table-column
              :label="$t('sale.workreport.display')"
              min-width="100"
            >
              <template slot-scope="scope">
                <span
                  v-if="scope.row.display === '是'"
                  style="color: green"
                >是</span>
                <span v-else style="color: red">否</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="wholesalePrice"
              :label="$t('sale.workreport.executionPrice')"
              min-width="100"
            />
            <el-table-column
              prop="floorPrice"
              :label="$t('sale.workreport.floorPrice')"
              min-width="100"
            />
            <el-table-column
              prop="ceilingPrice"
              :label="$t('sale.workreport.ceilingPrice')"
              min-width="100"
            />
          </el-table>
          <div class="input_box">
            <div class="flex1">
              <div class="title">
                {{ $t("sale.workreport.photo") }}：
              </div>
              <div class="input">
                <p class="photo-viewer photo-viewer-left">
                  <i class="el-icon-view" @click="showViewerPhoto" />
                </p>
              </div>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item name="4">
          <span slot="title" class="collapse-title">{{
            $t("sale.workreport.promotionReport")
          }}</span>
          <el-table
            ref="table"
            :data="promotion.list"
            style="margin-bottom: 20px"
            border
            stripe
          >
            <el-table-column
              prop="project"
              :label="$t('sale.workreport.project')"
              min-width="100"
            />
            <el-table-column
              prop="cons"
              :label="$t('sale.workreport.cons')"
              min-width="100"
            />
            <el-table-column
              :label="$t('sale.workreport.finishCons')"
              min-width="100"
            >
              <template slot-scope="scope">
                <span
                  v-if="scope.row.finishCons === '是'"
                  style="color: green"
                >是</span>
                <span v-else style="color: red">否</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="supplement"
              :label="$t('sale.workreport.supplement')"
              min-width="100"
            />
          </el-table>
          <el-table
            ref="table"
            :data="promotion.list2"
            style="margin-bottom: 20px"
            border
            stripe
          >
            <el-table-column
              prop="promotionName"
              :label="$t('sale.workreport.promotionName')"
              min-width="100"
            />
            <el-table-column
              :label="$t('sale.workreport.finishCons')"
              min-width="100"
            >
              <template slot-scope="scope">
                <span
                  v-if="scope.row.nameStatus === '是'"
                  style="color: green"
                >是</span>
                <span v-else style="color: red">否</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="supplement"
              :label="$t('sale.workreport.supplement')"
              min-width="100"
            />
            <el-table-column
              prop="executionPrice"
              :label="$t('sale.workreport.executionPrice')"
              min-width="100"
            />
            <el-table-column
              :label="$t('sale.workreport.finishCons')"
              min-width="100"
            >
              <template slot-scope="scope">
                <span
                  v-if="scope.row.finishCons === '是'"
                  style="color: green"
                >是</span>
                <span v-else style="color: red">否</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="supplement"
              :label="$t('sale.workreport.supplement')"
              min-width="100"
            />
          </el-table>
          <div class="input_box">
            <div class="flex1">
              <div class="title">
                {{ $t("sale.workreport.photo") }}：
              </div>
              <div class="input">
                <p class="photo-viewer photo-viewer-left">
                  <i class="el-icon-view" @click="showViewerPhoto" />
                </p>
              </div>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item name="5">
          <span slot="title" class="collapse-title">{{
            $t("sale.workreport.competitorReport")
          }}</span>
          <div class="input_box">
            <div class="flex1">
              <div class="title">
                {{ $t("sale.workreport.promotionTitle") }}：
              </div>
              <div class="input">
                {{ competitor.promotionTitle }}
              </div>
            </div>
            <div class="flex1">
              <div class="title">
                {{ $t("sale.workreport.displayForm") }}：
              </div>
              <div class="input">
                {{ competitor.displayForm }}
              </div>
            </div>
            <div class="flex1">
              <div class="title">
                {{ $t("sale.workreport.photo") }}：
              </div>
              <div class="input">
                <p class="photo-viewer photo-viewer-left">
                  <i class="el-icon-view" @click="showViewerPhoto" />
                </p>
              </div>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item name="6">
          <span slot="title" class="collapse-title">{{
            $t("sale.workreport.rectReport")
          }}</span>

          <div
            v-for="(item, index) in rect.list"
            :key="index"
            class="input_box"
          >
            <div class="flex2">
              <div class="title">
                {{ $t("sale.rect.requirement") + (index + 1) }}：
              </div>
              <div class="input">
                {{ item.cons }}
              </div>
            </div>
            <div class="flex4">
              <div class="title">
                {{ $t("sale.workreport.finishCons") }}：
              </div>
              <div class="input">
                <span v-if="item.status == '是'" style="color: green">是</span>
                <span
                  v-if="item.status == '保留'"
                  style="color: orange"
                >保留</span>
                <span v-if="item.status == '否'" style="color: red">否</span>
              </div>
            </div>
            <div class="flex4">
              <div class="title">
                {{ $t("sale.workreport.photo") }}：
              </div>
              <div class="input">
                <p class="photo-viewer photo-viewer-left">
                  <i class="el-icon-view" @click="showViewerPhoto" />
                </p>
              </div>
            </div>
            <div v-if="item.status !== '是'" class="flex1">
              <div class="title">
                补充说明{{ index + 1 }}：
              </div>
              <div class="input">
                未完成整改要求的补充说明
              </div>
            </div>
            <el-divider v-if="index != rect.list.length - 1" />
          </div>
        </el-collapse-item>
        <el-collapse-item name="7">
          <span slot="title" class="collapse-title">{{
            $t("sale.workreport.visitReport")
          }}</span>
          <div class="input_box">
            <div class="flex1">
              <div class="title">
                {{ $t("sale.workreport.visitSummary") }}：
              </div>
              <div class="input">
                {{ visit.summary }}
              </div>
            </div>
            <div class="flex1">
              <div class="title">
                {{ $t("sale.workreport.photo") }}：
              </div>
              <div class="input">
                <p class="photo-viewer photo-viewer-left">
                  <i class="el-icon-view" @click="showViewerPhoto" />
                </p>
              </div>
            </div>
            <div class="flex1">
              <div class="title">
                {{ $t("sale.workreport.adviceLeader") }}：
              </div>
              <div class="input">
                <el-input type="textarea" maxlength="256" autocomplete="off" />
              </div>
            </div>
            <div class="flex1">
              <div class="title">
                {{ $t("sale.workreport.adviceHeadOffice") }}：
              </div>
              <div class="input">
                <el-input type="textarea" maxlength="256" autocomplete="off" />
              </div>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
      <ul class="operation-box dialog-btn-box dialog-btn-box-detail">
        <!-- 添加整改要求 -->
        <li class="operation-item" @click="handleAddRect">
          <span
            class="operation-circle circle-middle-btn btn-light-color bluebg"
          ><i
            class="el-icon-notebook-2"
          /></span>
          <span class="operation-text">{{
            $t("sale.workreport.addRect")
          }}</span>
        </li>
        <!-- 保存 -->
        <li class="operation-item">
          <span
            class="operation-circle circle-middle-btn btn-light-color bluebg"
          ><i
            class="iconfont iconbaocun"
          /></span>
          <span class="operation-text">{{ $t("comm.save") }}</span>
        </li>
        <!-- 返回 -->
        <li class="operation-item" @click="handleBack">
          <span
            class="operation-circle circle-middle-btn btn-light-color bluebg"
          ><i
            class="iconfont iconquxiao"
          /></span>
          <span class="operation-text">{{ $t("comm.return") }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import 'viewerjs/dist/viewer.css'
import Viewer from 'v-viewer/src/component.vue'
import { formValidator } from '@/mixins/form-validator.js'
import { names } from '@/mixins/names.js'
import { permission } from '@/mixins/permission-mixin.js'
export default {
  components: {
    Viewer
  },
  mixins: [names, formValidator, permission],
  data() {
    return {
      shopDialogShow: false,
      activeNames: ['1', '2', '3', '4', '5', '6', '7'],
      photo: ['image-01.png', 'image-02.png', 'image-03.png'],
      display: {
        list: [
          {
            brand: '洁霸',
            position: '中层',
            shelvesNo: 20,
            shelvesNoMy: 2,
            ratio: '10%',
            competitorLeft: '洁净',
            competitorRight: '霸王',
            photoBefor: [],
            photoAfter: [],
            photoDisplay: []
          }
        ]
      },
      price: {
        list: [
          {
            productName: '洁霸',
            floorPrice: '12',
            ceilingPrice: '13.45',
            wholesalePrice: '12.34',
            display: '是'
          },
          {
            productName: '碧柔',
            floorPrice: '12',
            ceilingPrice: '13.45',
            wholesalePrice: '12.34',
            display: '否'
          }
        ]
      },
      promotion: {
        list: [
          {
            project: '促销主题',
            cons: '满两件七折',
            finishCons: '是',
            supplement: ''
          },
          {
            project: '陈列位置',
            cons: '中层',
            finishCons: '否',
            supplement: '放在了最高层'
          },
          {
            project: '陈列形式',
            cons: '货架',
            finishCons: '是',
            supplement: ''
          },
          {
            project: '促销员是否在岗',
            cons: '是',
            finishCons: '是',
            supplement: ''
          },
          {
            project: 'POSM选择',
            cons: '',
            finishCons: '是',
            supplement: ''
          }
        ],
        list2: [
          {
            promotionName: '单品1',
            nameStatus: '是',
            executionPrice: '12.34',
            finishCons: '是',
            supplement: ''
          },
          {
            promotionName: '单品2',
            nameStatus: '是',
            executionPrice: '12.34',
            finishCons: '是',
            supplement: ''
          }
        ],
        photo: []
      },
      competitor: {
        promotionTitle: '竞品促销活动',
        displayForm: '竞品陈列形式',
        photo: []
      },
      rect: {
        list: [
          {
            cons:
              '整改要求整改要求整改要求整改要求整改要求整改要求整改要求整改要求',
            status: '是',
            photo: []
          },
          {
            cons:
              '整改要求整改要求整改要求整改要求整改要求整改要求整改要求整改要求整改要求整改要求整改要求整改要求',
            status: '否',
            photo: []
          },
          {
            cons:
              '整改要求整改要求整改要求整改要求整改要求整改要求整改要求整改要求整改要求整改要求整改要求整改要求',
            status: '保留',
            photo: []
          }
        ]
      },
      visit: {
        summary: '拜访总结',
        photo: []
      }
    }
  },
  methods: {
    handleBack() {
      this.$router.go(-1)
    },
    handleAddRect() {
      this.$router.push({ path: '/sale/rectification/edit' })
    },
    showViewerPhoto() {
      this.$viewer.show()
    },
    inited(viewer) {
      this.$viewer = viewer
    }
  }
}
</script>
