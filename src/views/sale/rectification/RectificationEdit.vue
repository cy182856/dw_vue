<template>
  <!-- 编辑画面 -->
  <div class="summary">
    <div class="detail">
      <el-collapse v-model="activeNames">
        <el-collapse-item name="1">
          <span slot="title" class="collapse-title">详细信息</span>
          <div class="input_box">
            <div class="flex2">
              <div class="title">
                整改主题
              </div>
              <div class="input">
                <el-input v-model="form.name" />
              </div>
            </div>
            <div class="flex2" />
            <div class="flex2">
              <div class="title">
                开始日期
              </div>
              <div class="input">
                <el-date-picker
                  v-model="form.startDate"
                  size="small"
                  value-format="yyyy-MM-dd"
                  format="yyyy-M-d"
                />
              </div>
            </div>
            <div class="flex2">
              <div class="title">
                截止日期
              </div>
              <div class="input">
                <el-date-picker
                  v-model="form.endDate"
                  size="small"
                  value-format="yyyy-MM-dd"
                  format="yyyy-M-d"
                />
              </div>
            </div>
          </div>
          <div class="add_table_row" style="padding-right: 35px">
            <el-button
              class="editbtn"
              size="mini"
              @click.stop="handleAddRequire()"
            >
              新增一行
            </el-button>
          </div>
          <div class="input_box">
            <div v-for="(item, index) in form.rect" :key="index" class="flex1">
              <div class="title">
                {{ item.title + (index + 1) }} &nbsp;&nbsp;<i
                  class="el-icon-remove"
                  style="color: red; cursor: pointer; font-size: 13px"
                  @click="handleDelRequire(index)"
                />
              </div>
              <div class="input">
                <el-input
                  :value="item.cons"
                  type="textarea"
                  placeholder="请输入整改要求"
                />
              </div>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item name="2">
          <span slot="title" class="collapse-title">门店选择</span>
          <div class="input_box">
            <div class="flex1">
              <div class="title">
                门店
                <span>
                  <a
                    class="el-icon-circle-plus-outline"
                    @click="shopDialogShow = true"
                  />
                </span>
              </div>
              <div class="input">
                <el-input
                  v-model="form.shopName"
                  readonly
                  type="textarea"
                  maxlength="256"
                  autocomplete="off"
                />
              </div>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
      <ul class="operation-box dialog-btn-box dialog-btn-box-detail">
        <!-- 保存 -->
        <li class="operation-item" @click="handleSubmit('save')">
          <span
            class="operation-circle circle-middle-btn btn-light-color bluebg"
          ><i
            class="iconfont iconbaocun"
          /></span>
          <span class="operation-text">{{ $t("comm.save") }}</span>
        </li>
        <!-- 提交 -->
        <li class="operation-item" @click="handleSubmit('submit')">
          <span
            class="operation-circle circle-middle-btn btn-light-color bluebg"
          ><i
            class="iconfont icontijiao"
          /></span>
          <span class="operation-text">{{ $t("comm.submit") }}</span>
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

    <!-- 门店选择弹窗 -->
    <el-dialog
      title="门店选择"
      :visible.sync="shopDialogShow"
      custom-class="content-dialog-userSelect"
      append-to-body
      :close-on-click-modal="false"
      width="25%"
    >
      <div style="height: 450px">
        <el-tree
          default-expand-all
          :data="dataShop"
          show-checkbox
          node-key="id"
        />
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { formValidator } from '@/mixins/form-validator.js'
import { names } from '@/mixins/names.js'
import { permission } from '@/mixins/permission-mixin.js'
export default {
  name: 'RectificationEdit',
  mixins: [names, formValidator, permission],
  data() {
    return {
      shopDialogShow: false,
      activeNames: ['1', '2'],
      form: {
        name: '',
        startDate: '',
        endDate: '',
        shop: [],
        shopName: '',
        rect: [
          {
            title: '整改要求',
            cons: ''
          },
          {
            title: '整改要求',
            cons: ''
          }
        ]
      },
      dataShop: [
        {
          id: 1,
          label: '家乐福',
          children: [
            {
              id: 3,
              label: '浦东路店'
            },
            {
              id: 2,
              label: '黄浦路店'
            }
          ]
        },
        {
          id: 4,
          label: 'CBD',
          children: [
            {
              id: 5,
              label: '离店家嘉兴DC仓-华润物流配送中心'
            },
            {
              id: 6,
              label: '静安区店'
            }
          ]
        },
        {
          id: 7,
          label: '乐购',
          children: [
            {
              id: 8,
              label: '闸北路店'
            },
            {
              id: 9,
              label: '高新区店'
            },
            {
              id: 8,
              label: '闸北路店'
            },
            {
              id: 9,
              label: '高新区店2'
            },
            {
              id: 8,
              label: '离店家嘉兴DC仓-华润物流配送中心'
            },
            {
              id: 9,
              label: '高新区店3'
            }
          ]
        }
      ]
    }
  },
  mounted() {
    if (this.$route.query.id) {
      this.form.name = '整改主题1'
      this.form.rect = [
        {
          title: '整改要求',
          cons: '清整货架'
        },
        {
          title: '整改要求',
          cons: '价格标签过小'
        }
      ]
      this.shopName = '门店1，门店2'
    }
  },
  methods: {
    handleAddRequire() {
      this.form.rect.push({
        title: '整改要求',
        cons: ''
      })
    },
    handleDelRequire(index) {
      this.form.rect.splice(index, 1)
    },
    handleBack() {
      this.$router.go(-1)
    },
    handleSubmit() {}
  }
}
</script>
