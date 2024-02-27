<template>
  <!-- 详细画面 -->
  <div class="summary">
    <top-box :relation-info-map="relationInfoMap" />
    <div class="detail">
      <div class="pagetitle">
        <span class="pagespan">{{ $t('mrk.contact.identiferNum') }} : {{ contact.identiferNum }} {{ $t('comm.version') }} : {{ contact.version }}</span>
      </div>
      <el-collapse v-model="activeNames">
        <el-collapse-item v-for="(item) in pageConfig" :key="item.catagoryName" :name="item.catagoryName">
          <span slot="title" class="collapse-title">{{ $t(item.catagoryLabelKey) }}</span>
          <div class="input_box">
            <template v-for="(field,index2) in item.fields">
              <el-row v-if="field.formType === 'ColumnsLayout'" :key="index2" class="flex1">
                <el-col v-for="(col,index3) in field.columns" :key="index3" :span="col.span" :offset="col.offset">
                  <div :class="index3===0?'input_col1':'input_col2'">
                    <form-element v-if="col.isAddAttr" :ref="col.fieldName" :key="index3" v-model="contact.attrs[col.fieldName]" :disabled="col.disabled" :row="contact" :attributes="col" @setValue="setValue(contact,item.fields,col.fieldName)" />
                    <form-element v-else :ref="col.fieldName" :key="index3" v-model="contact[col.fieldName]" :disabled="col.disabled" :row="contact" :attributes="col" @setValue="setValue(contact,item.fields,col.fieldName)" />
                  </div>
                </el-col>
              </el-row>
              <form-element v-if="field.formType !== 'ColumnsLayout' &&field.isAddAttr" :ref="field.fieldName" :key="index2" v-model="contact.attrs[field.fieldName]" :disabled="field.disabled" :row="contact" :attributes="field" @setValue="setValue(contact,item.fields,field.fieldName)" />
              <form-element v-else-if="field.formType !== 'ColumnsLayout'" :ref="field.fieldName" :key="index2" v-model="contact[field.fieldName]" :disabled="field.disabled" :row="contact" :attributes="field" @setValue="setValue(contact,item.fields,field.fieldName)" />
            </template>
          </div>
        </el-collapse-item>
      </el-collapse>
      <ul class="operation-box dialog-btn-box dialog-btn-box-detail">
        <!-- 编辑 -->
        <li class="operation-item" @click="handleEdit()">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconbianji" /></span>
          <span class="operation-text">{{ $t('comm.edit') }}</span>
        </li>
        <!-- 删除 -->
        <li class="operation-item" @click="handleDelete()">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconshanchu" /></span>
          <span class="operation-text">{{ $t('comm.delete') }}</span>
        </li>
        <!-- 复制 -->
        <li class="operation-item" @click="handleCopy">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconfuzhi" /></span>
          <span class="operation-text">{{ $t('comm.copy') }}</span>
        </li>
        <!-- 变更履历 -->
        <li class="operation-item" @click="handleUpdateHis">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="el-icon-notebook-2" /></span>
          <span class="operation-text">{{ $t('comm.updateHis') }}</span>
        </li>
        <!-- 历史版本 -->
        <li class="operation-item" @click="versionDialog=true">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="el-icon-notebook-2" /></span>
          <span class="operation-text">{{ $t('comm.versionHis') }}</span>
        </li>
        <!-- 返回 -->
        <li class="operation-item" @click="handleBack">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconquxiao" /></span>
          <span class="operation-text">{{ $t('comm.return') }}</span>
        </li>
      </ul>
    </div>
    <div class="historyDialog">
      <el-drawer
        ref="drawer"
        :show-close="false"
        :visible.sync="historyDialog"
        size="640"
        direction="rtl"
        custom-class="drawer"
      >
        <span slot="title" style="font-size:20px">{{ $t('comm.updateHis') }}</span>
        <update-his :key="contact.identiferNum" func-div="contact" :identifer-num="contact.identiferNum" />
      </el-drawer>
    </div>
    <div class="versionDialog">
      <el-drawer
        ref="drawer"
        :show-close="false"
        :visible.sync="versionDialog"
        size="640"
        direction="rtl"
        custom-class="drawer"
      >
        <span slot="title" style="font-size:20px">{{ $t('comm.versionHis') }}</span>
        <version-his :key="contact.identiferNum" func-div="contact" :identifer-num="contact.identiferNum" @versionClick="versionDialog=false" />
      </el-drawer>
    </div>
  </div>
</template>
<script>
import { getDetail, deleteContact } from '@/api/mrk/contact'
import { getPageConfig } from '@/api/base.js'
import FormElement from '@/components/FormElement.vue'
import { names } from '@/mixins/names.js'
import { permission } from '@/mixins/permission-mixin.js'
import TopBox from '@/components/TopBox'
export default {
  name: 'ContactDetail',
  components: { FormElement, TopBox },
  mixins: [names, permission],
  data() {
    return {
      isLoading: true,
      historyDialog: false,
      versionDialog: false,
      activeNames: [],
      contact: {
        attrs: {
        }
      },
      relationInfoMap: new Map(),
      pageConfig: [
        {
          catagoryName: '1',
          catagoryLabelKey: 'comm.essentialInformation',
          fields: []
        }
      ]
    }
  },
  computed: {
    id: function() { return this.$route.query.id }
  },
  watch: {
    id: function(newValue) {
      if (newValue) {
        this.fetchData()
      }
    }
  },
  async created() {
    const res = await getPageConfig('contact', 'detail')
    if (res && res.success) {
      if (res.datas.pageConfig) {
        this.pageConfig = JSON.parse(res.datas.pageConfig)
      }
    }
    this.activeNames = this.pageConfig.map(item => item.catagoryName)
    if (this.id) {
      this.fetchData()
    }
  },
  methods: {
    async fetchData() {
      const res = await getDetail(this.id)
      if (res && res.success) {
        this.contact = res.datas.contact
        if (res.datas.attachmentDetails) {
          this.contact.attachmentDetails = res.datas.attachmentDetails
        }
        this.relationInfoMap = res.datas.relationNum
      }
    },
    handleCopy() {
      this.$router.push({ path: '/mrk/contact/edit', query: { id: this.id, copy: true }})
    },
    handleEdit() {
      this.$router.push({ path: '/mrk/contact/edit', query: { id: this.id }})
    },
    handleDelete() {
      this.$confirm(this.$t('comm.tip9'), this.$t('comm.tips'), {
        confirmButtonText: this.$t('comm.certain'),
        cancelButtonText: this.$t('comm.cancel'),
        type: 'warning'
      }).then(async() => {
        const res = await deleteContact([this.contact])
        if (res && res.success) {
          this.$router.push('/mrk/contactList')
        }
        this.isLoading = false
      }).catch(() => {
        this.$message({
          type: 'info',
          message: this.$t('comm.msg1')
        })
      })
    },
    handleUpdateHis() {
      this.historyDialog = true
    },
    handleBack() {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="scss" scoped>
.input_col {
  padding: 0px 0px 0px 0px;
}

</style>
<style lang="scss">

</style>
