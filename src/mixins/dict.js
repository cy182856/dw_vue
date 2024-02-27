import { mapGetters } from 'vuex'
export const dict = {
  created: function() {
    this.$store.dispatch('getDicts', this.dictTypeId)
  },
  methods: {
    handleInput(newValue) {
      this.$emit('input', newValue)
    },
    handleChange(newValue) {
      this.$emit('change', newValue)
    },
    handleBlur(newValue) {
      this.$emit('blur', newValue)
    },
    setValue(data, fields, fieldName) {
      var setValue = function f(fields, fieldName, setList) {
        if (fields !== undefined && fields.length > 0) {
          for (var i = 0; i < fields.length; i++) {
            if (fields[i].formType === 'ColumnsLayout' && fields[i].columns.length > 0) {
              for (var j = 0; j < fields[i].columns.length; j++) {
                if (fields[i].columns[j].formType !== '' && fields[i].columns[j].formType === 'DictSelect' && fields[i].columns[j].relParent !== undefined && fields[i].columns[j].relParent !== '' && fields[i].columns[j].relParent === fieldName) {
                  setList.push(fields[i].columns[j].fieldName)
                  f(fields, fields[i].columns[j].fieldName, setList)
                }
              }
            } else {
              if (fields[i].formType === 'DictSelect' && fields[i].relParent !== undefined && fields[i].relParent !== '' && fields[i].relParent === fieldName) {
                setList.push(fields[i].fieldName)
                f(fields, fields[i].fieldName, setList)
              }
            }
          }
        }
      }
      var setList = []
      setValue(fields, fieldName, setList)
      if (setList.length > 0) {
        setList.forEach((item) => {
          this.$set(data, item, '')
        })
      }
    }

  },
  watch: {
    parentId() {
      this.value = ''
    }
  },
  computed: {
    options: function() {
      if (this.parent === '' && this.relParent) {
        return []
      }
      let dicts = this.dictList[this.dictTypeId]
      if (dicts) {
        // 如果指定的是filter字段，则默认过滤filter1
        if (this.filter) {
          dicts = dicts.filter(item => item.filter1 && item.filter1.indexOf(this.filter) >= 0)
        }
        if (this.filter1) {
          dicts = dicts.filter(item => item.filter1 && item.filter1.indexOf(this.filter1) >= 0)
        }
        if (this.filter2) {
          dicts = dicts.filter(item => item.filter2 && item.filter2.indexOf(this.filter2) >= 0)
        }
        if (this.parentId) {
          dicts = dicts.filter(item => item.parentId === this.parentId)
        }
        if (this.parent) {
          dicts = dicts.filter(item => item.parentId === this.parent)
        }
        return dicts
      } else {
        return []
      }
    },
    ...mapGetters([
      'dictList'
    ])
  }
}
