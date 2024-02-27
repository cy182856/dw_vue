<template>
  <div class="upload">
    <div class="file_list">
      <el-col v-for="item in fileList" :key="item.id" :span="8">
        <div class="item">
          <div class="file_name" @click="handleDownload(item.id)">
            <i class="el-icon-document" /> <span>{{ item.attachmentName }}</span>
          </div>
          <div class="operation">
            <!-- <i class="el-icon-success"></i> -->
            <i v-if="!disabled" class="el-icon-close" @click="remove(item)" />
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <el-button v-if="!disabled" type="primary" size="mini" @click="uploadDialog = true">
          <!-- 点击上传文件 -->
          {{ $t('component.attachement.text1') }}
        </el-button>
      </el-col>
    </div>
    <el-dialog
      class="content-dialog-box  search-light"
      :close-on-click-modal="false"
      custom-class="dialog-drag dialog-drag-heightAuto content-dialog-upload  fixed-search-btn-box"
      top="0"
      :title="$t('component.attachement.text2')"
      :visible.sync="uploadDialog"
      append-to-body
      center
      width="400px"
    >
      <div style="height:77%">
        <el-upload
          class="upload-demo"
          :on-success="uploadSuccess"
          :file-list="uploadList"
          drag
          :headers="{'X-CSRF-TOKEN': csrfToken}"
          :action="action|| `${contextPath}/api/${funcDiv}/attachmentupload`"
          multiple
        >
          <i class="el-icon-upload" />
          <div class="el-upload__text">
            {{ $t('component.attachement.text3') }}<em>{{ $t('component.attachement.text4') }}</em>
          </div>
        </el-upload>
      </div>
      <ul class="operation-box dialog-btn-box fixed-btn-box end-content-flex">
        <li class="operation-item" @click="complete">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconqueren" /></span>
          <span class="operation-text">{{ $t('component.attachement.text5') }}</span>
        </li>
      <!-- <el-button @click="uploadDialog = false">{{$t('comm.cancel')}}</el-button> -->
      <!-- <el-button type="primary" @click="complete">{{ $t('component.attachement.text5') }}</el-button> -->
      </ul>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { download } from '@/utils/request'
export default {
  name: 'IvAttachement',
  props: {
    value: {
      type: Array,
      default() {
        return []
      }
    },
    action: {
      type: String,
      default: ''
    },
    funcDiv: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      fileList: [],
      uploadList: [],
      uploadDialog: false,
      contextPath: process.env.VUE_APP_CONTEXT_PATH ? process.env.VUE_APP_CONTEXT_PATH : ''
    }
  },
  computed: {
    ...mapGetters([
      'csrfToken'
    ])
  },
  watch: {
    value(newValue) {
      if (newValue && newValue.length) {
        this.fileList = [...newValue]
      }
    }
  },
  created() {
    if (this.value && this.value.length) {
      this.fileList = [...this.value]
    }
  },
  methods: {
    // 当点击删除时，向外分发remove事件file
    remove(file) {
      this.fileList = this.fileList.filter(item => item.id !== file.id)
      this.$emit('input', this.fileList)
      this.$emit('change', this.fileList)
    },
    complete() {
      console.log(this.uploadList)
      let list = []
      this.uploadList.forEach(file => {
        if (file.response && file.response.success) {
          list = [...list, ...file.response.datas.files]
        }
      })

      this.fileList = [...this.fileList, ...list]
      this.uploadList = []
      // 向外分发add事件
      this.$emit('input', this.fileList)
      this.$emit('change', this.fileList)
      this.uploadDialog = false
    },
    uploadSuccess(res, file, fileList) {
      this.uploadList = fileList
      // fileList.forEach(file => {
      //   this.uploadList = this.uploadList.concat()
      // })
    },
    handleDownload(id) {
      download('POST', `/api/${this.funcDiv}/download/${id}`)
    }
  }
}
</script>
<style lang="scss">
</style>
<style lang="scss" scoped>

  .upload {
    width: 100%;
    flex-wrap: wrap;
    .file_list {
      box-sizing: border-box;
      padding: 5px 25px 20px 0px;
      align-items: center;
      .item {
        width: 100%;
        height: 25px;
        align-items: center;
        justify-content: space-between;
        line-height: 25px;
        margin: 5px 0;
        box-sizing: border-box;
        cursor: pointer;
        .file_name {
          margin-right: 5px;
          display: inline;
          i {
            margin-right: 5px;
          }
        }
        .operation{
          display: inline;
        }
        &:hover {
          background-color: #eee;
          border-radius: 6px;
        }
        &:hover .file_name > i {
          color: red;
        }
        &:hover .file_name > span {
          color: #409EFF;
        }
      }
    }
  }

</style>
