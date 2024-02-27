<template>
  <div class="display: flex;flex-direction: column;height: 100%;">
    <div class="tree_box">
      <span class="iconfont icon-zuzhijiagou" style="margin-left:20px">{{ treeType === 'department' ? '请选择部门' : '请选择人员' }}</span>
      <el-tree
        ref="tree"
        :data="data"
        node-key="id"
        class="tree-croll"
        :show-checkbox="multiple"
        :default-expanded-keys="expandedKeys"
        :default-checked-keys="selectedKey"
        @node-click="handleNodeClick"
      >
        <template slot-scope="scope">
          <div class="tree_content">
            <div class="tree_item">
              <span v-if="treeType === 'department'" class="iconfont icon-bumenguanli_h" />
              <span v-else class="iconfont" :class="scope.data.children || scope.data.type === 'org' ? 'icon-bumenguanli_h' : 'icon-Avatar'" />
              <span>{{ scope.data.name || scope.data.text }}</span>
            </div>
          </div>
        </template>
      </el-tree>
    </div>
    <ul class="operation-box dialog-btn-box fixed-btn-box end-content-flex">
      <li class="operation-item" @click="handleCancelClick">
        <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconquxiao" /></span>
        <span class="operation-text">{{ $t('comm.cancel') }}</span>
      </li>
      <li class="operation-item" @click="handleClearClick">
        <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconrefresh" /></span>
        <span class="operation-text">{{ $t('comm.clear') }}</span>
      </li>
      <li class="operation-item" @click="handleOkClick">
        <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconqueren" /></span>
        <span class="operation-text">{{ $t('comm.certain') }}</span>
      </li>
    </ul>
  </div>
</template>
<script>
import { getOrgTree } from '@/api/admin/org-api'
export default {
  name: 'SelectUserOrgTree',
  mixins: [],
  props: {
    // 类型 department | personnel
    treeType: {
      type: String,
      default: 'personnel'
    },
    isAdmin: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: true
    },
    leafOnly: {
      type: Boolean,
      default: true
    },
    includeHalfChecked: {
      type: Boolean,
      default: false
    },
    rootOrgId: {
      type: String,
      default: ''
    },
    selectedKey: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      data: [],
      expandedKeys: [],
      selectedNodeData: {},
      dataList: []
    }
  },
  created() {
    this.__getList()
  },
  methods: {
    handleNodeClick(data, node, con) {
      this.selectedNodeData = data
    },
    handleCancelClick() {
      // 向外分发选中事件
      this.$emit('cancel')
    },
    handleClearClick() {
      this.$refs.tree.setCheckedKeys([])
      // 向外分发选中事件
      this.$emit('clear')
    },
    handleOkClick() {
      if (this.multiple) {
      // 只包含叶子节点
        const selected = this.$refs.tree.getCheckedNodes(this.leafOnly, this.includeHalfChecked)
        // 向外分发选中事件
        this.$emit('select', selected)
      } else {
        this.$emit('select', this.selectedNodeData)
      }
    },
    async __getList() {
      const res = await getOrgTree(this.rootOrgId, this.treeType, this.isAdmin)
      // console.log(res)
      const { success, datas } = res
      if (success) {
        this.dataList = datas.result
        // 组织树第一层默认展开
        this.expandedKeys = this.dataList.map(item => item.id)
        this.expandedKeys = [...this.expandedKeys, ...this.selectedKey]
        this.data = [...this.dataList]
      } else {
        this.dataList = []
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.tree_box {
  // width: 80%;
  height: 300px;
  // float: left;
  overflow: hidden;
  box-sizing: border-box;
  padding: 0 5px;
  margin-bottom: 15px;
  background-color: #26272c;
  // border-right: 5px solid #ccc;
  // background-color: skyblue;
  span{
    margin-bottom: 5px;
    // color: black;
    // color: #666666;
  }
  .tree_content {
    position: relative;
    .tree_item {
      .iconfont {
        font-size: 16px;
      }
      .icon-bumenguanli_h {
        color: rgb(180, 87, 6);
        font-size: 18px;
      }
      .icon-Avatar {
        color: rgb(64, 179, 224);
        font-size: 14px;
      }
      .icon-zuzhijiagou {
        color: cadetblue;
        font-size: 16px;
        position: relative;
        left: -12px;
      }
    }
    // .tree_down {
    //   position: absolute;
    //   top: 20px;
    //   left: 15px;
    //   z-index: 999;
    //   background-color: #fff;
    //   padding: 3px;
    //   // height: 300px;
    //   display: none;
    //   p {
    //     height: 20px;
    //     line-height: 20px;
    //     font-size: 12px;
    //     color: #000;
    //     &:hover {
    //       background-color: #ccc;
    //     }
    //   }
    // }
  }
}
.tree-croll{
  height: calc(100% - 21px);
}
</style>
