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
        <el-collapse-item
          v-for="(item, index) in list"
          :key="index"
          :name="String(index + 1)"
        >
          <span
            slot="title"
            class="collapse-title"
          >{{ item.title }}&nbsp;&nbsp;&nbsp;&nbsp;销售担当：{{
            item.bear
          }}&nbsp;&nbsp;&nbsp;&nbsp;巡店时间：{{ item.date }}</span>
          <div class="input_box">
            <div class="flex2">
              <div class="title">
                整改要求1：
              </div>
              <div class="input">
                {{ item.cons1 }}
              </div>
            </div>
            <div class="flex4">
              <div class="title">
                完成情况：
              </div>
              <div class="input">
                <span v-if="!$route.query.st" style="color: green">是</span><span v-else style="color: red">否</span>
              </div>
            </div>
            <div class="flex4">
              <div class="title">
                照片：
              </div>
              <div class="input">
                <p class="photo-viewer photo-viewer-left">
                  <i class="el-icon-view" @click="showViewerPhoto" />
                </p>
              </div>
            </div>
            <div v-if="$route.query.st" class="flex1">
              <div class="title">
                补充说明1：
              </div>
              <div class="input">
                未完成整改要求的补充说明
              </div>
            </div>
            <el-divider />
            <div class="flex2">
              <div class="title">
                整改要求2：
              </div>
              <div class="input">
                {{ item.cons2 }}
              </div>
            </div>
            <div class="flex4">
              <div class="title">
                完成情况：
              </div>
              <div class="input">
                <span v-if="!$route.query.st" style="color: green">是</span><span v-else style="color: orange">保留</span>
              </div>
            </div>
            <div class="flex4">
              <div class="title">
                照片：
              </div>
              <div class="input">
                <p class="photo-viewer photo-viewer-left">
                  <i class="el-icon-view" @click="showViewerPhoto" />
                </p>
              </div>
            </div>
            <div v-if="$route.query.st" class="flex1">
              <div class="title">
                补充说明2：
              </div>
              <div class="input">
                未完成整改要求的补充说明
              </div>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
      <ul class="operation-box dialog-btn-box dialog-btn-box-detail">
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
  name: 'RectificationDetail',
  components: { Viewer },
  mixins: [names, formValidator, permission],
  data() {
    return {
      activeNames: ['1', '2'],
      photo: ['image-01.png', 'image-02.png', 'image-03.png'],
      list: [
        {
          title: '泰州孩子王1店',
          bear: '张三',
          date: '2021/02/12',
          cons1: '货架需清整',
          cons2: '陈列位置需在货架中层',
          st1: '1',
          st2: '1',
          photo: '照片'
        },
        {
          title: '合肥孩子王11店',
          bear: '李四',
          date: '2021/02/19',
          cons1: '货架需清整',
          cons2: '陈列位置需在货架中层',
          st1: '1',
          st2: '2',
          photo: '照片'
        }
      ]
    }
  },
  methods: {
    handleBack() {
      this.$router.go(-1)
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
