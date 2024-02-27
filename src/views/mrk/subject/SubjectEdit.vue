<template>
  <!-- 编辑画面 -->
  <div class="summary">
    <subject-info :id="id" :key="id" ref="childData" :type="type" @subject="handleLoad" />
    <div class="detail">
      <ul class="operation-box dialog-btn-box dialog-btn-box-detail">
        <div v-if="type=='edit'||type=='add'">
          <li class="operation-item" @click="handleSubmit">
            <span class="operation-circle circle-middle-btn btn-light-color bluebg">
              <i class="iconfont iconbaocun" />
            </span>
            <span class="operation-text">保存</span>
          </li>
        </div>
        <!-- 返回 -->
        <li class="operation-item" @click="handleBack">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg">
            <i class="iconfont iconquxiao" />
          </span>
          <span class="operation-text">{{ $t("comm.return") }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { formValidator } from '@/mixins/form-validator.js'
import { names } from '@/mixins/names.js'
import { permission } from '@/mixins/permission-mixin.js'
import { dict } from '@/mixins/dict'
import { saveFinAccount } from '@/api/mrk/subject.js'
import SubjectInfo from '@/views/mrk/subject/components/SubjectInfo'
export default {
  name: 'SubjectEdit',
  components: { SubjectInfo },
  mixins: [names, formValidator, permission, dict],
  data() {
    return {
      infoType: '',
      disabled: true,
      isLoading: true,
      activeNames: ['1', '2', '3', '4', '5'],
      writeoff: {
        deptCode: '',
        accountCode: '',
        accountName: '',
        accountType: '',
        startYear: '',
        endYear: '',
        countType: '',
        createBy: '',
        createTime: '',
        updateBy: '',
        updateTime: '',
        deleteFlag: ''
      },
      fileList: [],
      relFunc: ''
    }
  },
  computed: {
    ...mapGetters(['userInfo']),
    orgRootId: function() {
      return this.userInfo.orgSeqNo.split('.')[1]
    },
    taskId: function() {
      return this.$route.query.taskId
    },
    processInstId: function() {
      return this.$route.query.processInstId
    },
    id: function() {
      return this.$route.query.id || this.$route.query.businessKey
    },
    type: function() {
      return this.$route.query.type
    },
    totalAmount: function() {
      if (this.withdraw.details && this.withdraw.details.length > 0) {
        const sum = this.withdraw.details.map(
          (item) => (!item.amount ? 0 : parseFloat(item.amount)),
          2
        )
        return sum.reduce((sum, item) => sum + item)
      }
      return ''
    }
  },
  watch: {},
  async created() {
    if (this.id) {
      this.infoType = this.id
      this.fetchData()
    } else {
      this.disabled = false
    }
  },
  methods: {
    async fetchData() {
      this.isLoading = false
    },
    handleLoad(data) {
      // 子页面传递数据
      this.writeoff = data
    },
    handleSubmit() {
      console.log('保存费目开始')
      this.$nextTick(function() {
        console.log('父组件调用方法')
        const result = this.$refs.childData.getChildData()
        console.log(result, '子组件返回值')
        if (result) {
          this.save()
          console.log('保存费目结束')
        }
      })
    },
    handleBack() {
      this.$router.go(-1)
    },
    async save() {
      console.log('调用保存接口')
      const res = await saveFinAccount(this.writeoff)
      if (res && res.success) {
        console.log('保存成功')
        this.$router.push('/mrk/SubjectList')
        res.messages.message
      }
      this.isLoading = false
    }
  }
}
</script>
