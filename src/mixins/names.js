import store from '@/store/index'
export const names = {
  filters: {
    userName: function(userId) {
      if (userId) {
        store.dispatch('getUserNames', userId)
        return store.getters.userNames[userId] || userId
      } else {
        return ''
      }
    },
    funcName: function(identiferNum, funcDiv) {
      if (identiferNum) {
        identiferNum = identiferNum.replace(/\//g, '／')
        store.dispatch('getFuncNames', { funcDiv, identiferNum })
        return store.getters.funcNames[identiferNum] || identiferNum
      } else {
        return ''
      }
    },
    funcNameByCode: function(code, funcDiv) {
      if (code) {
        code = code.replace(/\//g, '／')
        store.dispatch('getFuncNamesByCode', { funcDiv, code })
        console.log(store.getters)
        console.log(store.getters.funcNamesByCode)
        return store.getters.funcNamesByCode[funcDiv][code] || code
      } else {
        return ''
      }
    },
    dictName: function(dictId, dictTypeId) {
      store.dispatch('getDicts', dictTypeId)
      const dicts = store.getters.dictList[dictTypeId]
      if (dicts && dicts.length) {
        const dict = dicts.find(item => item.dictId === dictId)
        if (dict) {
          return dict.dictName || dictId
        } else {
          return ''
        }
      } else {
        return ''
      }
    }
  },
  methods: {
    handleFuncNameByCode: function(code, funcDiv) {
      if (code) {
        code = code.replace(/\//g, '／')
        if (store.getters.funcNamesByCode[funcDiv] && store.getters.funcNamesByCode[funcDiv][code]) {
          return store.getters.funcNamesByCode[funcDiv][code]
        } else {
          store.dispatch('getFuncNamesByCode', { funcDiv, code })
          return store.getters.funcNamesByCode[funcDiv][code] || code
        }
      } else {
        return ''
      }
    }
  }
}
